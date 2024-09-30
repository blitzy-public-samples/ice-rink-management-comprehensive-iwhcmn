import { createClient, RedisClientType } from 'redis';
import { config } from '../index';

// Define the environment variables for Redis configuration
const REDIS_URL = process.env.REDIS_URL;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

/**
 * Creates and returns a configured Redis client instance
 * @returns {RedisClientType} Configured Redis client instance
 */
export const createRedisClient = (): RedisClientType => {
  // Create a new Redis client using the configuration from environment variables
  const client = createClient({
    url: `redis://${REDIS_URL}:${REDIS_PORT}`,
    password: REDIS_PASSWORD,
  });

  // Set up error handling for the Redis client
  client.on('error', (err) => {
    console.error('Redis Client Error:', err);
  });

  // Set up connection handling for the Redis client
  client.on('connect', () => {
    console.log('Redis Client Connected');
  });

  return client;
};

// Export the Redis client for use in other parts of the application
export const redisClient = createRedisClient();

// Human tasks (commented)
/*
TODO: Ensure that REDIS_URL, REDIS_PORT, and REDIS_PASSWORD environment variables are set in the deployment environment
TODO: Review and adjust Redis connection settings for different environments (development, staging, production)
*/