import axios, { AxiosInstance, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Import these constants from the actual file once it's created
const API_BASE_URL = 'https://api.icerinkbooking.com';
const AUTH_ENDPOINTS = {
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
};
const USER_ENDPOINTS = {
  profile: '/users/profile',
};
const BOOKING_ENDPOINTS = {
  create: '/bookings',
  list: '/bookings',
  details: (id: string) => `/bookings/${id}`,
};
const RINK_ENDPOINTS = {
  list: '/rinks',
  details: (id: string) => `/rinks/${id}`,
};
const EQUIPMENT_ENDPOINTS = {
  list: '/equipment',
  details: (id: string) => `/equipment/${id}`,
  rent: '/equipment/rent',
};

// Create an axios instance with default configuration
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Sets the authentication token for API requests
 * @param token The authentication token
 */
export const setAuthToken = async (token: string): Promise<void> => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  await AsyncStorage.setItem('authToken', token);
};

/**
 * Clears the authentication token
 */
export const clearAuthToken = async (): Promise<void> => {
  delete api.defaults.headers.common['Authorization'];
  await AsyncStorage.removeItem('authToken');
};

/**
 * Handles API errors and throws a formatted error object
 * @param error The error object from axios
 * @throws Formatted error object
 */
const handleApiError = (error: any): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const errorMessage = axiosError.response?.data?.message || axiosError.message;
    throw new Error(`API Error: ${errorMessage}`);
  }
  throw error;
};

/**
 * Performs a GET request to the API
 * @param url The endpoint URL
 * @param params Optional query parameters
 * @returns The response data from the API
 */
export const get = async <T>(url: string, params?: object): Promise<T> => {
  try {
    const response = await api.get<T>(url, { params });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Performs a POST request to the API
 * @param url The endpoint URL
 * @param data The data to be sent in the request body
 * @returns The response data from the API
 */
export const post = async <T>(url: string, data: object): Promise<T> => {
  try {
    const response = await api.post<T>(url, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Performs a PUT request to the API
 * @param url The endpoint URL
 * @param data The data to be sent in the request body
 * @returns The response data from the API
 */
export const put = async <T>(url: string, data: object): Promise<T> => {
  try {
    const response = await api.put<T>(url, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Performs a DELETE request to the API
 * @param url The endpoint URL
 * @returns The response data from the API
 */
export const del = async <T>(url: string): Promise<T> => {
  try {
    const response = await api.delete<T>(url);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Export constants for use in other parts of the application
export {
  AUTH_ENDPOINTS,
  USER_ENDPOINTS,
  BOOKING_ENDPOINTS,
  RINK_ENDPOINTS,
  EQUIPMENT_ENDPOINTS,
};

// Export the api instance for advanced usage if needed
export default api;

// TODO: Implement proper error handling and logging for API requests
// TODO: Add request interceptors for refreshing tokens if needed
// TODO: Implement request throttling or rate limiting to prevent API abuse