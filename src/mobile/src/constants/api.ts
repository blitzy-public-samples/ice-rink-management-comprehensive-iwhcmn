/**
 * This file contains constant values for API endpoints used in the mobile application.
 * It provides a centralized location for managing API URLs, ensuring consistency
 * across the app and making it easier to update endpoints if needed.
 */

// Base URL for the API
export const API_BASE_URL = 'https://api.icerinkmanagement.com/v1';

// Authentication endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh-token',
};

// User-related endpoints
export const USER_ENDPOINTS = {
  GET_PROFILE: '/users/profile',
  UPDATE_PROFILE: '/users/profile',
};

// Booking-related endpoints
export const BOOKING_ENDPOINTS = {
  GET_ALL: '/bookings',
  GET_BY_ID: '/bookings/:id',
  CREATE: '/bookings',
  UPDATE: '/bookings/:id',
  DELETE: '/bookings/:id',
};

// Rink-related endpoints
export const RINK_ENDPOINTS = {
  GET_ALL: '/rinks',
  GET_BY_ID: '/rinks/:id',
  GET_SCHEDULE: '/rinks/:id/schedule',
};

// Equipment-related endpoints
export const EQUIPMENT_ENDPOINTS = {
  GET_ALL: '/equipment',
  GET_BY_ID: '/equipment/:id',
  RENT: '/equipment/:id/rent',
};

// Helper function to construct full API URLs
export const getFullApiUrl = (endpoint: string): string => `${API_BASE_URL}${endpoint}`;

/**
 * TODO: Human Tasks
 * 1. Confirm the base URL for the API (https://api.icerinkmanagement.com/v1) and update if necessary
 * 2. Verify that all required API endpoints are included and correctly named
 */