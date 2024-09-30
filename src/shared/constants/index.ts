/**
 * Central export file for all shared constants used in the Ice Rink Management and Booking System
 */

// Import all constants from apiEndpoints
import * as apiEndpoints from './apiEndpoints';

// Import all constants from errorMessages
import * as errorMessages from './errorMessages';

// Export API endpoints
export const API_ENDPOINTS = apiEndpoints;

// Export error messages
export const ERROR_MESSAGES = errorMessages;

// Default pagination limit
export const DEFAULT_PAGINATION_LIMIT = 10;

// Maximum allowed duration for a single booking in hours
export const MAX_BOOKING_DURATION = 3;

// Minimum allowed duration for a single booking in hours
export const MIN_BOOKING_DURATION = 0.5;

// Default opening hour for ice rinks (24-hour format)
export const RINK_OPEN_HOUR = 6;

// Default closing hour for ice rinks (24-hour format)
export const RINK_CLOSE_HOUR = 22;

// Enum of user roles in the system
export enum USER_ROLES {
  ADMIN = 'admin',
  MANAGER = 'manager',
  STAFF = 'staff',
  CUSTOMER = 'customer'
}

// Enum of possible booking statuses
export enum BOOKING_STATUS {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

// Enum of available equipment types for rental
export enum EQUIPMENT_TYPES {
  SKATES = 'skates',
  HELMET = 'helmet',
  GLOVES = 'gloves',
  STICK = 'stick',
  PUCK = 'puck'
}

// Human tasks (commented as requested)
/**
 * TODO: Human tasks
 * 1. Review and adjust constant values based on specific business requirements
 * 2. Ensure all necessary constants are included and properly named
 */