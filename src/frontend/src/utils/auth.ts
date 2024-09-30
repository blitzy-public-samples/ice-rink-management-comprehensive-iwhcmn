import { User } from '../types/user';
import { getConfig } from '../config';
import jwtDecode from 'jwt-decode';

const TOKEN_KEY = 'ice_rink_auth_token';

/**
 * Stores the authentication token in local storage
 * @param token The authentication token to store
 */
export const setAuthToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Retrieves the authentication token from local storage
 * @returns The stored token or null if not found
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Removes the authentication token from local storage
 */
export const removeAuthToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Checks if the user is currently authenticated
 * @returns True if authenticated, false otherwise
 */
export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
};

/**
 * Retrieves the current user's information from the decoded token
 * @returns User object if authenticated, null otherwise
 */
export const getCurrentUser = (): User | null => {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const decodedToken: any = jwtDecode(token);
    return {
      id: decodedToken.id,
      email: decodedToken.email,
      role: decodedToken.role,
      // Add other user properties as needed
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Gets the role of the current user
 * @returns User's role if authenticated, null otherwise
 */
export const getUserRole = (): string | null => {
  const user = getCurrentUser();
  return user ? user.role : null;
};

// TODO: Implement proper error handling for token decoding and storage operations
// TODO: Add unit tests for all authentication utility functions
// TODO: Review and ensure compliance with security best practices for token storage and handling