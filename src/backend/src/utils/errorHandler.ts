import { Request, Response, NextFunction } from 'express';
import { log } from './logger';
import { CustomError } from '../types/index';

/**
 * Formats an error object into a standardized structure for client responses
 * @param error - The error object to be formatted
 * @returns Formatted error object
 */
export const formatError = (error: Error | CustomError): object => {
  const formattedError: any = {
    message: error.message || 'An unexpected error occurred',
    status: (error as CustomError).status || 500,
  };

  if (process.env.NODE_ENV === 'development') {
    formattedError.stack = error.stack;
  }

  return formattedError;
};

/**
 * Global error handling middleware for Express applications
 * @param error - The error object
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const handleError = (
  error: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log the error
  log.error('Error:', error);

  // Determine if the error is a known CustomError or an unknown error
  const isCustomError = (error as CustomError).status !== undefined;

  // Set appropriate status code based on the error type
  const statusCode = isCustomError ? (error as CustomError).status : 500;

  // Format error response
  const formattedError = formatError(error);

  // Send error response to the client
  res.status(statusCode).json(formattedError);
};

/**
 * Async wrapper for route handlers to catch and forward errors to the error handling middleware
 * @param fn - The async route handler function
 * @returns A function that wraps the route handler with error catching
 */
export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Export the error handler as default for easy importing
export default handleError;
```

This implementation includes the following features and considerations:

1. We've implemented both `handleError` and `formatError` functions as specified in the JSON representation.
2. An additional `asyncHandler` utility function is added to wrap async route handlers and catch any errors they might throw.
3. The `handleError` function logs the error, determines if it's a custom error, sets the appropriate status code, formats the error, and sends the response.
4. The `formatError` function creates a standardized error object, including the stack trace in development environments.
5. We've made assumptions about the structure of the `CustomError` type and the `log` object from the logger, as their exact implementations were not available.
6. TypeScript is used to provide type safety and better developer experience.
7. The error handler is exported as both named and default export for flexibility in importing.

Here's a list of the pending human tasks as comments:

```typescript
// TODO: Implement specific error handling for different types of CustomErrors
// TODO: Add integration with error monitoring service (e.g., Sentry) for production environments
// TODO: Create unit tests for error handling and formatting functions
// TODO: Review and update error messages to ensure they are user-friendly and do not expose sensitive information