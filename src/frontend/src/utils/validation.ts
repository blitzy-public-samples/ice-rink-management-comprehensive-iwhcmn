/**
 * Utility functions for input validation in the frontend of the Ice Rink Management and Booking System.
 * This file provides reusable validation functions for various form inputs and data types.
 */

/**
 * Validates an email address.
 * @param email The email address to validate.
 * @returns True if the email is valid, false otherwise.
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a password based on specific criteria.
 * @param password The password to validate.
 * @returns True if the password meets the criteria, false otherwise.
 */
export const validatePassword = (password: string): boolean => {
  // Check if the password length is at least 8 characters
  if (password.length < 8) return false;

  // Check if the password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) return false;

  // Check if the password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) return false;

  // Check if the password contains at least one number
  if (!/\d/.test(password)) return false;

  // Check if the password contains at least one special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return false;

  return true;
};

/**
 * Validates a phone number.
 * @param phoneNumber The phone number to validate.
 * @returns True if the phone number is valid, false otherwise.
 */
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phoneNumber);
};

/**
 * Validates a date range for bookings.
 * @param startDate The start date of the booking.
 * @param endDate The end date of the booking.
 * @returns True if the date range is valid, false otherwise.
 */
export const validateDateRange = (startDate: Date, endDate: Date): boolean => {
  // Check if both startDate and endDate are valid Date objects
  if (!(startDate instanceof Date) || !(endDate instanceof Date)) return false;

  // Check if startDate is before endDate
  if (startDate >= endDate) return false;

  // Check if the date range is within the allowed booking period (e.g., 1 year from now)
  const maxBookingDate = new Date();
  maxBookingDate.setFullYear(maxBookingDate.getFullYear() + 1);
  if (endDate > maxBookingDate) return false;

  return true;
};

/**
 * Validates the duration of a booking.
 * @param startDate The start date of the booking.
 * @param endDate The end date of the booking.
 * @returns True if the booking duration is valid, false otherwise.
 */
export const validateBookingDuration = (startDate: Date, endDate: Date): boolean => {
  // Calculate the duration between startDate and endDate
  const duration = endDate.getTime() - startDate.getTime();
  const durationInHours = duration / (1000 * 60 * 60);

  // Check if the duration is within the allowed minimum and maximum booking duration
  const minDuration = 1; // 1 hour
  const maxDuration = 4; // 4 hours
  return durationInHours >= minDuration && durationInHours <= maxDuration;
};

/**
 * Validates the quantity of equipment for rental.
 * @param quantity The quantity of equipment to rent.
 * @param availableQuantity The available quantity of the equipment.
 * @returns True if the quantity is valid, false otherwise.
 */
export const validateEquipmentQuantity = (quantity: number, availableQuantity: number): boolean => {
  // Check if the quantity is a positive integer
  if (!Number.isInteger(quantity) || quantity <= 0) return false;

  // Check if the quantity is less than or equal to the available quantity
  if (quantity > availableQuantity) return false;

  return true;
};

// Human tasks:
// TODO: Review and adjust validation criteria for passwords, phone numbers, and booking durations based on specific business requirements
// TODO: Implement additional validation functions for rink-specific data if needed