/**
 * This file defines all the API endpoints used in the Ice Rink Management and Booking System.
 * It exports an object containing the URLs for various API routes.
 */

// Define the base URL for the API
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Define the API version prefix
const API_VERSION = '/v1';

/**
 * Object containing all API endpoint URLs
 */
export const endpoints = {
  auth: {
    login: `${BASE_URL}${API_VERSION}/auth/login`,
    register: `${BASE_URL}${API_VERSION}/auth/register`,
    logout: `${BASE_URL}${API_VERSION}/auth/logout`,
    refreshToken: `${BASE_URL}${API_VERSION}/auth/refresh-token`,
  },
  users: {
    getProfile: `${BASE_URL}${API_VERSION}/users/profile`,
    updateProfile: `${BASE_URL}${API_VERSION}/users/profile`,
  },
  bookings: {
    create: `${BASE_URL}${API_VERSION}/bookings`,
    getAll: `${BASE_URL}${API_VERSION}/bookings`,
    getById: (id: string) => `${BASE_URL}${API_VERSION}/bookings/${id}`,
    update: (id: string) => `${BASE_URL}${API_VERSION}/bookings/${id}`,
    cancel: (id: string) => `${BASE_URL}${API_VERSION}/bookings/${id}/cancel`,
  },
  rinks: {
    getAll: `${BASE_URL}${API_VERSION}/rinks`,
    getById: (id: string) => `${BASE_URL}${API_VERSION}/rinks/${id}`,
    getSchedule: (id: string) => `${BASE_URL}${API_VERSION}/rinks/${id}/schedule`,
  },
  equipment: {
    getAll: `${BASE_URL}${API_VERSION}/equipment`,
    getById: (id: string) => `${BASE_URL}${API_VERSION}/equipment/${id}`,
    rent: `${BASE_URL}${API_VERSION}/equipment/rent`,
  },
  admin: {
    users: `${BASE_URL}${API_VERSION}/admin/users`,
    rinks: `${BASE_URL}${API_VERSION}/admin/rinks`,
    equipment: `${BASE_URL}${API_VERSION}/admin/equipment`,
    reports: `${BASE_URL}${API_VERSION}/admin/reports`,
  },
};

// Export the endpoints object as the default export
export default endpoints;

/**
 * Human tasks:
 * 1. Verify that all required API endpoints are included
 * 2. Ensure that the endpoint URLs are correct and match the backend API routes
 * 3. Consider adding version prefixes to API routes for future compatibility
 */