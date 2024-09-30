import { format, parse, differenceInMinutes, startOfWeek, isWithinInterval } from 'date-fns';

/**
 * Formats a date object or string into a specified format
 * @param date Date object or string to format
 * @param formatString Format string to use
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string, formatString: string): string => {
  const dateObject = typeof date === 'string' ? new Date(date) : date;
  return format(dateObject, formatString);
};

/**
 * Parses a date string into a Date object
 * @param dateString Date string to parse
 * @param formatString Format string of the input date string
 * @returns Parsed Date object
 */
export const parseDate = (dateString: string, formatString: string): Date => {
  return parse(dateString, formatString, new Date());
};

/**
 * Checks if a given time slot is available for booking
 * @param startTime Start time of the slot to check
 * @param endTime End time of the slot to check
 * @param bookedSlots Array of booked slots to check against
 * @returns True if the slot is available, false otherwise
 */
export const isSlotAvailable = (
  startTime: Date,
  endTime: Date,
  bookedSlots: Array<{ startTime: Date; endTime: Date }>
): boolean => {
  return !bookedSlots.some((slot) =>
    isWithinInterval(startTime, { start: slot.startTime, end: slot.endTime }) ||
    isWithinInterval(endTime, { start: slot.startTime, end: slot.endTime }) ||
    (startTime <= slot.startTime && endTime >= slot.endTime)
  );
};

/**
 * Calculates the duration between two dates in minutes
 * @param startDate Start date
 * @param endDate End date
 * @returns Duration in minutes
 */
export const getDurationInMinutes = (startDate: Date, endDate: Date): number => {
  return differenceInMinutes(endDate, startDate);
};

/**
 * Returns the start date of the week for a given date
 * @param date Date to get the start of the week for
 * @returns Start date of the week
 */
export const getWeekStartDate = (date: Date): Date => {
  return startOfWeek(date);
};

/**
 * Generates an array of time slots for a given date and interval
 * @param date Date to generate time slots for
 * @param intervalMinutes Interval in minutes between each time slot
 * @returns Array of time slots
 */
export const generateTimeSlots = (
  date: Date,
  intervalMinutes: number
): Array<{ startTime: Date; endTime: Date }> => {
  const slots: Array<{ startTime: Date; endTime: Date }> = [];
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  let currentSlotStart = startOfDay;
  while (currentSlotStart < endOfDay) {
    const slotEnd = new Date(currentSlotStart.getTime() + intervalMinutes * 60000);
    slots.push({ startTime: currentSlotStart, endTime: slotEnd });
    currentSlotStart = slotEnd;
  }

  return slots;
};

// Human tasks:
// TODO: Implement unit tests for all date utility functions
// TODO: Review and optimize date operations for performance if needed
// TODO: Ensure all date functions handle timezone differences correctly