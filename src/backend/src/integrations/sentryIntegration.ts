import * as Sentry from '@sentry/node';
import { SentryConfig } from '../types'; // Assuming SentryConfig is defined in a general types file

/**
 * Initializes the Sentry SDK with the provided configuration
 * @param config The Sentry configuration object
 */
export const initializeSentry = (config: SentryConfig): void => {
  const { dsn, environment } = config;
  
  Sentry.init({
    dsn,
    environment,
    // Add any additional configuration options here
    integrations: [
      // You can add custom integrations here
      new Sentry.Integrations.Http({ tracing: true }),
    ],
    tracesSampleRate: 1.0, // Capture 100% of transactions for performance monitoring
  });

  console.log(`Sentry initialized with environment: ${environment}`);
};

/**
 * Captures and sends an exception to Sentry
 * @param error The error object to be captured
 * @param context Additional context for the error
 * @returns The ID of the event captured in Sentry
 */
export const captureException = (error: Error, context?: object): string => {
  return Sentry.captureException(error, { extra: context });
};

/**
 * Captures and sends a message to Sentry
 * @param message The message to be captured
 * @param context Additional context for the message
 * @returns The ID of the event captured in Sentry
 */
export const captureMessage = (message: string, context?: object): string => {
  return Sentry.captureMessage(message, { extra: context });
};

/**
 * Sets the current user context for Sentry events
 * @param user The user object containing non-sensitive information
 */
export const setUser = (user: object): void => {
  // Ensure that sensitive information is not included in the user object
  const safeUser = {
    id: user['id'],
    username: user['username'],
    email: user['email'],
    // Add any other non-sensitive user information here
  };

  Sentry.setUser(safeUser);
};

/**
 * Clears the current user context for Sentry events
 */
export const clearUser = (): void => {
  Sentry.setUser(null);
};

// List of human tasks
/**
 * Human tasks:
 * 1. Review and update Sentry SDK version to ensure compatibility with the latest features and security patches
 * 2. Implement custom error boundary components for React applications to capture frontend errors
 * 3. Set up performance monitoring using Sentry's performance features
 */