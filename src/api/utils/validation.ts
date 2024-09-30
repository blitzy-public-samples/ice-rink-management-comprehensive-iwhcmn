import Joi from 'joi';

/**
 * Validates an email address
 * @param email The email address to validate
 * @returns True if the email is valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  const emailSchema = Joi.string().email().required();
  const { error } = emailSchema.validate(email);
  return !error;
};

/**
 * Validates a password against defined criteria
 * @param password The password to validate
 * @returns True if the password meets the criteria, false otherwise
 */
export const validatePassword = (password: string): boolean => {
  const passwordSchema = Joi.string()
    .min(12)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/)
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'string.min': 'Password must be at least 12 characters long',
    });

  const { error } = passwordSchema.validate(password);
  return !error;
};

/**
 * Validates a booking date
 * @param date The date string to validate
 * @returns True if the date is valid and in the future, false otherwise
 */
export const validateBookingDate = (date: string): boolean => {
  const parsedDate = new Date(date);
  const now = new Date();

  if (isNaN(parsedDate.getTime())) {
    return false; // Invalid date format
  }

  return parsedDate > now;
};

/**
 * Validates a phone number
 * @param phoneNumber The phone number to validate
 * @returns True if the phone number is valid, false otherwise
 */
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  // This regex pattern allows for various international phone number formats
  const phoneRegex = /^(\+\d{1,3}[-.\s]?)?(\d{1,4}[-.\s]?)?\d{1,4}[-.\s]?\d{1,9}$/;
  return phoneRegex.test(phoneNumber);
};

// Export a general validate function that can be used for any Joi schema
export const validate = (schema: Joi.Schema, data: any): { error?: Joi.ValidationError } => {
  return schema.validate(data, { abortEarly: false });
};

// TODO: Implement additional validation functions as needed for specific data types in the Ice Rink Management system

// TODO: Ensure all validation functions have appropriate error handling and messaging