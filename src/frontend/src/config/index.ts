import { API_BASE_URL, API_VERSION, API_TIMEOUT, ENDPOINTS, REQUEST_METHODS, CONTENT_TYPE } from '../constants/api';

// Environment variables
const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_PRODUCTION = NODE_ENV === 'production';
const IS_DEVELOPMENT = NODE_ENV === 'development';

// Base configuration object
const BASE_CONFIG = {
  api: {
    baseUrl: API_BASE_URL,
    version: API_VERSION,
    timeout: API_TIMEOUT,
    endpoints: ENDPOINTS,
    methods: REQUEST_METHODS,
    contentType: CONTENT_TYPE
  },
  app: {
    name: 'Ice Rink Management System',
    version: '1.0.0'
  }
};

/**
 * Returns the configuration object based on the current environment
 * @returns {object} Configuration object containing all settings
 */
const getConfig = (): object => {
  // Create a base configuration object with common settings
  let config = { ...BASE_CONFIG };

  // If IS_PRODUCTION is true, merge production-specific settings
  if (IS_PRODUCTION) {
    config = {
      ...config,
      // Add production-specific settings here
      api: {
        ...config.api,
        // Example: Override API URL for production
        baseUrl: 'https://api.icerink-prod.com'
      }
    };
  }

  // If IS_DEVELOPMENT is true, merge development-specific settings
  if (IS_DEVELOPMENT) {
    config = {
      ...config,
      // Add development-specific settings here
      api: {
        ...config.api,
        // Example: Override API URL for development
        baseUrl: 'http://localhost:3000/api'
      }
    };
  }

  // Return the final configuration object
  return config;
};

export { getConfig, BASE_CONFIG, IS_PRODUCTION, IS_DEVELOPMENT };

// Human tasks (commented)
/**
 * TODO: Human Tasks
 * 1. Verify that all necessary environment variables are correctly set in the deployment environment (Required)
 * 2. Ensure that the configuration settings align with the backend services and deployment environment (Critical)
 * 3. Review and update the BASE_CONFIG object to include any additional global settings required by the application (Required)
 */