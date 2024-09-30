import { faker } from '@faker-js/faker';
import moment from 'moment';
import { getConfig } from '../config';
import { initializeDatabase, getSequelizeInstance } from '../db';
import { logger } from '../utils';
import { User, Rink, Booking, Equipment } from '../db/models';

// Global constants for the number of entities to generate
const NUM_USERS = 50;
const NUM_RINKS = 5;
const NUM_BOOKINGS = 100;
const NUM_EQUIPMENT = 20;

/**
 * Generates sample user data
 * @returns {Promise<void>} A promise that resolves when users are created
 */
async function generateUsers(): Promise<void> {
  const users = Array.from({ length: NUM_USERS }, () => ({
    email: faker.internet.email(),
    password_hash: faker.internet.password(), // In a real scenario, this should be properly hashed
    user_type: faker.helpers.arrayElement(['customer', 'staff', 'admin']),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    date_of_birth: faker.date.past({ years: 50 }),
  }));

  try {
    await User.bulkCreate(users);
    logger.info(`Successfully generated ${NUM_USERS} users`);
  } catch (error) {
    logger.error('Error generating users:', error);
    throw error;
  }
}

/**
 * Generates sample rink data
 * @returns {Promise<void>} A promise that resolves when rinks are created
 */
async function generateRinks(): Promise<void> {
  const rinks = Array.from({ length: NUM_RINKS }, () => ({
    name: `${faker.location.city()} Ice Rink`,
    address: faker.location.streetAddress(),
    capacity: faker.number.int({ min: 50, max: 200 }),
    contact_info: faker.phone.number(),
  }));

  try {
    await Rink.bulkCreate(rinks);
    logger.info(`Successfully generated ${NUM_RINKS} rinks`);
  } catch (error) {
    logger.error('Error generating rinks:', error);
    throw error;
  }
}

/**
 * Generates sample booking data
 * @returns {Promise<void>} A promise that resolves when bookings are created
 */
async function generateBookings(): Promise<void> {
  const users = await User.findAll();
  const rinks = await Rink.findAll();

  const bookings = Array.from({ length: NUM_BOOKINGS }, () => {
    const startTime = faker.date.future();
    const endTime = moment(startTime).add(1, 'hour').toDate();
    return {
      user_id: faker.helpers.arrayElement(users).id,
      rink_id: faker.helpers.arrayElement(rinks).id,
      start_time: startTime,
      end_time: endTime,
      total_price: faker.number.float({ min: 50, max: 200, precision: 0.01 }),
      status: faker.helpers.arrayElement(['confirmed', 'pending', 'cancelled']),
    };
  });

  try {
    await Booking.bulkCreate(bookings);
    logger.info(`Successfully generated ${NUM_BOOKINGS} bookings`);
  } catch (error) {
    logger.error('Error generating bookings:', error);
    throw error;
  }
}

/**
 * Generates sample equipment data
 * @returns {Promise<void>} A promise that resolves when equipment is created
 */
async function generateEquipment(): Promise<void> {
  const rinks = await Rink.findAll();

  const equipment = Array.from({ length: NUM_EQUIPMENT }, () => ({
    rink_id: faker.helpers.arrayElement(rinks).id,
    name: faker.helpers.arrayElement(['Skates', 'Helmet', 'Gloves', 'Puck', 'Stick']),
    type: faker.helpers.arrayElement(['rental', 'sale']),
    quantity: faker.number.int({ min: 10, max: 100 }),
    status: faker.helpers.arrayElement(['available', 'maintenance', 'out_of_stock']),
  }));

  try {
    await Equipment.bulkCreate(equipment);
    logger.info(`Successfully generated ${NUM_EQUIPMENT} equipment items`);
  } catch (error) {
    logger.error('Error generating equipment:', error);
    throw error;
  }
}

/**
 * Main function to orchestrate the test data generation process
 * @returns {Promise<void>} A promise that resolves when all test data is generated
 */
async function main(): Promise<void> {
  try {
    const config = getConfig();
    await initializeDatabase(config.database);
    const sequelize = getSequelizeInstance();

    await sequelize.sync({ force: true }); // This will drop all tables and recreate them
    logger.info('Database synchronized');

    await generateUsers();
    await generateRinks();
    await generateBookings();
    await generateEquipment();

    logger.info('Test data generation completed successfully');
  } catch (error) {
    logger.error('Error generating test data:', error);
    process.exit(1);
  } finally {
    const sequelize = getSequelizeInstance();
    await sequelize.close();
  }
}

// Run the main function
main();

// Human tasks (commented)
/*
TODO: Review and adjust the number of entities to be generated based on testing needs
TODO: Implement proper error handling and rollback mechanism in case of failures during data generation
TODO: Add command-line arguments to customize the number of entities to be generated
TODO: Ensure generated data complies with any business rules or constraints of the application
*/