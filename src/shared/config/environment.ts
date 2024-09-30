import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define the NODE_ENV with a default value
const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Retrieves an environment variable with a fallback value
 * @param key - The name of the environment variable
 * @param defaultValue - The default value to return if the environment variable is not set
 * @returns The value of the environment variable or the default value
 */
function getEnvironmentVariable(key: string, defaultValue: any): any {
  const value = process.env[key];
  return value !== undefined ? value : defaultValue;
}

// Define the environment configuration object
export const environment = {
  NODE_ENV,
  API_URL: getEnvironmentVariable('API_URL', ''),
  DATABASE_URL: getEnvironmentVariable('DATABASE_URL', ''),
  REDIS_URL: getEnvironmentVariable('REDIS_URL', ''),
  JWT_SECRET: getEnvironmentVariable('JWT_SECRET', ''),
  STRIPE_PUBLIC_KEY: getEnvironmentVariable('STRIPE_PUBLIC_KEY', ''),
  STRIPE_SECRET_KEY: getEnvironmentVariable('STRIPE_SECRET_KEY', ''),
  SENDGRID_API_KEY: getEnvironmentVariable('SENDGRID_API_KEY', ''),
  TWILIO_ACCOUNT_SID: getEnvironmentVariable('TWILIO_ACCOUNT_SID', ''),
  TWILIO_AUTH_TOKEN: getEnvironmentVariable('TWILIO_AUTH_TOKEN', ''),
  GOOGLE_MAPS_API_KEY: getEnvironmentVariable('GOOGLE_MAPS_API_KEY', ''),
  AWS_S3_BUCKET: getEnvironmentVariable('AWS_S3_BUCKET', ''),
  AWS_ACCESS_KEY_ID: getEnvironmentVariable('AWS_ACCESS_KEY_ID', ''),
  AWS_SECRET_ACCESS_KEY: getEnvironmentVariable('AWS_SECRET_ACCESS_KEY', ''),
  FIREBASE_CONFIG: getEnvironmentVariable('FIREBASE_CONFIG', '{}'),
  SENTRY_DSN: getEnvironmentVariable('SENTRY_DSN', ''),
};

// Parse FIREBASE_CONFIG as JSON if it's a string
if (typeof environment.FIREBASE_CONFIG === 'string') {
  try {
    environment.FIREBASE_CONFIG = JSON.parse(environment.FIREBASE_CONFIG);
  } catch (error) {
    console.error('Error parsing FIREBASE_CONFIG:', error);
    environment.FIREBASE_CONFIG = {};
  }
}

// Freeze the environment object to prevent modifications
Object.freeze(environment);

// Export the environment configuration
export default environment;

// List of human tasks (commented as requested)
/*
Human tasks:
1. Verify and set actual values for environment variables in .env files for different environments (Critical)
2. Ensure all necessary environment variables are included and properly documented (Required)
3. Implement proper security measures for handling sensitive environment variables (Critical)
*/