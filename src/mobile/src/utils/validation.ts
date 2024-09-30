/**
 * Utility functions for validating user input and data in the Ice Rink Management and Booking System mobile application.
 * These functions provide reusable validation logic to ensure data integrity and improve user experience.
 */

/**
 * Validates an email address.
 * @param email The email address to validate.
 * @returns True if the email is valid, false otherwise.
 */
export const validateEmail = (email: string): boolean => {
  // Use a regular expression to check if the email format is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a password based on specific criteria.
 * @param password The password to validate.
 * @returns True if the password meets the criteria, false otherwise.
 */
export const validatePassword = (password: string): boolean => {
  // Check if the password is at least 8 characters long
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
  // Use a regular expression to check if the phone number format is valid
  // This regex assumes a format like: +1 (123) 456-7890 or 123-456-7890
  const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return phoneRegex.test(phoneNumber);
};

/**
 * Validates a booking date.
 * @param date The date to validate.
 * @returns True if the booking date is valid, false otherwise.
 */
export const validateBookingDate = (date: Date): boolean => {
  const currentDate = new Date();
  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

  // Check if the date is not in the past
  if (date < currentDate) return false;

  // Check if the date is not more than 6 months in the future
  if (date > sixMonthsFromNow) return false;

  return true;
};

/**
 * Validates the duration of a booking.
 * @param durationInMinutes The duration of the booking in minutes.
 * @returns True if the duration is valid, false otherwise.
 */
export const validateBookingDuration = (durationInMinutes: number): boolean => {
  // Check if the duration is a multiple of 30 minutes
  if (durationInMinutes % 30 !== 0) return false;

  // Check if the duration is between 30 minutes and 3 hours
  if (durationInMinutes < 30 || durationInMinutes > 180) return false;

  return true;
};

/**
 * Validates the quantity of equipment for rental.
 * @param quantity The quantity of equipment to validate.
 * @returns True if the quantity is valid, false otherwise.
 */
export const validateEquipmentQuantity = (quantity: number): boolean => {
  // Check if the quantity is a positive integer
  if (!Number.isInteger(quantity) || quantity <= 0) return false;

  // Check if the quantity is less than or equal to 10 (assuming a maximum rental limit)
  if (quantity > 10) return false;

  return true;
};

// Human tasks:
// TODO: Review and adjust the password validation criteria if needed
// TODO: Confirm the maximum booking date range (currently set to 6 months) and adjust if necessary
// TODO: Verify the maximum equipment rental quantity (currently set to 10) and update if needed