import { runDataCleanupJob } from '../../../src/jobs/dataCleanupJob';
import db from '../../../src/db';
import { DataCleanupJob, JobStatus } from '../../../src/types/jobs';
import { Job } from 'bull';
import { expect, beforeAll, afterAll, describe, it } from '@jest/globals';

// Mock database connection
let testDb: typeof db;

beforeAll(async () => {
  // Set up the test database connection
  testDb = await db.connect({
    host: process.env.TEST_DB_HOST,
    port: parseInt(process.env.TEST_DB_PORT || '5432'),
    database: process.env.TEST_DB_NAME,
    user: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
  });

  // Clear existing data and seed the database with test data
  await testDb.query('DELETE FROM bookings WHERE created_at < NOW() - INTERVAL \'1 year\'');
  await testDb.query('DELETE FROM equipment_rentals WHERE created_at < NOW() - INTERVAL \'1 year\'');
  await testDb.query('DELETE FROM users WHERE last_login < NOW() - INTERVAL \'2 years\'');

  // Insert test data
  await testDb.query(`
    INSERT INTO bookings (user_id, rink_id, start_time, end_time, created_at)
    VALUES 
      (1, 1, NOW() - INTERVAL '2 years', NOW() - INTERVAL '2 years' + INTERVAL '1 hour', NOW() - INTERVAL '2 years'),
      (2, 1, NOW() - INTERVAL '6 months', NOW() - INTERVAL '6 months' + INTERVAL '1 hour', NOW() - INTERVAL '6 months'),
      (3, 2, NOW(), NOW() + INTERVAL '1 hour', NOW());
  `);

  await testDb.query(`
    INSERT INTO equipment_rentals (booking_id, equipment_id, quantity, created_at)
    VALUES 
      (1, 1, 2, NOW() - INTERVAL '2 years'),
      (2, 2, 1, NOW() - INTERVAL '6 months'),
      (3, 3, 3, NOW());
  `);

  await testDb.query(`
    INSERT INTO users (email, password_hash, user_type, first_name, last_name, last_login)
    VALUES 
      ('old@example.com', 'hash', 'customer', 'Old', 'User', NOW() - INTERVAL '3 years'),
      ('inactive@example.com', 'hash', 'customer', 'Inactive', 'User', NOW() - INTERVAL '1 year 6 months'),
      ('active@example.com', 'hash', 'customer', 'Active', 'User', NOW() - INTERVAL '6 months');
  `);
});

afterAll(async () => {
  // Close the database connection
  await testDb.end();
});

const createMockJob = (jobData: DataCleanupJob): Job<DataCleanupJob> => {
  return {
    data: jobData,
    id: '1',
    progress: jest.fn(),
    update: jest.fn(),
    log: jest.fn(),
  } as unknown as Job<DataCleanupJob>;
};

describe('Data Cleanup Job', () => {
  it('should remove old bookings and related data', async () => {
    const mockJob = createMockJob({
      type: 'data_cleanup',
      params: {
        bookingRetentionMonths: 12,
        userInactivityMonths: 24,
      },
      status: JobStatus.PENDING,
    });

    await runDataCleanupJob(mockJob);

    // Check if old bookings were removed
    const bookingsResult = await testDb.query('SELECT COUNT(*) FROM bookings');
    expect(bookingsResult.rows[0].count).toBe('2');

    // Check if old equipment rentals were removed
    const rentalsResult = await testDb.query('SELECT COUNT(*) FROM equipment_rentals');
    expect(rentalsResult.rows[0].count).toBe('2');

    // Check if inactive users were removed
    const usersResult = await testDb.query('SELECT COUNT(*) FROM users');
    expect(usersResult.rows[0].count).toBe('2');
  });

  it('should update job status and progress', async () => {
    const mockJob = createMockJob({
      type: 'data_cleanup',
      params: {
        bookingRetentionMonths: 12,
        userInactivityMonths: 24,
      },
      status: JobStatus.PENDING,
    });

    await runDataCleanupJob(mockJob);

    expect(mockJob.progress).toHaveBeenCalledWith(100);
    expect(mockJob.update).toHaveBeenCalledWith({ status: JobStatus.COMPLETED });
  });

  it('should handle errors and update job status', async () => {
    const mockJob = createMockJob({
      type: 'data_cleanup',
      params: {
        bookingRetentionMonths: 12,
        userInactivityMonths: 24,
      },
      status: JobStatus.PENDING,
    });

    // Simulate a database error
    jest.spyOn(testDb, 'query').mockRejectedValueOnce(new Error('Database error'));

    await runDataCleanupJob(mockJob);

    expect(mockJob.update).toHaveBeenCalledWith({ status: JobStatus.FAILED, error: 'Database error' });
  });
});

// Human tasks:
// 1. Implement additional test cases for edge cases and error scenarios
// 2. Add performance tests to ensure the data cleanup job scales well with large datasets