/**
 * errorMessages.ts
 * 
 * This file defines constant error messages used throughout the Ice Rink Management and Booking System.
 * These messages provide consistent and clear communication for various error scenarios.
 */

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid email or password",
  USER_NOT_FOUND: "User not found",
  UNAUTHORIZED: "You are not authorized to perform this action",
  BOOKING_NOT_FOUND: "Booking not found",
  RINK_NOT_FOUND: "Ice rink not found",
  EQUIPMENT_NOT_FOUND: "Equipment not found",
  INVALID_BOOKING_TIME: "Invalid booking time",
  SLOT_NOT_AVAILABLE: "The selected time slot is not available",
  INSUFFICIENT_EQUIPMENT: "Insufficient equipment available for rental",
  PAYMENT_FAILED: "Payment processing failed",
  INVALID_INPUT: "Invalid input provided",
  SERVER_ERROR: "An unexpected error occurred. Please try again later",
};

// Human tasks:
// TODO: Review and adjust error messages to ensure they are clear, concise, and aligned with the application's tone and style
// TODO: Ensure all necessary error scenarios are covered by the provided error messages
// TODO: Consider adding localization support for error messages if multi-language support is required