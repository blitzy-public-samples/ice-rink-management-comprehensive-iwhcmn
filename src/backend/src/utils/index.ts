/**
 * @file index.ts
 * @description Index file for utility functions used in the backend of the Ice Rink Management and Booking System.
 * This file exports all utility functions from various utility modules for easy access throughout the application.
 */

// Import all utility functions from their respective modules
import * as logger from './logger';
import * as errorHandler from './errorHandler';
import * as dataTransformers from './dataTransformers';

// Export all utility functions
export {
  logger,
  errorHandler,
  dataTransformers
};

/**
 * @module utils
 * @description This module exports various utility functions used throughout the backend application.
 * It includes logging utilities, error handling functions, and data transformation helpers.
 * 
 * Usage:
 * import { logger, errorHandler, dataTransformers } from './utils';
 * 
 * logger.info('This is an info log');
 * const formattedError = errorHandler.formatError(new Error('Something went wrong'));
 * const transformedData = dataTransformers.transformBookingData(rawBookingData);
 */

// TODO: Review and ensure all necessary utility functions are exported
// TODO: Consider adding inline documentation for each exported module
// TODO: Ensure consistent naming conventions across all utility modules