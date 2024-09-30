import { auth } from './auth';
import { errorHandler } from './errorHandler';
import { validation } from './validation';

export {
  auth,
  errorHandler,
  validation
};

/**
 * @fileoverview This file serves as the main export point for all middleware functions
 * used in the Ice Rink Management and Booking System API.
 * 
 * @module middleware
 */

/**
 * Authentication middleware
 * @function auth
 * @description Handles user authentication for protected routes
 */

/**
 * Global error handling middleware
 * @function errorHandler
 * @description Provides centralized error handling for the API
 */

/**
 * Request validation middleware
 * @function validation
 * @description Validates incoming requests against defined schemas
 */

// TODO: Implement the following tasks:
// - Implement the auth middleware in src/api/middleware/auth.ts
// - Implement the errorHandler middleware in src/api/middleware/errorHandler.ts
// - Implement the validation middleware in src/api/middleware/validation.ts