/**
 * Utility functions for data validation used across the Ice Rink Management and Booking System.
 */

/**
 * Validates if the given string is a valid email address.
 * @param email The email address to validate
 * @returns True if the email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates if the given string is a valid phone number.
 * @param phoneNumber The phone number to validate
 * @returns True if the phone number is valid, false otherwise
 */
export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  // This regex allows for various phone number formats
  // It's a basic validation and might need to be adjusted based on specific requirements
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phoneRegex.test(phoneNumber);
};

/**
 * Validates if the given string meets the password requirements.
 * @param password The password to validate
 * @returns True if the password meets the requirements, false otherwise
 */
export const isValidPassword = (password: string): boolean => {
  // Check if the password length is at least 12 characters
  if (password.length < 12) return false;

  // Check if the password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) return false;

  // Check if the password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) return false;

  // Check if the password contains at least one number
  if (!/[0-9]/.test(password)) return false;

  // Check if the password contains at least one special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return false;

  return true;
};

/**
 * Validates if the given string is a valid date.
 * @param date The date string to validate
 * @returns True if the date is valid, false otherwise
 */
export const isValidDate = (date: string): boolean => {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
};

/**
 * Validates if the given time slot is valid for ice rink bookings.
 * @param startTime The start time of the booking
 * @param endTime The end time of the booking
 * @returns True if the time slot is valid, false otherwise
 */
export const isValidTimeSlot = (startTime: string, endTime: string): boolean => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  // Check if both startTime and endTime are valid dates
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return false;

  // Verify that startTime is before endTime
  if (start >= end) return false;

  // Check if the duration is within the allowed booking time limits
  // For this example, we'll assume a maximum booking duration of 3 hours
  const maxDuration = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
  if (end.getTime() - start.getTime() > maxDuration) return false;

  return true;
};

/**
 * Validates if the given booking type is one of the allowed types.
 * @param bookingType The booking type to validate
 * @returns True if the booking type is valid, false otherwise
 */
export const isValidBookingType = (bookingType: string): boolean => {
  const allowedBookingTypes = ['public', 'private', 'lesson', 'event', 'maintenance'];
  return allowedBookingTypes.includes(bookingType.toLowerCase());
};

/**
 * Human tasks:
 * 1. Review and confirm the list of validation functions to ensure all necessary validations for the Ice Rink Management and Booking System are covered (Required)
 * 2. Implement specific validation rules for ice rink-related data (e.g., rink capacity, equipment types) if needed (Optional)
 */