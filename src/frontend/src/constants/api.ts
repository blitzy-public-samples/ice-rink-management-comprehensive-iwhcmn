// API Base URL and Version
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
export const API_VERSION = 'v1';
export const API_TIMEOUT = 30000;

// API Endpoints
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token'
  },
  USERS: {
    GET_PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile'
  },
  BOOKINGS: {
    CREATE: '/bookings',
    GET_ALL: '/bookings',
    GET_BY_ID: '/bookings/{id}',
    UPDATE: '/bookings/{id}',
    DELETE: '/bookings/{id}'
  },
  RINKS: {
    GET_ALL: '/rinks',
    GET_BY_ID: '/rinks/{id}',
    GET_SCHEDULE: '/rinks/{id}/schedule'
  },
  EQUIPMENT: {
    GET_ALL: '/equipment',
    GET_BY_ID: '/equipment/{id}',
    RENT: '/equipment/rent'
  }
};

// HTTP Request Methods
export const REQUEST_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

// Content Types
export const CONTENT_TYPE = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data'
};

// Human Tasks (commented as requested)
/*
Human tasks:
1. Verify the API_BASE_URL environment variable is correctly set in the deployment environment
2. Ensure all API endpoints are correctly defined and match the backend implementation
*/