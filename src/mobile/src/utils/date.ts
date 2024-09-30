import { format, parse, isPast, intervalToDuration, add } from 'date-fns';

/**
 * Formats a date object or string into a specified format
 * @param date Date object or string to format
 * @param formatString Format string (e.g., 'yyyy-MM-dd')
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string, formatString: string): string => {
  const dateObject = typeof date === 'string' ? new Date(date) : date;
  return format(dateObject, formatString);
};

/**
 * Parses a date string into a Date object
 * @param dateString Date string to parse
 * @param formatString Format of the input date string (e.g., 'yyyy-MM-dd')
 * @returns Parsed Date object
 */
export const parseDate = (dateString: string, formatString: string): Date => {
  return parse(dateString, formatString, new Date());
};

/**
 * Checks if a given date is in the past
 * @param date Date object or string to check
 * @returns True if the date is in the past, false otherwise
 */
export const isDateInPast = (date: Date | string): boolean => {
  const dateObject = typeof date === 'string' ? new Date(date) : date;
  return isPast(dateObject);
};

/**
 * Calculates the duration between two dates
 * @param startDate Start date (Date object or string)
 * @param endDate End date (Date object or string)
 * @returns Duration object containing years, months, days, hours, minutes, and seconds
 */
export const calculateDuration = (startDate: Date | string, endDate: Date | string): Duration => {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  return intervalToDuration({ start, end });
};

/**
 * Adds a specified amount of time to a given date
 * @param date Date object or string to add time to
 * @param duration Duration object specifying the amount of time to add
 * @returns New date with added duration
 */
export const addTime = (date: Date | string, duration: Duration): Date => {
  const dateObject = typeof date === 'string' ? new Date(date) : date;
  return add(dateObject, duration);
};

// Human tasks (commented)
/**
 * TODO: Human tasks
 * 1. Ensure that the date-fns library is installed and added to the project dependencies (Critical)
 * 2. Review and test all date utility functions to ensure they meet the specific requirements of the Ice Rink Management and Booking System (Required)
 * 3. Consider adding more specific date utility functions based on the unique needs of ice rink bookings and schedules (Optional)
 */