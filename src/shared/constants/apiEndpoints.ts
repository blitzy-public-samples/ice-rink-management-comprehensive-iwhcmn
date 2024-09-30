/**
 * API Endpoint Constants for the Ice Rink Management and Booking System
 * This file defines all API endpoint constants used throughout the application.
 */

// Base URL for API requests
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.icerinkbooking.com/v1';

// Object containing all API endpoint constants
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password'
  },
  USERS: {
    BASE: '/users',
    GET_USER: '/users/:id',
    UPDATE_USER: '/users/:id',
    DELETE_USER: '/users/:id'
  },
  BOOKINGS: {
    BASE: '/bookings',
    CREATE_BOOKING: '/bookings',
    GET_BOOKING: '/bookings/:id',
    UPDATE_BOOKING: '/bookings/:id',
    DELETE_BOOKING: '/bookings/:id',
    GET_USER_BOOKINGS: '/bookings/user/:userId'
  },
  RINKS: {
    BASE: '/rinks',
    GET_RINK: '/rinks/:id',
    GET_RINK_SCHEDULE: '/rinks/:id/schedule',
    GET_AVAILABLE_SLOTS: '/rinks/:id/available-slots'
  },
  EQUIPMENT: {
    BASE: '/equipment',
    GET_EQUIPMENT: '/equipment/:id',
    RENT_EQUIPMENT: '/equipment/rent',
    RETURN_EQUIPMENT: '/equipment/return/:rentalId'
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    REPORTS: '/admin/reports',
    MANAGE_USERS: '/admin/users',
    MANAGE_RINKS: '/admin/rinks',
    MANAGE_EQUIPMENT: '/admin/equipment'
  }
};

/**
 * Helper function to construct full API URLs
 * @param endpoint - The API endpoint path
 * @returns The full API URL
 */
export const getApiUrl = (endpoint: string): string => `${API_BASE_URL}${endpoint}`;

// Human tasks:
// TODO: Verify that all required API endpoints are included
// TODO: Ensure API versioning strategy is correctly implemented
// TODO: Confirm that the API_BASE_URL is correctly set in the environment variables