import { Umzug, SequelizeStorage } from 'umzug';
import { Sequelize } from 'sequelize';
import logger from '../utils/logger';

// Assuming createDatabaseConnection is exported from '../config/database'
import { createDatabaseConnection } from '../config/database';

async function runMigrations(): Promise<void> {
  try {
    // Create a database connection
    const sequelize = await createDatabaseConnection();

    // Initialize Umzug with Sequelize instance and SequelizeStorage
    const umzug = new Umzug({
      migrations: {
        glob: 'src/backend/src/db/migrations/*.ts',
      },
      context: sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize }),
      logger: console,
    });

    // Run pending migrations
    const migrations = await umzug.up();

    if (migrations.length === 0) {
      logger.info('No migrations were executed, database schema is up to date.');
    } else {
      logger.info(`Executed ${migrations.length} migrations successfully.`);
    }
  } catch (error) {
    logger.error('Error running migrations:', error);
    throw error;
  }
}

async function main(): Promise<void> {
  try {
    logger.info('Starting database migration script...');
    await runMigrations();
    logger.info('Database migration completed successfully.');
    process.exit(0);
  } catch (error) {
    logger.error('Database migration failed:', error);
    process.exit(1);
  }
}

// Run the main function
main();

// Export the functions for testing purposes
export { runMigrations, main };

// Human tasks:
// TODO: Create individual migration files for each database schema change
// TODO: Implement rollback functionality for migrations
// TODO: Set up proper logging and error reporting mechanism
// TODO: Create a separate configuration for test database migrations