import apiClient from './apiClient';
import endpoints from './endpoints';

// Export the main API client instance for making HTTP requests to the backend
export { apiClient };

// Export the object containing all API endpoint URLs
export { endpoints };

// Function to make GET requests to the API
export const get = async <T>(url: string, params?: Record<string, any>): Promise<T> => {
  return apiClient.get(url, { params });
};

// Function to make POST requests to the API
export const post = async <T>(url: string, data?: any): Promise<T> => {
  return apiClient.post(url, data);
};

// Function to make PUT requests to the API
export const put = async <T>(url: string, data?: any): Promise<T> => {
  return apiClient.put(url, data);
};

// Function to make DELETE requests to the API
export const delete_ = async <T>(url: string): Promise<T> => {
  return apiClient.delete(url);
};

// Human tasks:
// TODO: Implement error handling and logging for API requests (Required)
// TODO: Add authentication token management to API requests (Required)
// TODO: Implement request caching mechanism for improved performance (Optional)