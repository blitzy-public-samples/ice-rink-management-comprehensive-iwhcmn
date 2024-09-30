import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import Bull from 'bull';
import { processMaintenanceReminder, scheduleMaintenanceReminder } from '../../../src/jobs/maintenanceReminderJob';
import { MaintenanceReminderJob } from '../../../src/types/jobs';
import rinkService from '../../../src/services/rinkService';
import notificationService from '../../../src/services/notificationService';

// Mock the required services and modules
jest.mock('bull');
jest.mock('../../../src/services/rinkService');
jest.mock('../../../src/services/notificationService');

describe('Maintenance Reminder Job', () => {
  let maintenanceReminderQueue: Bull.Queue;

  beforeEach(() => {
    // Set up the Bull queue mock
    maintenanceReminderQueue = new Bull('maintenanceReminder') as jest.Mocked<Bull.Queue>;
    
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Clean up after each test
    jest.resetAllMocks();
  });

  describe('scheduleMaintenanceReminder', () => {
    it('should schedule a maintenance reminder job', async () => {
      const job: MaintenanceReminderJob = {
        rinkId: '1',
        maintenanceType: 'ice resurfacing',
        dueDate: new Date('2023-06-01'),
      };

      await scheduleMaintenanceReminder(job);

      expect(maintenanceReminderQueue.add).toHaveBeenCalledWith(job, {
        delay: expect.any(Number),
        attempts: 3,
      });
    });

    // Add more test cases for scheduleMaintenanceReminder
  });

  describe('processMaintenanceReminder', () => {
    it('should process a maintenance reminder job', async () => {
      const job: MaintenanceReminderJob = {
        rinkId: '1',
        maintenanceType: 'ice resurfacing',
        dueDate: new Date('2023-06-01'),
      };

      // Mock the rinkService and notificationService
      (rinkService.getRinkDetails as jest.Mock).mockResolvedValue({
        id: '1',
        name: 'Test Rink',
        managerEmail: 'manager@testrink.com',
      });

      await processMaintenanceReminder(job);

      expect(rinkService.getRinkDetails).toHaveBeenCalledWith('1');
      expect(notificationService.sendEmail).toHaveBeenCalledWith(
        'manager@testrink.com',
        expect.stringContaining('Maintenance Reminder'),
        expect.stringContaining('ice resurfacing')
      );
    });

    it('should handle errors when processing a maintenance reminder job', async () => {
      const job: MaintenanceReminderJob = {
        rinkId: '1',
        maintenanceType: 'ice resurfacing',
        dueDate: new Date('2023-06-01'),
      };

      // Mock an error in rinkService
      (rinkService.getRinkDetails as jest.Mock).mockRejectedValue(new Error('Rink not found'));

      await expect(processMaintenanceReminder(job)).rejects.toThrow('Rink not found');

      expect(rinkService.getRinkDetails).toHaveBeenCalledWith('1');
      expect(notificationService.sendEmail).not.toHaveBeenCalled();
    });

    // Add more test cases for processMaintenanceReminder
  });

  // Add performance tests (optional)
  describe('Performance tests', () => {
    it('should handle multiple maintenance reminder jobs efficiently', async () => {
      const jobs: MaintenanceReminderJob[] = Array.from({ length: 100 }, (_, i) => ({
        rinkId: `${i + 1}`,
        maintenanceType: 'ice resurfacing',
        dueDate: new Date(`2023-06-${i + 1}`),
      }));

      const startTime = Date.now();

      await Promise.all(jobs.map(scheduleMaintenanceReminder));

      const endTime = Date.now();
      const executionTime = endTime - startTime;

      expect(executionTime).toBeLessThan(1000); // Assuming less than 1 second for 100 jobs
      expect(maintenanceReminderQueue.add).toHaveBeenCalledTimes(100);
    });
  });
});

// Commented list of human tasks
/*
Human tasks:
1. Implement comprehensive test cases covering various scenarios (Required)
2. Ensure proper mocking of external services and dependencies (Required)
3. Add test cases for error handling and edge cases (Required)
4. Consider adding performance tests for job scheduling and processing (Optional)
*/