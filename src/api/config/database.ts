import { Pool, PoolConfig } from 'pg';

// Constants for database configuration
const DB_HOST: string = process.env.DB_HOST || 'localhost';
const DB_PORT: number = parseInt(process.env.DB_PORT || '5432', 10);
const DB_NAME: string = process.env.DB_NAME || 'ice_rink_db';
const DB_USER: string = process.env.DB_USER || 'postgres';
const DB_PASSWORD: string = process.env.DB_PASSWORD || '';

/**
 * Creates and returns the database configuration object
 * @returns {PoolConfig} Database configuration object
 */
const createDatabaseConfig = (): PoolConfig => {
  // Retrieve database connection details from environment variables
  const config: PoolConfig = {
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    // Additional configuration options
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
    connectionTimeoutMillis: 2000, // How long to wait when connecting a new client
    ssl: {
      rejectUnauthorized: false // This should be set to true in production with proper SSL setup
    }
  };

  return config;
};

// Create the database configuration
const databaseConfig = createDatabaseConfig();

// Create a new pool using the configuration
const pool = new Pool(databaseConfig);

// Export the pool as default
export default pool;

// Human tasks:
// TODO: Set up environment variables for database connection in .env file
// TODO: Review and adjust database connection pool settings if necessary
// TODO: Configure SSL settings based on the deployment environment