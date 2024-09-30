import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AnalyticsServiceImpl } from '../../../src/services/analyticsService';
import { AnalyticsData } from '../../../src/types/services';

describe('AnalyticsService', () => {
  let analyticsService: AnalyticsServiceImpl;

  beforeEach(() => {
    analyticsService = new AnalyticsServiceImpl();
  });

  describe('trackEvent', () => {
    it('should successfully track an event', async () => {
      const eventData: AnalyticsData = {
        eventType: 'booking_created',
        userId: '123',
        timestamp: new Date(),
        metadata: { bookingId: '456' }
      };

      await expect(analyticsService.trackEvent(eventData)).resolves.not.toThrow();
    });

    it('should throw an error if event data is invalid', async () => {
      const invalidEventData = {} as AnalyticsData;

      await expect(analyticsService.trackEvent(invalidEventData)).rejects.toThrow();
    });
  });

  describe('getAnalytics', () => {
    it('should retrieve analytics data for a given time range', async () => {
      const startDate = new Date('2023-01-01');
      const endDate = new Date('2023-12-31');
      const eventType = 'booking_created';

      const mockAnalyticsData: AnalyticsData[] = [
        {
          eventType: 'booking_created',
          userId: '123',
          timestamp: new Date('2023-06-15'),
          metadata: { bookingId: '456' }
        },
        {
          eventType: 'booking_created',
          userId: '789',
          timestamp: new Date('2023-07-20'),
          metadata: { bookingId: '101' }
        }
      ];

      // Mock the internal method or database call that fetches the data
      jest.spyOn(analyticsService as any, 'fetchAnalyticsData').mockResolvedValue(mockAnalyticsData);

      const result = await analyticsService.getAnalytics(startDate, endDate, eventType);

      expect(result).toEqual(mockAnalyticsData);
      expect(result.length).toBe(2);
      expect(result[0].eventType).toBe(eventType);
      expect(result[1].eventType).toBe(eventType);
    });

    it('should return an empty array if no data is found', async () => {
      const startDate = new Date('2023-01-01');
      const endDate = new Date('2023-12-31');
      const eventType = 'user_registered';

      // Mock the internal method or database call that fetches the data
      jest.spyOn(analyticsService as any, 'fetchAnalyticsData').mockResolvedValue([]);

      const result = await analyticsService.getAnalytics(startDate, endDate, eventType);

      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });

    it('should throw an error if date range is invalid', async () => {
      const startDate = new Date('2023-12-31');
      const endDate = new Date('2023-01-01');
      const eventType = 'booking_created';

      await expect(analyticsService.getAnalytics(startDate, endDate, eventType)).rejects.toThrow();
    });
  });

  describe('generateReport', () => {
    it('should generate a report based on analytics data', async () => {
      const startDate = new Date('2023-01-01');
      const endDate = new Date('2023-12-31');
      const eventType = 'booking_created';

      const mockAnalyticsData: AnalyticsData[] = [
        {
          eventType: 'booking_created',
          userId: '123',
          timestamp: new Date('2023-06-15'),
          metadata: { bookingId: '456' }
        },
        {
          eventType: 'booking_created',
          userId: '789',
          timestamp: new Date('2023-07-20'),
          metadata: { bookingId: '101' }
        }
      ];

      // Mock the getAnalytics method
      jest.spyOn(analyticsService, 'getAnalytics').mockResolvedValue(mockAnalyticsData);

      const report = await analyticsService.generateReport(startDate, endDate, eventType);

      expect(report).toBeDefined();
      expect(report.eventType).toBe(eventType);
      expect(report.startDate).toEqual(startDate);
      expect(report.endDate).toEqual(endDate);
      expect(report.totalEvents).toBe(2);
      expect(report.uniqueUsers).toBe(2);
    });

    it('should return a report with zero counts if no data is found', async () => {
      const startDate = new Date('2023-01-01');
      const endDate = new Date('2023-12-31');
      const eventType = 'user_registered';

      // Mock the getAnalytics method to return an empty array
      jest.spyOn(analyticsService, 'getAnalytics').mockResolvedValue([]);

      const report = await analyticsService.generateReport(startDate, endDate, eventType);

      expect(report).toBeDefined();
      expect(report.eventType).toBe(eventType);
      expect(report.startDate).toEqual(startDate);
      expect(report.endDate).toEqual(endDate);
      expect(report.totalEvents).toBe(0);
      expect(report.uniqueUsers).toBe(0);
    });
  });
});