import { describe, expect, test } from '@jest/globals';
import { format, parse, isValid, addDays } from 'date-fns';
import * as dateUtils from '../../utils/date';

describe('formatDate function', () => {
  test('formats date correctly', () => {
    const date = new Date(2023, 5, 15); // June 15, 2023
    expect(dateUtils.formatDate(date, 'yyyy-MM-dd')).toBe('2023-06-15');
  });

  test('handles different format strings', () => {
    const date = new Date(2023, 5, 15, 14, 30); // June 15, 2023, 14:30
    expect(dateUtils.formatDate(date, 'dd/MM/yyyy HH:mm')).toBe('15/06/2023 14:30');
  });

  test('throws error for invalid date input', () => {
    expect(() => dateUtils.formatDate('invalid date' as any, 'yyyy-MM-dd')).toThrow();
  });
});

describe('parseDate function', () => {
  test('parses date string correctly', () => {
    const dateString = '2023-06-15';
    const parsedDate = dateUtils.parseDate(dateString, 'yyyy-MM-dd');
    expect(isValid(parsedDate)).toBe(true);
    expect(format(parsedDate, 'yyyy-MM-dd')).toBe(dateString);
  });

  test('handles different date string formats', () => {
    const dateString = '15/06/2023 14:30';
    const parsedDate = dateUtils.parseDate(dateString, 'dd/MM/yyyy HH:mm');
    expect(isValid(parsedDate)).toBe(true);
    expect(format(parsedDate, 'dd/MM/yyyy HH:mm')).toBe(dateString);
  });

  test('returns null for invalid date strings', () => {
    expect(dateUtils.parseDate('invalid date', 'yyyy-MM-dd')).toBeNull();
  });
});

describe('isSlotAvailable function', () => {
  test('returns true when no overlapping slots', () => {
    const slot = { start: new Date(2023, 5, 15, 10), end: new Date(2023, 5, 15, 11) };
    const bookedSlots = [
      { start: new Date(2023, 5, 15, 8), end: new Date(2023, 5, 15, 9) },
      { start: new Date(2023, 5, 15, 12), end: new Date(2023, 5, 15, 13) },
    ];
    expect(dateUtils.isSlotAvailable(slot, bookedSlots)).toBe(true);
  });

  test('returns false when there are overlapping slots', () => {
    const slot = { start: new Date(2023, 5, 15, 10), end: new Date(2023, 5, 15, 11) };
    const bookedSlots = [
      { start: new Date(2023, 5, 15, 9), end: new Date(2023, 5, 15, 10, 30) },
      { start: new Date(2023, 5, 15, 11, 30), end: new Date(2023, 5, 15, 12) },
    ];
    expect(dateUtils.isSlotAvailable(slot, bookedSlots)).toBe(false);
  });

  test('returns true with empty booked slots array', () => {
    const slot = { start: new Date(2023, 5, 15, 10), end: new Date(2023, 5, 15, 11) };
    expect(dateUtils.isSlotAvailable(slot, [])).toBe(true);
  });
});

describe('getDurationInMinutes function', () => {
  test('calculates duration correctly', () => {
    const start = new Date(2023, 5, 15, 10);
    const end = new Date(2023, 5, 15, 11, 30);
    expect(dateUtils.getDurationInMinutes(start, end)).toBe(90);
  });

  test('handles dates spanning midnight', () => {
    const start = new Date(2023, 5, 15, 23);
    const end = new Date(2023, 5, 16, 1);
    expect(dateUtils.getDurationInMinutes(start, end)).toBe(120);
  });
});

describe('getWeekStartDate function', () => {
  test('returns correct start of the week', () => {
    const date = new Date(2023, 5, 15); // Thursday, June 15, 2023
    const weekStart = dateUtils.getWeekStartDate(date);
    expect(format(weekStart, 'yyyy-MM-dd')).toBe('2023-06-11'); // Sunday, June 11, 2023
  });

  test('handles dates near year boundaries', () => {
    const date = new Date(2023, 11, 31); // Sunday, December 31, 2023
    const weekStart = dateUtils.getWeekStartDate(date);
    expect(format(weekStart, 'yyyy-MM-dd')).toBe('2023-12-31');
  });
});

describe('generateTimeSlots function', () => {
  test('generates correct number of slots', () => {
    const date = new Date(2023, 5, 15);
    const slots = dateUtils.generateTimeSlots(date, 60); // 60 minutes interval
    expect(slots.length).toBe(24);
  });

  test('generates slots with correct interval', () => {
    const date = new Date(2023, 5, 15);
    const slots = dateUtils.generateTimeSlots(date, 30); // 30 minutes interval
    expect(slots.length).toBe(48);
    expect(format(slots[1].start, 'HH:mm')).toBe('00:30');
    expect(format(slots[1].end, 'HH:mm')).toBe('01:00');
  });

  test('handles intervals that don\'t divide evenly into 24 hours', () => {
    const date = new Date(2023, 5, 15);
    const slots = dateUtils.generateTimeSlots(date, 45); // 45 minutes interval
    expect(slots.length).toBe(32);
  });
});