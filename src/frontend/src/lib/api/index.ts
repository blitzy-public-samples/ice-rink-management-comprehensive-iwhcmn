/**
 * This file serves as the main entry point for the API-related functionality in the frontend application.
 * It exports all the API functions from various modules to provide a centralized access point for API calls.
 */

// Import all API functions from their respective modules
import * as authApi from './auth';
import * as bookingsApi from './bookings';
import * as rinksApi from './rinks';
import * as equipmentApi from './equipment';
import * as adminApi from './admin';

// Export all API functions
export {
  authApi,
  bookingsApi,
  rinksApi,
  equipmentApi,
  adminApi
};

// TODO: Implement error handling and logging strategy for API calls
// This could involve creating a wrapper function that catches errors and logs them
// before re-throwing or handling them as needed.

// TODO: Consider implementing a custom hook or context for managing API state and caching
// This could improve performance and provide a consistent way to handle loading states and errors.

/**
 * Human Tasks:
 * 1. Review and confirm the structure of the API modules (auth, bookings, rinks, equipment, admin)
 *    to ensure they align with the backend API endpoints and project requirements.
 * 2. Implement error handling and logging strategy for API calls, possibly by wrapping
 *    the exported functions.
 * 3. Consider implementing a custom hook or context for managing API state and caching,
 *    if not already done in individual API modules.
 */