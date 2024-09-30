import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { User } from '../types/index';
import { AUTH_ENDPOINTS } from '../constants/api';
import { getConfig } from '../config/index';

// Global constants
const ACCESS_TOKEN_KEY = '@access_token';
const REFRESH_TOKEN_KEY = '@refresh_token';

/**
 * Authenticates a user with the provided credentials
 * @param email - The user's email
 * @param password - The user's password
 * @returns A promise that resolves to the authenticated user object
 */
export const login = async (email: string, password: string): Promise<User> => {
  try {
    const response = await axios.post(AUTH_ENDPOINTS.login, { email, password });
    const { user, accessToken, refreshToken } = response.data;

    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Logs out the current user
 * @returns A promise that resolves when the logout is complete
 */
export const logout = async (): Promise<void> => {
  try {
    await axios.post(AUTH_ENDPOINTS.logout);
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
    // Clear any other user-related data from storage
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

/**
 * Registers a new user
 * @param userData - The user data for registration
 * @returns A promise that resolves to the newly registered user object
 */
export const register = async (userData: object): Promise<User> => {
  try {
    const response = await axios.post(AUTH_ENDPOINTS.register, userData);
    const { user, accessToken, refreshToken } = response.data;

    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

    return user;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

/**
 * Refreshes the access token using the refresh token
 * @returns A promise that resolves to the new access token
 */
export const refreshToken = async (): Promise<string> => {
  try {
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const response = await axios.post(AUTH_ENDPOINTS.refreshToken, { refreshToken });
    const { accessToken } = response.data;

    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

    return accessToken;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
};

/**
 * Retrieves the stored access token
 * @returns A promise that resolves to the access token or null if not found
 */
export const getAccessToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

/**
 * Stores the access token
 * @param token - The access token to store
 * @returns A promise that resolves when the token is stored
 */
export const setAccessToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
  } catch (error) {
    console.error('Error setting access token:', error);
    throw error;
  }
};

/**
 * Checks if the user is currently authenticated
 * @returns A promise that resolves to true if authenticated, false otherwise
 */
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const token = await getAccessToken();
    return !!token;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

// Configure axios defaults
axios.defaults.baseURL = getConfig().apiUrl;

// Add request interceptor to include the access token in requests
axios.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // If token refresh fails, redirect to login
        // You might want to use a navigation library or context to handle this
        console.error('Token refresh failed, redirecting to login');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Pending human tasks:
// TODO: Implement proper error handling for network requests and token storage operations
// TODO: Add input validation for login and register functions
// TODO: Implement secure storage for tokens, possibly using encrypted storage solutions
// TODO: Add unit tests for all authentication utility functions
// TODO: Consider implementing biometric authentication for enhanced security