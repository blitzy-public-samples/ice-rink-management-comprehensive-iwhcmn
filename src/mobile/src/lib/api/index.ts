/**
 * This file serves as the main entry point for the API module in the mobile app.
 * It exports all the API functions from various sub-modules to provide a centralized
 * access point for API calls.
 */

// Import all API functions from sub-modules
import * as authApi from './auth';
import * as bookingsApi from './bookings';
import * as rinksApi from './rinks';
import * as equipmentApi from './equipment';

// Export all API functions
export {
  authApi,
  bookingsApi,
  rinksApi,
  equipmentApi,
};

// Export individual API modules for more granular imports if needed
export * as auth from './auth';
export * as bookings from './bookings';
export * as rinks from './rinks';
export * as equipment from './equipment';

/**
 * Human Tasks:
 * 1. Implement the individual API modules (auth.ts, bookings.ts, rinks.ts, equipment.ts) with their respective API calls
 * 2. Ensure that the API functions in each module align with the backend API endpoints
 * 3. Add error handling and request/response type definitions in each API module
 */