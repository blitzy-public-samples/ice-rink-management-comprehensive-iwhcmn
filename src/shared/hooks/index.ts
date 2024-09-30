// src/shared/hooks/index.ts

/**
 * This file serves as the main entry point for custom React hooks used across
 * the Ice Rink Management and Booking System. It exports all available hooks
 * for easy import in other parts of the application.
 */

// Import custom hooks
import { useAuth } from './useAuth';
import { useBooking } from './useBooking';

// Export custom hooks
export {
  useAuth,
  useBooking,
};

/**
 * useAuth: A custom hook for handling authentication-related functionality
 * This hook likely provides methods for user login, logout, and checking authentication status.
 */

/**
 * useBooking: A custom hook for managing booking-related operations
 * This hook probably offers functions for creating, updating, and canceling bookings,
 * as well as fetching booking information.
 */

// Note: The actual implementations of useAuth and useBooking hooks are in their respective files.
// This index file simply re-exports them for easier imports in other parts of the application.