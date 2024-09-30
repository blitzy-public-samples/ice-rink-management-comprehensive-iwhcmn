import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

/**
 * Custom error class for application-specific errors
 */
export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'CustomError';
    this.statusCode = statusCode;
  }
}

/**
 * Express middleware function for handling errors
 * @param err - The error object
 * @param req - The request object
 * @param res - The response object
 * @param next - The next middleware function
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log the error using the logger utility
  logger.error(`Error: ${err.message}`, { error: err, req });

  // Determine the status code based on the error type
  let statusCode = 500;
  if (err instanceof CustomError) {
    statusCode = err.statusCode;
  }

  // Format the error message
  const errorResponse = {
    error: {
      message: err.message || 'Internal Server Error',
      status: statusCode,
    },
  };

  // Send the formatted error response to the client
  res.status(statusCode).json(errorResponse);
};

// Human tasks:
// TODO: Implement error reporting to external service (e.g., Sentry) [Optional]
// TODO: Add more specific error types for different scenarios (e.g., ValidationError, AuthenticationError) [Required]