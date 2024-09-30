/**
 * Main entry point for shared configuration across the Ice Rink Management and Booking System.
 * This file imports and exports configuration modules, primarily focusing on environment-specific settings.
 */

// Import the environment configuration module
import * as environment from './environment';

// Re-export the environment configuration module
export { environment };

// TODO: Review and confirm the structure of the environment configuration module
// TODO: Determine if additional configuration modules are needed and should be included in this index file

/**
 * This file serves as the main configuration hub for the Ice Rink Management and Booking System.
 * It centralizes access to various configuration modules, making it easier to manage and import
 * configuration settings throughout the application.
 * 
 * Currently, it only includes the environment configuration module. As the system grows,
 * additional configuration modules can be added here to keep the configuration organized
 * and easily accessible.
 * 
 * Example usage:
 * import { environment } from '@shared/config';
 * 
 * const apiUrl = environment.API_URL;
 */