import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Define the base URL for the API
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

// Create an interface for the API client instance
interface ApiClientInstance extends AxiosInstance {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

/**
 * Creates and configures an instance of the API client
 * @returns {ApiClientInstance} Configured API client instance
 */
const createApiClient = (): ApiClientInstance => {
  // Create an axios instance with base configuration
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Set up request interceptors for adding authentication tokens
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

  // Set up response interceptors for error handling and response parsing
  instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      // Handle network errors
      if (!error.response) {
        console.error('Network error:', error);
        return Promise.reject(new Error('Network error. Please check your internet connection.'));
      }

      // Handle API errors
      const { status, data } = error.response;
      console.error(`API error: ${status}`, data);

      // You can add custom error handling logic here based on status codes
      switch (status) {
        case 401:
          // Handle unauthorized access
          // For example, redirect to login page or refresh token
          break;
        case 403:
          // Handle forbidden access
          break;
        case 404:
          // Handle not found
          break;
        case 500:
          // Handle server errors
          break;
      }

      return Promise.reject(error);
    }
  );

  // Return the configured axios instance with typed methods
  return instance as ApiClientInstance;
};

// Create and export the API client instance
const apiClient = createApiClient();

export default apiClient;

// Export individual HTTP methods for convenience
export const get = <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  apiClient.get(url, config);

export const post = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
  apiClient.post(url, data, config);

export const put = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
  apiClient.put(url, data, config);

export const del = <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  apiClient.delete(url, config);

// Commented list of human tasks
/*
Human tasks:
1. Implement robust error handling for network failures and API errors (Required)
   - Basic implementation is provided, but it can be expanded based on specific project requirements
2. Add request and response logging for debugging purposes (Required)
   - Implement a logging mechanism to track API requests and responses
3. Implement request retrying mechanism for failed requests (Optional)
   - Add a retry mechanism for failed requests, possibly using a library like axios-retry
4. Add support for cancelling ongoing requests (Optional)
   - Implement request cancellation using axios cancel tokens
*/