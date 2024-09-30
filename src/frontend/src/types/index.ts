// This file serves as the main entry point for all shared types used in the frontend of the Ice Rink Management and Booking System.
// It exports types from various domain-specific files to provide a centralized location for type imports.

// Import and re-export all types from the booking module
export * from './booking';

// Import and re-export all types from the rink module
export * from './rink';

// Import and re-export all types from the equipment module
export * from './equipment';

// Import and re-export all types from the user module
export * from './user';

// Additional types can be defined here if they are not specific to any particular domain

// Example of a shared type that might be used across multiple domains
export interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

// Example of a shared enum that might be used across multiple domains
export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
}

// Example of a shared utility type
export type Nullable<T> = T | null;

// Example of a shared interface for API responses
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// Add any other shared types, interfaces, or type aliases that are used across multiple components or modules

// Note: The actual content of the imported types (booking, rink, equipment, user) should be defined in their respective files.
// This index file serves as a centralized export point for easy importing in other parts of the application.

// TODO: Review and confirm that all necessary types are exported from this index file
// TODO: Ensure that any additional domain-specific types needed for the frontend are created and exported