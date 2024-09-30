/**
 * Main entry point for API type definitions in the Ice Rink Management and Booking System
 */

// TODO: Review and confirm the types exported from this file
// TODO: Ensure all necessary API-related types are included

/**
 * Enum representing user roles in the system
 */
export enum UserRole {
  SuperAdmin = 'SuperAdmin',
  RinkManager = 'RinkManager',
  Staff = 'Staff',
  Coach = 'Coach',
  Customer = 'Customer'
}

/**
 * Interface for standard API response
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Interface for paginated API response
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Interface for API error response
 */
export interface ErrorResponse {
  success: boolean;
  message: string;
  errors: string[];
}

// Note: The import from './express.d' is omitted as the file doesn't exist yet.
// When the file is created, uncomment the following line:
// import * as ExpressTypes from './express.d';

// Export ExpressTypes when available
// export { ExpressTypes };