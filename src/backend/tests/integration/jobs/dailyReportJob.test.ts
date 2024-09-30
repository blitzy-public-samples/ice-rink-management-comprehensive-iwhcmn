import { executeDailyReportJob } from '../../../src/jobs/dailyReportJob';
import { ReportingService } from '../../../src/services/reportingService';
import { DailyReportJob, JobStatus } from '../../../src/types/jobs';
import config from '../../../src/config';
import { jest } from '@jest/globals';
import moment from 'moment';

// Mock the ReportingService
jest.mock('../../../src/services/reportingService');

describe('Daily Report Job Integration Test', () => {
  let mockReportingService: jest.Mocked<ReportingService>;

  beforeEach(async () => {
    await setupTestEnvironment();
    mockReportingService = ReportingService as jest.Mocked<typeof ReportingService>;
  });

  afterEach(async () => {
    await cleanupTestEnvironment();
    jest.resetAllMocks();
  });

  it('should execute daily report job successfully', async () => {
    // Arrange
    const today = moment().format('YYYY-MM-DD');
    const mockReport = {
      date: today,
      totalBookings: 10,
      totalRevenue: 1000,
      popularRinks: ['Rink A', 'Rink B'],
    };
    mockReportingService.generateDailyReport.mockResolvedValue(mockReport);
    mockReportingService.sendDailyReportEmail.mockResolvedValue(true);

    // Act
    const result: DailyReportJob = await executeDailyReportJob();

    // Assert
    expect(result.status).toBe(JobStatus.COMPLETED);
    expect(result.date).toBe(today);
    expect(result.reportData).toEqual(mockReport);
    expect(mockReportingService.generateDailyReport).toHaveBeenCalledWith(today);
    expect(mockReportingService.sendDailyReportEmail).toHaveBeenCalledWith(mockReport);
  });

  it('should handle errors during report generation', async () => {
    // Arrange
    const today = moment().format('YYYY-MM-DD');
    mockReportingService.generateDailyReport.mockRejectedValue(new Error('Database error'));

    // Act
    const result: DailyReportJob = await executeDailyReportJob();

    // Assert
    expect(result.status).toBe(JobStatus.FAILED);
    expect(result.date).toBe(today);
    expect(result.error).toBe('Error generating daily report: Database error');
    expect(mockReportingService.generateDailyReport).toHaveBeenCalledWith(today);
    expect(mockReportingService.sendDailyReportEmail).not.toHaveBeenCalled();
  });

  it('should handle errors during email sending', async () => {
    // Arrange
    const today = moment().format('YYYY-MM-DD');
    const mockReport = {
      date: today,
      totalBookings: 5,
      totalRevenue: 500,
      popularRinks: ['Rink C'],
    };
    mockReportingService.generateDailyReport.mockResolvedValue(mockReport);
    mockReportingService.sendDailyReportEmail.mockRejectedValue(new Error('Email service down'));

    // Act
    const result: DailyReportJob = await executeDailyReportJob();

    // Assert
    expect(result.status).toBe(JobStatus.COMPLETED_WITH_ERRORS);
    expect(result.date).toBe(today);
    expect(result.reportData).toEqual(mockReport);
    expect(result.error).toBe('Error sending daily report email: Email service down');
    expect(mockReportingService.generateDailyReport).toHaveBeenCalledWith(today);
    expect(mockReportingService.sendDailyReportEmail).toHaveBeenCalledWith(mockReport);
  });
});

async function setupTestEnvironment(): Promise<void> {
  // Mock ReportingService methods
  mockReportingService.generateDailyReport.mockResolvedValue({} as any);
  mockReportingService.sendDailyReportEmail.mockResolvedValue(true);

  // Set up test database connection
  // TODO: Implement test database setup

  // Clear relevant database tables
  // TODO: Implement database clearing logic
}

async function cleanupTestEnvironment(): Promise<void> {
  // Close database connections
  // TODO: Implement database connection closing logic

  // Clear all mocks
  jest.clearAllMocks();
}

// Commented list of human tasks
/*
Human tasks:
1. Implement more comprehensive test cases covering various scenarios (Required)
2. Add tests for error handling and edge cases (Required)
3. Set up a test database with sample data for more realistic integration tests (Optional)
*/