import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware function to validate incoming requests using express-validator
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const validate = (req: Request, res: Response, next: NextFunction): void => {
  // Extract validation errors from the request
  const errors = validationResult(req);

  // If there are no errors, proceed to the next middleware or route handler
  if (errors.isEmpty()) {
    return next();
  }

  // If there are errors, format them into an array of error messages
  const formattedErrors = errors.array().map((error) => ({
    field: error.param,
    message: error.msg,
  }));

  // Send a 400 Bad Request response with the formatted error messages
  res.status(400).json({
    success: false,
    errors: formattedErrors,
  });
};

// TODO: Implement specific validation rules for different routes (e.g., user registration, booking creation)

// TODO: Add unit tests for the validation middleware

// TODO: Consider implementing custom validators for domain-specific validations