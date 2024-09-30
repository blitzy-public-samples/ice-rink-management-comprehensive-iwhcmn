/**
 * @file src/mobile/src/config/index.ts
 * @description Central configuration module for the mobile application.
 * This file imports and exports configuration constants and settings from various sources,
 * providing a single point of access for application-wide configuration.
 */

import * as apiConstants from '../constants/api';
import * as routeConstants from '../constants/routes';

// Global configuration constants
export const APP_NAME = 'Ice Rink Management';
export const APP_VERSION = '1.0.0';
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const API_TIMEOUT = 30000; // 30 seconds
export const MAX_RETRY_ATTEMPTS = 3;

/**
 * Returns the configuration object with all settings and constants
 * @returns {object} Configuration object containing all settings and imported constants
 */
export function getConfig() {
  const config = {
    APP_NAME,
    APP_VERSION,
    IS_PRODUCTION,
    API_TIMEOUT,
    MAX_RETRY_ATTEMPTS,
    ...apiConstants,
    ...routeConstants,
  };

  return config;
}

// Export all imported constants
export { apiConstants, routeConstants };

// TODO: Verify the APP_VERSION and update it according to the current release version
// TODO: Confirm that the API_TIMEOUT and MAX_RETRY_ATTEMPTS values are appropriate for the application's requirements
// TODO: Ensure that all necessary configuration variables are included in the getConfig function