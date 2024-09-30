import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define the database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME || 'ice_rink_management',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  dialect: 'postgres' as const,
  pool: {
    max: parseInt(process.env.DB_POOL_MAX || '5', 10),
    min: parseInt(process.env.DB_POOL_MIN || '0', 10),
    acquire: parseInt(process.env.DB_POOL_ACQUIRE || '30000', 10),
    idle: parseInt(process.env.DB_POOL_IDLE || '10000', 10),
  },
};

// Create a Sequelize instance for database connection
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
  logging: process.env.NODE_ENV !== 'production' ? console.log : false,
});

/**
 * Creates and returns a Sequelize instance for database connection
 * @returns {Sequelize} A configured Sequelize instance
 */
export const createDatabaseConnection = (): Sequelize => {
  return sequelize;
};

/**
 * Tests the database connection and logs the result
 * @returns {Promise<void>} A promise that resolves when the connection test is complete
 */
export const testDatabaseConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

export default sequelize;

// Human tasks:
// TODO: Provide actual database credentials and connection details in the .env file
// TODO: Implement proper error handling and logging mechanism
// TODO: Set up database connection pooling for improved performance