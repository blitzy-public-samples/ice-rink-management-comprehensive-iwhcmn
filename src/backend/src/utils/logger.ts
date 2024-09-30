import winston from 'winston';
import { LogLevel } from '../types';

// Define the global LOG_LEVEL variable
const LOG_LEVEL: LogLevel = (process.env.LOG_LEVEL as LogLevel) || 'info';

/**
 * Creates and configures a Winston logger instance with custom settings
 * @returns {winston.Logger} Configured Winston logger instance
 */
const createLogger = (): winston.Logger => {
  // Define log format using Winston format
  const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  );

  // Create and configure Winston logger with console transport
  const logger = winston.createLogger({
    level: LOG_LEVEL,
    format: logFormat,
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        ),
      }),
    ],
  });

  return logger;
};

// Create a singleton instance of the logger
const logger = createLogger();

/**
 * Wrapper function for logging messages with different log levels
 * @param {string} level - The log level
 * @param {string} message - The log message
 * @param {object} meta - Additional metadata to be logged
 */
export const log = (level: LogLevel, message: string, meta: object = {}): void => {
  logger.log(level, message, meta);
};

export default logger;

// Human tasks:
// TODO: Implement error handling for logger initialization failures
// TODO: Add support for logging to external services (e.g., Sentry, ELK stack) for production environments
// TODO: Create unit tests for the logger utility