import { UserRole, BookingStatus, EquipmentType } from '../types';
import { RINK_OPEN_HOUR, RINK_CLOSE_HOUR } from '../constants';

/**
 * Formats a number as a currency string
 * @param amount - The amount to format
 * @param currencyCode - The currency code (e.g., 'USD', 'EUR')
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}

/**
 * Formats a date object or string into a localized date string
 * @param date - The date to format
 * @param locale - The locale to use for formatting
 * @param options - Additional options for Intl.DateTimeFormat
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  locale: string,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObject = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(dateObject);
}

/**
 * Formats a time string into a localized time string
 * @param time - The time string to format (e.g., '14:30')
 * @param locale - The locale to use for formatting
 * @returns Formatted time string
 */
export function formatTime(time: string, locale: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
}

/**
 * Formats a duration in minutes into a human-readable string
 * @param minutes - The duration in minutes
 * @returns Formatted duration string
 */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const parts = [];

  if (hours > 0) {
    parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
  }
  if (remainingMinutes > 0) {
    parts.push(`${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`);
  }

  return parts.join(' ');
}

/**
 * Formats a UserRole enum value into a human-readable string
 * @param role - The UserRole enum value
 * @returns Formatted user role string
 */
export function formatUserRole(role: UserRole): string {
  return role.replace(/([A-Z])/g, ' $1').trim();
}

/**
 * Formats a BookingStatus enum value into a human-readable string
 * @param status - The BookingStatus enum value
 * @returns Formatted booking status string
 */
export function formatBookingStatus(status: BookingStatus): string {
  return status.replace(/([A-Z])/g, ' $1').trim();
}

/**
 * Formats an EquipmentType enum value into a human-readable string
 * @param type - The EquipmentType enum value
 * @returns Formatted equipment type string
 */
export function formatEquipmentType(type: EquipmentType): string {
  return type.replace(/([A-Z])/g, ' $1').trim();
}

/**
 * Formats a time slot (start and end time) into a human-readable string
 * @param startTime - The start time string (e.g., '14:30')
 * @param endTime - The end time string (e.g., '16:00')
 * @param locale - The locale to use for formatting
 * @returns Formatted time slot string
 */
export function formatTimeSlot(startTime: string, endTime: string, locale: string): string {
  const formattedStartTime = formatTime(startTime, locale);
  const formattedEndTime = formatTime(endTime, locale);
  return `${formattedStartTime} - ${formattedEndTime}`;
}

/**
 * Formats the rink's operating hours into a human-readable string
 * @returns Formatted operating hours string
 */
export function formatOperatingHours(): string {
  const openTime = formatTime(`${RINK_OPEN_HOUR}:00`, 'en-US');
  const closeTime = formatTime(`${RINK_CLOSE_HOUR}:00`, 'en-US');
  return `Open: ${openTime} - ${closeTime}`;
}

// Human tasks:
// TODO: Review and adjust formatting functions based on specific business requirements and localization needs
// TODO: Implement proper error handling for edge cases in formatting functions
// TODO: Add unit tests for each formatting function to ensure correct behavior
// TODO: Consider adding more specific formatting functions if needed for the application