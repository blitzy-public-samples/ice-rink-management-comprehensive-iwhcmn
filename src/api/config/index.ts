import dotenv from 'dotenv';
import { databaseConfig } from './database';
import { middlewareConfig } from './middleware';

// Load environment variables from .env file
const loadEnv = (): void => {
  dotenv.config();
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
  }
};

// Load environment variables
loadEnv();

// Define constants
const PORT: number = parseInt(process.env.PORT || '3000', 10);
const NODE_ENV: string = process.env.NODE_ENV;
const API_VERSION: string = process.env.API_VERSION || 'v1';

// Main configuration object
const config = {
  port: PORT,
  env: NODE_ENV,
  apiVersion: API_VERSION,
  database: databaseConfig,
  middleware: middlewareConfig,
};

export { config };

// Human tasks (commented)
/*
TODO: Human Tasks
1. Review and set appropriate values for environment variables in .env file
2. Ensure all necessary configuration options are included and properly set
*/