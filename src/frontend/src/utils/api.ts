import axios, { AxiosInstance, AxiosError } from 'axios';
import { getConfig } from '../config';
import { ApiResponse, ApiError } from '../types';

/**
 * Creates and configures an Axios instance for API requests
 * @returns {AxiosInstance} Configured Axios instance
 */
const createApiInstance = (): AxiosInstance => {
  const config = getConfig();
  const instance = axios.create({
    baseURL: config.apiBaseUrl,
    timeout: config.apiTimeout,
  });

  // Add request interceptors for authentication
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Add response interceptors for error handling
  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(handleApiError(error))
  );

  return instance;
};

/**
 * Handles API errors and formats them into a standardized ApiError object
 * @param {AxiosError} error - The error object from Axios
 * @returns {ApiError} Standardized error object
 */
const handleApiError = (error: AxiosError): ApiError => {
  const { response } = error;
  const statusCode = response?.status || 500;
  const message = response?.data?.message || 'An unexpected error occurred';

  return {
    statusCode,
    message,
    error: error.name,
    details: response?.data?.details || {},
  };
};

/**
 * Performs a GET request to the specified endpoint
 * @param {string} endpoint - The API endpoint
 * @param {object} params - Query parameters
 * @returns {Promise<ApiResponse>} Promise resolving to the API response
 */
export const get = async <T>(endpoint: string, params?: object): Promise<ApiResponse<T>> => {
  try {
    const api = createApiInstance();
    const response = await api.get(endpoint, { params });
    return { data: response.data, status: response.status };
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

/**
 * Performs a POST request to the specified endpoint
 * @param {string} endpoint - The API endpoint
 * @param {object} data - The data to be sent in the request body
 * @returns {Promise<ApiResponse>} Promise resolving to the API response
 */
export const post = async <T>(endpoint: string, data: object): Promise<ApiResponse<T>> => {
  try {
    const api = createApiInstance();
    const response = await api.post(endpoint, data);
    return { data: response.data, status: response.status };
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

/**
 * Performs a PUT request to the specified endpoint
 * @param {string} endpoint - The API endpoint
 * @param {object} data - The data to be sent in the request body
 * @returns {Promise<ApiResponse>} Promise resolving to the API response
 */
export const put = async <T>(endpoint: string, data: object): Promise<ApiResponse<T>> => {
  try {
    const api = createApiInstance();
    const response = await api.put(endpoint, data);
    return { data: response.data, status: response.status };
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

/**
 * Performs a DELETE request to the specified endpoint
 * @param {string} endpoint - The API endpoint
 * @returns {Promise<ApiResponse>} Promise resolving to the API response
 */
export const del = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
  try {
    const api = createApiInstance();
    const response = await api.delete(endpoint);
    return { data: response.data, status: response.status };
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

// Export the API utility functions
export default {
  get,
  post,
  put,
  del,
};

/**
 * TODO: Implement proper error handling and logging mechanisms
 * TODO: Set up authentication token management (e.g., refresh token logic)
 * TODO: Implement request/response interceptors for common operations (e.g., adding auth headers)
 * TODO: Add unit tests for API utility functions
 */