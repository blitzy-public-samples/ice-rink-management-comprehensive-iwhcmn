import { describe, it, expect } from '@jest/globals';
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateBookingDate,
  validateBookingDuration,
  validateEquipmentQuantity
} from '../../src/utils/validation';

describe('Validation Utility Functions', () => {
  describe('validateEmail', () => {
    it('should return true for valid email addresses', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@example.co.uk')).toBe(true);
    });

    it('should return false for invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('user@example')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(validateEmail('')).toBe(false);
    });

    it('should return false for null and undefined values', () => {
      expect(validateEmail(null as any)).toBe(false);
      expect(validateEmail(undefined as any)).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should return true for valid passwords meeting all criteria', () => {
      expect(validatePassword('StrongP@ss123')).toBe(true);
    });

    it('should return false for passwords missing uppercase letters', () => {
      expect(validatePassword('weakp@ss123')).toBe(false);
    });

    it('should return false for passwords missing lowercase letters', () => {
      expect(validatePassword('WEAKP@SS123')).toBe(false);
    });

    it('should return false for passwords missing numbers', () => {
      expect(validatePassword('WeakP@ssword')).toBe(false);
    });

    it('should return false for passwords missing special characters', () => {
      expect(validatePassword('WeakPassword123')).toBe(false);
    });

    it('should return false for passwords shorter than 8 characters', () => {
      expect(validatePassword('Sh0rt!')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(validatePassword('')).toBe(false);
    });

    it('should return false for null and undefined values', () => {
      expect(validatePassword(null as any)).toBe(false);
      expect(validatePassword(undefined as any)).toBe(false);
    });
  });

  describe('validatePhoneNumber', () => {
    it('should return true for valid phone numbers in different formats', () => {
      expect(validatePhoneNumber('1234567890')).toBe(true);
      expect(validatePhoneNumber('(123) 456-7890')).toBe(true);
      expect(validatePhoneNumber('+1 123-456-7890')).toBe(true);
    });

    it('should return false for invalid phone numbers', () => {
      expect(validatePhoneNumber('123-456-789')).toBe(false);
      expect(validatePhoneNumber('12345')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(validatePhoneNumber('')).toBe(false);
    });

    it('should return false for null and undefined values', () => {
      expect(validatePhoneNumber(null as any)).toBe(false);
      expect(validatePhoneNumber(undefined as any)).toBe(false);
    });
  });

  describe('validateBookingDate', () => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days in the future
    const pastDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000); // 1 day in the past
    const farFutureDate = new Date(currentDate.getTime() + 200 * 24 * 60 * 60 * 1000); // 200 days in the future

    it('should return true for valid dates within the allowed range', () => {
      expect(validateBookingDate(currentDate)).toBe(true);
      expect(validateBookingDate(futureDate)).toBe(true);
    });

    it('should return false for dates in the past', () => {
      expect(validateBookingDate(pastDate)).toBe(false);
    });

    it('should return false for dates more than 6 months in the future', () => {
      expect(validateBookingDate(farFutureDate)).toBe(false);
    });

    it('should return false for invalid Date objects', () => {
      expect(validateBookingDate(new Date('invalid date'))).toBe(false);
    });

    it('should return false for null and undefined values', () => {
      expect(validateBookingDate(null as any)).toBe(false);
      expect(validateBookingDate(undefined as any)).toBe(false);
    });
  });

  describe('validateBookingDuration', () => {
    it('should return true for valid durations (multiples of 30 minutes, between 30 minutes and 3 hours)', () => {
      expect(validateBookingDuration(30)).toBe(true);
      expect(validateBookingDuration(60)).toBe(true);
      expect(validateBookingDuration(90)).toBe(true);
      expect(validateBookingDuration(180)).toBe(true);
    });

    it('should return false for invalid durations (not multiples of 30 minutes)', () => {
      expect(validateBookingDuration(45)).toBe(false);
      expect(validateBookingDuration(100)).toBe(false);
    });

    it('should return false for durations less than 30 minutes', () => {
      expect(validateBookingDuration(15)).toBe(false);
    });

    it('should return false for durations more than 3 hours', () => {
      expect(validateBookingDuration(190)).toBe(false);
    });

    it('should return false for negative durations', () => {
      expect(validateBookingDuration(-30)).toBe(false);
    });

    it('should return false for zero duration', () => {
      expect(validateBookingDuration(0)).toBe(false);
    });

    it('should return false for non-integer durations', () => {
      expect(validateBookingDuration(45.5)).toBe(false);
    });

    it('should return false for null and undefined values', () => {
      expect(validateBookingDuration(null as any)).toBe(false);
      expect(validateBookingDuration(undefined as any)).toBe(false);
    });
  });

  describe('validateEquipmentQuantity', () => {
    it('should return true for valid quantities (positive integers up to 10)', () => {
      expect(validateEquipmentQuantity(1)).toBe(true);
      expect(validateEquipmentQuantity(5)).toBe(true);
      expect(validateEquipmentQuantity(10)).toBe(true);
    });

    it('should return false for zero quantity', () => {
      expect(validateEquipmentQuantity(0)).toBe(false);
    });

    it('should return false for negative quantities', () => {
      expect(validateEquipmentQuantity(-1)).toBe(false);
    });

    it('should return false for quantities greater than 10', () => {
      expect(validateEquipmentQuantity(11)).toBe(false);
    });

    it('should return false for non-integer quantities', () => {
      expect(validateEquipmentQuantity(5.5)).toBe(false);
    });

    it('should return false for null and undefined values', () => {
      expect(validateEquipmentQuantity(null as any)).toBe(false);
      expect(validateEquipmentQuantity(undefined as any)).toBe(false);
    });
  });
});

// Human tasks:
// 1. Review and update test cases if validation criteria change (Required)
// 2. Add more edge cases and boundary value tests if needed (Optional)
// 3. Consider adding performance tests for validation functions if they are used frequently (Optional)