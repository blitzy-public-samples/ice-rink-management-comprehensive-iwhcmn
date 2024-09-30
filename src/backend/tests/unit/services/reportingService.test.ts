import { describe, expect, test, jest, beforeEach, afterEach } from '@jest/globals';
import moment from 'moment';
import { ReportingService } from '../../../src/services/reportingService';
import { ServiceTypes } from '../../../src/types';
import { mockBookingData, mockEquipmentData } from '../../mocks/data';

describe('ReportingService', () => {
  let reportingService: ReportingService;
  let mockConfig: ServiceTypes.ReportingServiceConfig;
  let mockSendGridService: any;

  beforeEach(() => {
    mockConfig = {
      // Add any necessary configuration for the ReportingService
    };
    mockSendGridService = {
      send: jest.fn().mockResolvedValue(true),
    };
    reportingService = new ReportingService(mockConfig);
    (reportingService as any).sendGridService = mockSendGridService;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('generateDailyReport should return correct daily report', async () => {
    const date = moment('2023-03-15').toDate();
    const mockDailyBookings = mockBookingData.filter(booking => 
      moment(booking.startTime).isSame(date, 'day')
    );

    // Mock the necessary methods
    (reportingService as any).getBookingsForDate = jest.fn().mockResolvedValue(mockDailyBookings);
    (reportingService as any).generateCSV = jest.fn().mockReturnValue('mock CSV content');

    const report = await reportingService.generateDailyReport(date);

    expect(report).toBeDefined();
    expect(report.date).toEqual(date);
    expect(report.totalBookings).toEqual(mockDailyBookings.length);
    expect(report.totalRevenue).toBeGreaterThan(0);
    expect(report.csvReport).toBe('mock CSV content');

    expect((reportingService as any).getBookingsForDate).toHaveBeenCalledWith(date);
    expect((reportingService as any).generateCSV).toHaveBeenCalled();
  });

  test('generateWeeklyReport should return correct weekly report', async () => {
    const startDate = moment('2023-03-13').toDate(); // Monday
    const endDate = moment('2023-03-19').toDate(); // Sunday
    const mockWeeklyBookings = mockBookingData.filter(booking => 
      moment(booking.startTime).isBetween(startDate, endDate, 'day', '[]')
    );

    // Mock the necessary methods
    (reportingService as any).getBookingsForDateRange = jest.fn().mockResolvedValue(mockWeeklyBookings);
    (reportingService as any).generateCSV = jest.fn().mockReturnValue('mock CSV content');
    (reportingService as any).calculateWeekOverWeekComparison = jest.fn().mockReturnValue({
      bookingsDifference: 5,
      revenueDifference: 100,
    });

    const report = await reportingService.generateWeeklyReport(startDate);

    expect(report).toBeDefined();
    expect(report.startDate).toEqual(startDate);
    expect(report.endDate).toEqual(endDate);
    expect(report.totalBookings).toEqual(mockWeeklyBookings.length);
    expect(report.totalRevenue).toBeGreaterThan(0);
    expect(report.csvReport).toBe('mock CSV content');
    expect(report.weekOverWeekComparison).toEqual({
      bookingsDifference: 5,
      revenueDifference: 100,
    });

    expect((reportingService as any).getBookingsForDateRange).toHaveBeenCalledWith(startDate, endDate);
    expect((reportingService as any).generateCSV).toHaveBeenCalled();
    expect((reportingService as any).calculateWeekOverWeekComparison).toHaveBeenCalled();
  });

  test('generateMonthlyReport should return correct monthly report', async () => {
    const month = 3; // March
    const year = 2023;
    const startDate = moment(`${year}-${month}-01`).startOf('month').toDate();
    const endDate = moment(startDate).endOf('month').toDate();
    const mockMonthlyBookings = mockBookingData.filter(booking => 
      moment(booking.startTime).isBetween(startDate, endDate, 'day', '[]')
    );

    // Mock the necessary methods
    (reportingService as any).getBookingsForDateRange = jest.fn().mockResolvedValue(mockMonthlyBookings);
    (reportingService as any).getEquipmentRentalsForDateRange = jest.fn().mockResolvedValue(mockEquipmentData);
    (reportingService as any).generateCSV = jest.fn().mockReturnValue('mock CSV content');
    (reportingService as any).calculateMonthOverMonthComparison = jest.fn().mockReturnValue({
      bookingsDifference: 20,
      revenueDifference: 500,
    });
    (reportingService as any).analyzeEquipmentUsage = jest.fn().mockReturnValue({
      mostRentedEquipment: 'Skates',
      leastRentedEquipment: 'Helmets',
    });

    const report = await reportingService.generateMonthlyReport(month, year);

    expect(report).toBeDefined();
    expect(report.month).toEqual(month);
    expect(report.year).toEqual(year);
    expect(report.totalBookings).toEqual(mockMonthlyBookings.length);
    expect(report.totalRevenue).toBeGreaterThan(0);
    expect(report.bookingsCsvReport).toBe('mock CSV content');
    expect(report.equipmentCsvReport).toBe('mock CSV content');
    expect(report.monthOverMonthComparison).toEqual({
      bookingsDifference: 20,
      revenueDifference: 500,
    });
    expect(report.equipmentUsageAnalysis).toEqual({
      mostRentedEquipment: 'Skates',
      leastRentedEquipment: 'Helmets',
    });

    expect((reportingService as any).getBookingsForDateRange).toHaveBeenCalledWith(startDate, endDate);
    expect((reportingService as any).getEquipmentRentalsForDateRange).toHaveBeenCalledWith(startDate, endDate);
    expect((reportingService as any).generateCSV).toHaveBeenCalledTimes(2);
    expect((reportingService as any).calculateMonthOverMonthComparison).toHaveBeenCalled();
    expect((reportingService as any).analyzeEquipmentUsage).toHaveBeenCalled();
  });

  test('sendReportByEmail should send email with correct content and attachments', async () => {
    const mockReport = {
      date: new Date('2023-03-15'),
      totalBookings: 10,
      totalRevenue: 1000,
      csvReport: 'mock CSV content',
    };
    const recipients = ['admin@example.com', 'manager@example.com'];

    await reportingService.sendReportByEmail(mockReport, recipients);

    expect(mockSendGridService.send).toHaveBeenCalledWith({
      to: recipients,
      from: expect.any(String),
      subject: expect.stringContaining('Daily Report'),
      text: expect.stringContaining('Total Bookings: 10'),
      html: expect.stringContaining('<strong>Total Bookings:</strong> 10'),
      attachments: [
        {
          content: expect.any(String),
          filename: 'daily_report_2023-03-15.csv',
          type: 'text/csv',
          disposition: 'attachment',
        },
      ],
    });
  });
});

// Implement edge case tests
describe('ReportingService Edge Cases', () => {
  let reportingService: ReportingService;
  let mockConfig: ServiceTypes.ReportingServiceConfig;

  beforeEach(() => {
    mockConfig = {
      // Add any necessary configuration for the ReportingService
    };
    reportingService = new ReportingService(mockConfig);
  });

  test('generateDailyReport should handle no bookings for the day', async () => {
    const date = moment('2023-03-15').toDate();
    (reportingService as any).getBookingsForDate = jest.fn().mockResolvedValue([]);
    (reportingService as any).generateCSV = jest.fn().mockReturnValue('');

    const report = await reportingService.generateDailyReport(date);

    expect(report).toBeDefined();
    expect(report.totalBookings).toBe(0);
    expect(report.totalRevenue).toBe(0);
    expect(report.csvReport).toBe('');
  });

  test('generateWeeklyReport should handle a week with no bookings', async () => {
    const startDate = moment('2023-03-13').toDate();
    (reportingService as any).getBookingsForDateRange = jest.fn().mockResolvedValue([]);
    (reportingService as any).generateCSV = jest.fn().mockReturnValue('');
    (reportingService as any).calculateWeekOverWeekComparison = jest.fn().mockReturnValue({
      bookingsDifference: 0,
      revenueDifference: 0,
    });

    const report = await reportingService.generateWeeklyReport(startDate);

    expect(report).toBeDefined();
    expect(report.totalBookings).toBe(0);
    expect(report.totalRevenue).toBe(0);
    expect(report.csvReport).toBe('');
    expect(report.weekOverWeekComparison).toEqual({
      bookingsDifference: 0,
      revenueDifference: 0,
    });
  });

  test('generateMonthlyReport should handle a month with no bookings and no equipment rentals', async () => {
    const month = 3;
    const year = 2023;
    (reportingService as any).getBookingsForDateRange = jest.fn().mockResolvedValue([]);
    (reportingService as any).getEquipmentRentalsForDateRange = jest.fn().mockResolvedValue([]);
    (reportingService as any).generateCSV = jest.fn().mockReturnValue('');
    (reportingService as any).calculateMonthOverMonthComparison = jest.fn().mockReturnValue({
      bookingsDifference: 0,
      revenueDifference: 0,
    });
    (reportingService as any).analyzeEquipmentUsage = jest.fn().mockReturnValue({
      mostRentedEquipment: null,
      leastRentedEquipment: null,
    });

    const report = await reportingService.generateMonthlyReport(month, year);

    expect(report).toBeDefined();
    expect(report.totalBookings).toBe(0);
    expect(report.totalRevenue).toBe(0);
    expect(report.bookingsCsvReport).toBe('');
    expect(report.equipmentCsvReport).toBe('');
    expect(report.monthOverMonthComparison).toEqual({
      bookingsDifference: 0,
      revenueDifference: 0,
    });
    expect(report.equipmentUsageAnalysis).toEqual({
      mostRentedEquipment: null,
      leastRentedEquipment: null,
    });
  });
});

// Implement error handling scenario tests
describe('ReportingService Error Handling', () => {
  let reportingService: ReportingService;
  let mockConfig: ServiceTypes.ReportingServiceConfig;
  let mockSendGridService: any;

  beforeEach(() => {
    mockConfig = {
      // Add any necessary configuration for the ReportingService
    };
    mockSendGridService = {
      send: jest.fn(),
    };
    reportingService = new ReportingService(mockConfig);
    (reportingService as any).sendGridService = mockSendGridService;
  });

  test('generateDailyReport should handle database connection failure', async () => {
    const date = moment('2023-03-15').toDate();
    (reportingService as any).getBookingsForDate = jest.fn().mockRejectedValue(new Error('Database connection failed'));

    await expect(reportingService.generateDailyReport(date)).rejects.toThrow('Failed to generate daily report');
  });

  test('generateWeeklyReport should handle database connection failure', async () => {
    const startDate = moment('2023-03-13').toDate();
    (reportingService as any).getBookingsForDateRange = jest.fn().mockRejectedValue(new Error('Database connection failed'));

    await expect(reportingService.generateWeeklyReport(startDate)).rejects.toThrow('Failed to generate weekly report');
  });

  test('generateMonthlyReport should handle database connection failure', async () => {
    const month = 3;
    const year = 2023;
    (reportingService as any).getBookingsForDateRange = jest.fn().mockRejectedValue(new Error('Database connection failed'));

    await expect(reportingService.generateMonthlyReport(month, year)).rejects.toThrow('Failed to generate monthly report');
  });

  test('sendReportByEmail should handle email sending failure', async () => {
    const mockReport = {
      date: new Date('2023-03-15'),
      totalBookings: 10,
      totalRevenue: 1000,
      csvReport: 'mock CSV content',
    };
    const recipients = ['admin@example.com'];
    mockSendGridService.send.mockRejectedValue(new Error('Failed to send email'));

    await expect(reportingService.sendReportByEmail(mockReport, recipients)).rejects.toThrow('Failed to send report email');
  });
});

// Add comments for human tasks
/**
 * Human tasks:
 * 1. Implement edge case tests for each report generation method (Required)
 * 2. Add tests for error handling scenarios (e.g., database connection failure, email sending failure) (Required)
 * 3. Create more detailed mock data to cover various scenarios in reports (Required)
 * 4. Implement performance tests for report generation with large datasets (Optional)
 */