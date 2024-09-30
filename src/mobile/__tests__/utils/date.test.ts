import * as dateUtils from '../../src/utils/date';

describe('Date Utils', () => {
  describe('formatDate', () => {
    it('should format a date correctly', () => {
      const date = new Date('2023-05-15T12:00:00Z');
      expect(dateUtils.formatDate(date, 'YYYY-MM-DD')).toBe('2023-05-15');
    });

    it('should handle different format strings', () => {
      const date = new Date('2023-05-15T12:00:00Z');
      expect(dateUtils.formatDate(date, 'MM/DD/YYYY')).toBe('05/15/2023');
    });
  });

  describe('parseDate', () => {
    it('should parse a date string correctly', () => {
      const dateString = '2023-05-15';
      const parsedDate = dateUtils.parseDate(dateString, 'YYYY-MM-DD');
      expect(parsedDate).toBeInstanceOf(Date);
      expect(parsedDate.getFullYear()).toBe(2023);
      expect(parsedDate.getMonth()).toBe(4); // 0-indexed, so May is 4
      expect(parsedDate.getDate()).toBe(15);
    });

    it('should handle different format strings', () => {
      const dateString = '05/15/2023';
      const parsedDate = dateUtils.parseDate(dateString, 'MM/DD/YYYY');
      expect(parsedDate).toBeInstanceOf(Date);
      expect(parsedDate.getFullYear()).toBe(2023);
      expect(parsedDate.getMonth()).toBe(4);
      expect(parsedDate.getDate()).toBe(15);
    });
  });

  describe('isDateInPast', () => {
    it('should return true for a past date', () => {
      const pastDate = new Date(Date.now() - 86400000); // Yesterday
      expect(dateUtils.isDateInPast(pastDate)).toBe(true);
    });

    it('should return false for a future date', () => {
      const futureDate = new Date(Date.now() + 86400000); // Tomorrow
      expect(dateUtils.isDateInPast(futureDate)).toBe(false);
    });
  });

  describe('calculateDuration', () => {
    it('should calculate duration between two dates correctly', () => {
      const startDate = new Date('2023-05-15T10:00:00Z');
      const endDate = new Date('2023-05-15T12:30:00Z');
      expect(dateUtils.calculateDuration(startDate, endDate)).toBe(150); // 2.5 hours in minutes
    });

    it('should return 0 for same start and end date', () => {
      const date = new Date('2023-05-15T10:00:00Z');
      expect(dateUtils.calculateDuration(date, date)).toBe(0);
    });
  });

  describe('addTime', () => {
    it('should add time to a date correctly', () => {
      const startDate = new Date('2023-05-15T10:00:00Z');
      const resultDate = dateUtils.addTime(startDate, 90); // Add 90 minutes
      expect(resultDate.getHours()).toBe(11);
      expect(resultDate.getMinutes()).toBe(30);
    });

    it('should handle adding time that crosses day boundary', () => {
      const startDate = new Date('2023-05-15T23:00:00Z');
      const resultDate = dateUtils.addTime(startDate, 120); // Add 2 hours
      expect(resultDate.getDate()).toBe(16);
      expect(resultDate.getHours()).toBe(1);
    });
  });
});

// Human tasks:
// 1. Implement test cases for all date utility functions (formatDate, parseDate, isDateInPast, calculateDuration, addTime)
// 2. Ensure test coverage for various edge cases and input types for each date utility function
// 3. Add test cases for any ice rink booking specific date scenarios