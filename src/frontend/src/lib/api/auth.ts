import { User, LoginCredentials, RegisterData } from '../../types';
import { getConfig } from '../../config';
import { apiClient } from './index';

/**
 * Authenticates a user with the provided credentials
 * @param credentials The user's login credentials
 * @returns A promise that resolves to the authenticated user's data
 */
export const login = async (credentials: LoginCredentials): Promise<User> => {
  const config = getConfig();
  const response = await apiClient.post(`${config.apiBaseUrl}/auth/login`, credentials);
  return response.data;
};

/**
 * Registers a new user with the provided data
 * @param userData The new user's registration data
 * @returns A promise that resolves to the newly registered user's data
 */
export const register = async (userData: RegisterData): Promise<User> => {
  const config = getConfig();
  const response = await apiClient.post(`${config.apiBaseUrl}/auth/register`, userData);
  return response.data;
};

/**
 * Logs out the current user
 * @returns A promise that resolves when the logout is complete
 */
export const logout = async (): Promise<void> => {
  const config = getConfig();
  await apiClient.post(`${config.apiBaseUrl}/auth/logout`);
  // Clear any local storage or cookies related to authentication
  localStorage.removeItem('authToken');
};

/**
 * Retrieves the current authenticated user's data
 * @returns A promise that resolves to the current user's data
 */
export const getCurrentUser = async (): Promise<User> => {
  const config = getConfig();
  const response = await apiClient.get(`${config.apiBaseUrl}/auth/me`);
  return response.data;
};

/**
 * Initiates a password reset for the given email
 * @param email The email address of the user requesting a password reset
 * @returns A promise that resolves when the password reset request is sent
 */
export const resetPassword = async (email: string): Promise<void> => {
  const config = getConfig();
  await apiClient.post(`${config.apiBaseUrl}/auth/reset-password`, { email });
};

// TODO: Implement proper error handling for API requests
// TODO: Add token refresh functionality if using JWT authentication
// TODO: Implement secure storage for authentication tokens
// TODO: Add unit tests for each authentication function

export { login, register, logout, getCurrentUser, resetPassword };