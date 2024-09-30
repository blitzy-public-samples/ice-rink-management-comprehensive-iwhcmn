import { describe, it, expect } from '@jest/globals';
import * as validation from '../../utils/validation';

describe('Validation Utility Functions', () => {
  describe('validateEmail', () => {
    it('should return true for valid email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.com',
      ];
      validEmails.forEach(email => {
        expect(validation.validateEmail(email)).toBe(true);
      });
    });

    it('should return false for invalid email addresses', () => {
      const invalidEmails = [
        'invalid.email',
        'user@domain',
        '@domain.com',
        'user@.com',
      ];
      invalidEmails.forEach(email => {
        expect(validation.validateEmail(email)).toBe(false);
      });
    });

    it('should handle edge cases correctly', () => {
      expect(validation.validateEmail('')).toBe(false);
      expect(validation.validateEmail(null as any)).toBe(false);
      expect(validation.validateEmail(undefined as any)).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should return true for valid passwords meeting all criteria', () => {
      const validPasswords = [
        'StrongPass1!',
        'C0mpl3x@Pass',
        'V3ryS3cur3P@ssw0rd',
      ];
      validPasswords.forEach(password => {
        expect(validation.validatePassword(password)).toBe(true);
      });
    });

    it('should return false for invalid passwords', () => {
      const invalidPasswords = [
        'weak',
        'NoNumbers!',
        'nouppercaseornumbers',
        'NOUPPERCASEORNUMBERS123',
        'NoSpecialChars123',
      ];
      invalidPasswords.forEach(password => {
        expect(validation.validatePassword(password)).toBe(false);
      });
    });

    it('should handle edge cases correctly', () => {
      expect(validation.validatePassword('')).toBe(false);
      expect(validation.validatePassword(null as any)).toBe(false);
      expect(validation.validatePassword(undefined as any)).toBe(false);
    });
  });

  describe('validatePhoneNumber', () => {
    it('should return true for valid phone numbers in different formats', () => {
      const validPhoneNumbers = [
        '+1 (123) 456-7890',
        '123-456-7890',
        '(123) 456-7890',
        '1234567890',
      ];
      validPhoneNumbers.forEach(phoneNumber => {
        expect(validation.validatePhoneNumber(phoneNumber)).toBe(true);
      });
    });

    it('should return false for invalid phone numbers', () => {
      const invalidPhoneNumbers = [
        '123-456-789',
        '12345',
        'abc-def-ghij',
        '+1 123 456 7890 ext 123',
      ];
      invalidPhoneNumbers.forEach(phoneNumber => {
        expect(validation.validatePhoneNumber(phoneNumber)).toBe(false);
      });
    });

    it('should handle edge cases correctly', () => {
      expect(validation.validatePhoneNumber('')).toBe(false);
      expect(validation.validatePhoneNumber(null as any)).toBe(false);
      expect(validation.validatePhoneNumber(undefined as any)).toBe(false);
    });
  });

  describe('validateDateRange', () => {
    it('should return true for valid date ranges', () => {
      const validRanges = [
        { start: new Date('2023-05-01'), end: new Date('2023-05-05') },
        { start: new Date('2023-05-01'), end: new Date('2023-06-01') },
      ];
      validRanges.forEach(({ start, end }) => {
        expect(validation.validateDateRange(start, end)).toBe(true);
      });
    });

    it('should return false for invalid date ranges (end date before start date)', () => {
      const invalidRanges = [
        { start: new Date('2023-05-05'), end: new Date('2023-05-01') },
        { start: new Date('2023-06-01'), end: new Date('2023-05-01') },
      ];
      invalidRanges.forEach(({ start, end }) => {
        expect(validation.validateDateRange(start, end)).toBe(false);
      });
    });

    it('should return false for date ranges outside allowed booking period', () => {
      const now = new Date();
      const pastDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const farFutureDate = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
      
      expect(validation.validateDateRange(pastDate, now)).toBe(false);
      expect(validation.validateDateRange(now, farFutureDate)).toBe(false);
    });

    it('should handle edge cases correctly', () => {
      const now = new Date();
      expect(validation.validateDateRange(null as any, now)).toBe(false);
      expect(validation.validateDateRange(now, null as any)).toBe(false);
      expect(validation.validateDateRange(undefined as any, now)).toBe(false);
      expect(validation.validateDateRange(now, undefined as any)).toBe(false);
    });
  });

  describe('validateBookingDuration', () => {
    it('should return true for valid booking durations', () => {
      const validDurations = [
        { start: new Date('2023-05-01T10:00:00'), end: new Date('2023-05-01T11:00:00') },
        { start: new Date('2023-05-01T10:00:00'), end: new Date('2023-05-01T12:00:00') },
      ];
      validDurations.forEach(({ start, end }) => {
        expect(validation.validateBookingDuration(start, end)).toBe(true);
      });
    });

    it('should return false for durations shorter than minimum allowed', () => {
      const start = new Date('2023-05-01T10:00:00');
      const end = new Date('2023-05-01T10:30:00');
      expect(validation.validateBookingDuration(start, end)).toBe(false);
    });

    it('should return false for durations longer than maximum allowed', () => {
      const start = new Date('2023-05-01T10:00:00');
      const end = new Date('2023-05-01T18:00:00');
      expect(validation.validateBookingDuration(start, end)).toBe(false);
    });

    it('should handle edge cases correctly', () => {
      const now = new Date();
      expect(validation.validateBookingDuration(null as any, now)).toBe(false);
      expect(validation.validateBookingDuration(now, null as any)).toBe(false);
      expect(validation.validateBookingDuration(undefined as any, now)).toBe(false);
      expect(validation.validateBookingDuration(now, undefined as any)).toBe(false);
    });
  });

  describe('validateEquipmentQuantity', () => {
    it('should return true for valid equipment quantities', () => {
      const validQuantities = [1, 5, 10];
      validQuantities.forEach(quantity => {
        expect(validation.validateEquipmentQuantity(quantity, 20)).toBe(true);
      });
    });

    it('should return false for invalid quantities (negative numbers, zero)', () => {
      const invalidQuantities = [-1, 0];
      invalidQuantities.forEach(quantity => {
        expect(validation.validateEquipmentQuantity(quantity, 20)).toBe(false);
      });
    });

    it('should return false for quantities exceeding available quantity', () => {
      expect(validation.validateEquipmentQuantity(25, 20)).toBe(false);
    });

    it('should handle edge cases correctly', () => {
      expect(validation.validateEquipmentQuantity(null as any, 20)).toBe(false);
      expect(validation.validateEquipmentQuantity(undefined as any, 20)).toBe(false);
      expect(validation.validateEquipmentQuantity(1.5, 20)).toBe(false);
    });
  });
});

// Human tasks:
// 1. Review and update test cases to ensure comprehensive coverage of all validation scenarios
// 2. Add test cases for any additional validation functions implemented in the validation utility
// 3. Consider adding property-based testing for more robust validation of complex functions