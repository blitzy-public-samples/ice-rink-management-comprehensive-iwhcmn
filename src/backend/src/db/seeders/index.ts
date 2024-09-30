import { Sequelize } from 'sequelize';
import * as userSeeder from './userSeeder';
import * as rinkSeeder from './rinkSeeder';
import * as equipmentSeeder from './equipmentSeeder';
import * as bookingSeeder from './bookingSeeder';
import logger from '../../utils/logger';

/**
 * Main function to seed the entire database with initial or test data
 * @param sequelize Sequelize instance
 */
export async function seedDatabase(sequelize: Sequelize): Promise<void> {
  try {
    logger.info('Starting database seeding process');

    // Seed users
    await userSeeder.seed(sequelize);
    logger.info('User data seeded successfully');

    // Seed rinks
    await rinkSeeder.seed(sequelize);
    logger.info('Rink data seeded successfully');

    // Seed equipment
    await equipmentSeeder.seed(sequelize);
    logger.info('Equipment data seeded successfully');

    // Seed bookings
    await bookingSeeder.seed(sequelize);
    logger.info('Booking data seeded successfully');

    logger.info('Database seeding process completed successfully');
  } catch (error) {
    logger.error('Error occurred during database seeding:', error);
    throw error;
  }
}

/**
 * Function to clear all data from the database tables
 * @param sequelize Sequelize instance
 */
export async function clearDatabase(sequelize: Sequelize): Promise<void> {
  try {
    logger.info('Starting database clearing process');

    // Get all model names
    const modelNames = Object.keys(sequelize.models);

    // Disable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    // Truncate all tables
    for (const modelName of modelNames) {
      await sequelize.models[modelName].destroy({ truncate: true, force: true });
      logger.info(`Cleared table: ${modelName}`);
    }

    // Re-enable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    logger.info('Database clearing process completed successfully');
  } catch (error) {
    logger.error('Error occurred during database clearing:', error);
    throw error;
  }
}

// Commented list of human tasks
/*
Human tasks:
1. Implement individual seeder files (userSeeder, rinkSeeder, equipmentSeeder, bookingSeeder) [Required]
2. Ensure that the seeding process respects foreign key constraints and data integrity [Required]
3. Create a mechanism to easily switch between different sets of seed data (e.g., minimal data set, full test data set) [Optional]
*/