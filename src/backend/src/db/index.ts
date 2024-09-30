import { Sequelize } from 'sequelize';
import { createDatabaseConnection } from '../config/database';

// Global variable to hold the Sequelize instance
let sequelize: Sequelize | null = null;

/**
 * Initializes the database connection and sets up models
 * @returns {Promise<void>} A promise that resolves when the database is initialized
 */
export const initializeDatabase = async (): Promise<void> => {
  try {
    // Call createDatabaseConnection to get the Sequelize instance
    sequelize = await createDatabaseConnection();

    // Import and initialize all models
    // TODO: Import and initialize models here
    // Example: const User = require('./models/User')(sequelize);

    // Set up model associations
    // TODO: Set up model associations here
    // Example: User.associate(sequelize.models);

    // Sync the database (in development environment only)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync();
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
};

/**
 * Returns the initialized Sequelize instance
 * @returns {Sequelize} The initialized Sequelize instance
 * @throws {Error} If the sequelize instance is not initialized
 */
export const getSequelizeInstance = (): Sequelize => {
  if (!sequelize) {
    throw new Error('Sequelize instance not initialized. Call initializeDatabase first.');
  }
  return sequelize;
};

// Export any other database-related functions or utilities here

/**
 * Human tasks:
 * 1. Implement proper error handling for database initialization failures (Critical)
 * 2. Set up database migration scripts for version control of database schema (Required)
 * 3. Implement a mechanism to gracefully close database connections (Required)
 */