import { login, logout, register, refreshToken, getAccessToken, setAccessToken, isAuthenticated } from '../../src/utils/auth';
import { User } from '../../src/types/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

jest.mock('@react-native-async-storage/async-storage');
jest.mock('axios');

describe('Auth Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should successfully login with valid credentials', async () => {
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' };
      const mockToken = 'mock_token';
      (axios.post as jest.Mock).mockResolvedValue({ data: { user: mockUser, token: mockToken } });

      const result = await login('test@example.com', 'password');

      expect(result).toEqual({ user: mockUser, token: mockToken });
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('accessToken', mockToken);
    });

    it('should throw an error with invalid credentials', async () => {
      (axios.post as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));

      await expect(login('invalid@example.com', 'wrongpassword')).rejects.toThrow('Invalid credentials');
    });

    it('should handle network errors', async () => {
      (axios.post as jest.Mock).mockRejectedValue(new Error('Network Error'));

      await expect(login('test@example.com', 'password')).rejects.toThrow('Network Error');
    });
  });

  describe('logout', () => {
    it('should successfully logout', async () => {
      await logout();

      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('accessToken');
    });
  });

  describe('register', () => {
    it('should successfully register a new user', async () => {
      const mockUser: User = { id: '1', email: 'newuser@example.com', name: 'New User' };
      const mockToken = 'new_user_token';
      (axios.post as jest.Mock).mockResolvedValue({ data: { user: mockUser, token: mockToken } });

      const result = await register('newuser@example.com', 'password', 'New User');

      expect(result).toEqual({ user: mockUser, token: mockToken });
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('accessToken', mockToken);
    });

    it('should throw an error if registration fails', async () => {
      (axios.post as jest.Mock).mockRejectedValue(new Error('Email already exists'));

      await expect(register('existing@example.com', 'password', 'Existing User')).rejects.toThrow('Email already exists');
    });
  });

  describe('refreshToken', () => {
    it('should successfully refresh the token', async () => {
      const mockNewToken = 'new_refreshed_token';
      (axios.post as jest.Mock).mockResolvedValue({ data: { token: mockNewToken } });

      const result = await refreshToken('old_token');

      expect(result).toBe(mockNewToken);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('accessToken', mockNewToken);
    });

    it('should throw an error if token refresh fails', async () => {
      (axios.post as jest.Mock).mockRejectedValue(new Error('Invalid refresh token'));

      await expect(refreshToken('invalid_token')).rejects.toThrow('Invalid refresh token');
    });
  });

  describe('getAccessToken', () => {
    it('should return the stored access token', async () => {
      const mockToken = 'stored_access_token';
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(mockToken);

      const result = await getAccessToken();

      expect(result).toBe(mockToken);
    });

    it('should return null if no token is stored', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const result = await getAccessToken();

      expect(result).toBeNull();
    });
  });

  describe('setAccessToken', () => {
    it('should store the access token', async () => {
      const mockToken = 'new_access_token';

      await setAccessToken(mockToken);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith('accessToken', mockToken);
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if a valid token exists', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue('valid_token');

      const result = await isAuthenticated();

      expect(result).toBe(true);
    });

    it('should return false if no token exists', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const result = await isAuthenticated();

      expect(result).toBe(false);
    });
  });
});

// Human tasks:
// 1. Implement test cases for all authentication utility functions (Required)
// 2. Add more edge cases and error scenarios to existing test cases (Required)
// 3. Implement mock for AsyncStorage to simulate storage operations (Required)
// 4. Implement mock for axios to simulate API requests (Required)
// 5. Consider adding integration tests for authentication flow (Optional)