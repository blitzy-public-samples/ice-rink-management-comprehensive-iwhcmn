import { Sequelize } from 'sequelize';
import { faker } from '@faker-js/faker';
import { createDatabaseConnection } from '../config/database';

// Seed Users
async function seedUsers(sequelize: Sequelize): Promise<void> {
  const User = sequelize.models.User;
  const usersData = Array.from({ length: 50 }, () => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dateOfBirth: faker.date.past({ years: 50 }),
    userType: faker.helpers.arrayElement(['customer', 'staff', 'admin']),
  }));

  await User.bulkCreate(usersData);
  console.log('Users seeded successfully');
}

// Seed Rinks
async function seedRinks(sequelize: Sequelize): Promise<void> {
  const Rink = sequelize.models.Rink;
  const rinksData = Array.from({ length: 10 }, () => ({
    name: faker.company.name() + ' Ice Rink',
    address: faker.location.streetAddress(),
    capacity: faker.number.int({ min: 50, max: 500 }),
    contactInfo: faker.phone.number(),
  }));

  await Rink.bulkCreate(rinksData);
  console.log('Rinks seeded successfully');
}

// Seed Equipment
async function seedEquipment(sequelize: Sequelize): Promise<void> {
  const Equipment = sequelize.models.Equipment;
  const equipmentData = Array.from({ length: 100 }, () => ({
    name: faker.commerce.productName(),
    type: faker.helpers.arrayElement(['skates', 'helmets', 'sticks', 'pads']),
    quantity: faker.number.int({ min: 1, max: 50 }),
    status: faker.helpers.arrayElement(['available', 'in use', 'maintenance']),
    rinkId: faker.number.int({ min: 1, max: 10 }), // Assuming 10 rinks were created
  }));

  await Equipment.bulkCreate(equipmentData);
  console.log('Equipment seeded successfully');
}

// Seed Bookings
async function seedBookings(sequelize: Sequelize): Promise<void> {
  const Booking = sequelize.models.Booking;
  const User = sequelize.models.User;
  const Rink = sequelize.models.Rink;

  const users = await User.findAll({ where: { userType: 'customer' } });
  const rinks = await Rink.findAll();

  const bookingsData = Array.from({ length: 200 }, () => {
    const startTime = faker.date.future();
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour later
    return {
      userId: faker.helpers.arrayElement(users).id,
      rinkId: faker.helpers.arrayElement(rinks).id,
      startTime,
      endTime,
      totalPrice: faker.number.float({ min: 20, max: 100, precision: 0.01 }),
      status: faker.helpers.arrayElement(['confirmed', 'pending', 'cancelled']),
    };
  });

  await Booking.bulkCreate(bookingsData);
  console.log('Bookings seeded successfully');
}

// Main function to execute the seeding process
async function main(): Promise<void> {
  let sequelize: Sequelize | null = null;
  try {
    sequelize = await createDatabaseConnection();
    
    await seedUsers(sequelize);
    await seedRinks(sequelize);
    await seedEquipment(sequelize);
    await seedBookings(sequelize);

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    if (sequelize) {
      await sequelize.close();
    }
  }
}

// Execute the main function
main().catch((error) => {
  console.error('Unhandled error during database seeding:', error);
  process.exit(1);
});

// Human tasks:
// TODO: Review and adjust the number of sample records to be generated for each entity
// TODO: Ensure that the generated data complies with any business rules or constraints
// TODO: Implement proper error handling and logging mechanism
// TODO: Create a mechanism to easily run this script in different environments (development, staging, etc.)