import dotenv from 'dotenv';
import * as database from './database';
import * as redis from './redis';
import * as aws from './aws';

// Load environment variables from .env file
export const loadEnvironment = (): void => {
  dotenv.config();
};

// Define global variables
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 3000;
export const API_VERSION = process.env.API_VERSION || 'v1';

// Get the complete configuration object
export const getConfig = (): Record<string, any> => {
  loadEnvironment();

  return {
    env: NODE_ENV,
    port: PORT,
    apiVersion: API_VERSION,
    database: database.getConfig(),
    redis: redis.getConfig(),
    aws: aws.getConfig(),
  };
};

// Export all configurations
export default {
  loadEnvironment,
  getConfig,
  NODE_ENV,
  PORT,
  API_VERSION,
};

// Export individual configurations
export * from './database';
export * from './redis';
export * from './aws';

/**
 * TODO: Human Tasks
 * 1. Review and update environment variables for different deployment environments
 * 2. Implement proper error handling for configuration loading
 * 3. Ensure all necessary configuration options are included based on the project requirements
 */