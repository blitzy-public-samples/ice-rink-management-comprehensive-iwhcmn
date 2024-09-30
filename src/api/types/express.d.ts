import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { User } from '../models/User';

// Define the ApiResponse interface
interface ApiResponse {
  success: boolean;
  data?: any;
  message?: string;
}

// Define the ErrorResponse interface
interface ErrorResponse {
  success: boolean;
  error: {
    message: string;
    code?: number;
    details?: any;
  };
}

declare global {
  namespace Express {
    /**
     * Extended Express Request interface for the Ice Rink Management and Booking System
     */
    interface Request extends ExpressRequest {
      /**
       * Authenticated user object
       */
      user?: User;
    }

    /**
     * Extended Express Response interface for the Ice Rink Management and Booking System
     */
    interface Response extends ExpressResponse {
      /**
       * Send a standardized API response
       * @param response The API response object
       */
      sendApiResponse(response: ApiResponse): void;

      /**
       * Send a standardized error response
       * @param response The error response object
       */
      sendErrorResponse(response: ErrorResponse): void;
    }
  }
}

// Export an empty object to make this file a module
export {};