import { jest } from '@jest/globals';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthToken, clearAuthToken, get, post, put, del } from '../../src/utils/api';
import { API_BASE_URL, AUTH_ENDPOINTS, USER_ENDPOINTS, BOOKING_ENDPOINTS, RINK_ENDPOINTS, EQUIPMENT_ENDPOINTS } from '../../src/constants/api';

// Mock axios
const mockAxios = new MockAdapter(axios);

describe('API Utility Functions', () => {
  beforeEach(() => {
    // Clear all mock axios handlers
    mockAxios.reset();
    // Clear AsyncStorage
    AsyncStorage.clear();
    // Reset axios default headers
    axios.defaults.headers.common['Authorization'] = undefined;
  });

  afterEach(() => {
    // Restore all axios mocks
    mockAxios.restore();
  });

  describe('setAuthToken', () => {
    it('should set the Authorization header and store the token in AsyncStorage', async () => {
      const token = 'test-token';
      await setAuthToken(token);

      expect(axios.defaults.headers.common['Authorization']).toBe(`Bearer ${token}`);
      expect(await AsyncStorage.getItem('authToken')).toBe(token);
    });
  });

  describe('clearAuthToken', () => {
    it('should remove the Authorization header and clear the token from AsyncStorage', async () => {
      await AsyncStorage.setItem('authToken', 'test-token');
      axios.defaults.headers.common['Authorization'] = 'Bearer test-token';

      await clearAuthToken();

      expect(axios.defaults.headers.common['Authorization']).toBeUndefined();
      expect(await AsyncStorage.getItem('authToken')).toBeNull();
    });
  });

  describe('get', () => {
    it('should make a GET request to the correct URL', async () => {
      const endpoint = USER_ENDPOINTS.GET_PROFILE;
      const mockResponse = { data: { id: 1, name: 'Test User' } };
      mockAxios.onGet(`${API_BASE_URL}${endpoint}`).reply(200, mockResponse);

      const response = await get(endpoint);

      expect(response).toEqual(mockResponse);
    });

    it('should handle errors', async () => {
      const endpoint = USER_ENDPOINTS.GET_PROFILE;
      mockAxios.onGet(`${API_BASE_URL}${endpoint}`).reply(404);

      await expect(get(endpoint)).rejects.toThrow('Request failed with status code 404');
    });
  });

  describe('post', () => {
    it('should make a POST request to the correct URL with the provided data', async () => {
      const endpoint = AUTH_ENDPOINTS.LOGIN;
      const data = { email: 'test@example.com', password: 'password123' };
      const mockResponse = { data: { token: 'test-token' } };
      mockAxios.onPost(`${API_BASE_URL}${endpoint}`, data).reply(200, mockResponse);

      const response = await post(endpoint, data);

      expect(response).toEqual(mockResponse);
    });

    it('should handle errors', async () => {
      const endpoint = AUTH_ENDPOINTS.LOGIN;
      const data = { email: 'test@example.com', password: 'wrong-password' };
      mockAxios.onPost(`${API_BASE_URL}${endpoint}`, data).reply(401);

      await expect(post(endpoint, data)).rejects.toThrow('Request failed with status code 401');
    });
  });

  describe('put', () => {
    it('should make a PUT request to the correct URL with the provided data', async () => {
      const endpoint = USER_ENDPOINTS.UPDATE_PROFILE;
      const data = { name: 'Updated Name' };
      const mockResponse = { data: { id: 1, name: 'Updated Name' } };
      mockAxios.onPut(`${API_BASE_URL}${endpoint}`, data).reply(200, mockResponse);

      const response = await put(endpoint, data);

      expect(response).toEqual(mockResponse);
    });

    it('should handle errors', async () => {
      const endpoint = USER_ENDPOINTS.UPDATE_PROFILE;
      const data = { name: '' };
      mockAxios.onPut(`${API_BASE_URL}${endpoint}`, data).reply(400);

      await expect(put(endpoint, data)).rejects.toThrow('Request failed with status code 400');
    });
  });

  describe('del', () => {
    it('should make a DELETE request to the correct URL', async () => {
      const endpoint = `${BOOKING_ENDPOINTS.DELETE_BOOKING}/1`;
      const mockResponse = { data: { message: 'Booking deleted successfully' } };
      mockAxios.onDelete(`${API_BASE_URL}${endpoint}`).reply(200, mockResponse);

      const response = await del(endpoint);

      expect(response).toEqual(mockResponse);
    });

    it('should handle errors', async () => {
      const endpoint = `${BOOKING_ENDPOINTS.DELETE_BOOKING}/999`;
      mockAxios.onDelete(`${API_BASE_URL}${endpoint}`).reply(404);

      await expect(del(endpoint)).rejects.toThrow('Request failed with status code 404');
    });
  });
});

// Implement comprehensive test cases for all API utility functions
// TODO: Add more test cases for different scenarios (e.g., network errors, timeouts)

// Add test cases for error handling scenarios
// TODO: Test how the API functions handle and propagate different types of errors

// Ensure test coverage is adequate (aim for >80% coverage)
// TODO: Use a code coverage tool to measure and improve test coverage