import { format, parseISO, addMinutes, differenceInMinutes } from 'date-fns';
import { Booking } from '../types';

/**
 * Formats a date object or ISO string into a specified format
 * @param date Date object or ISO string to format
 * @param formatString The desired format string
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string, formatString: string): string => {
  const dateObject = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObject, formatString);
};

/**
 * Parses an ISO date string into a Date object
 * @param isoString ISO date string to parse
 * @returns Parsed Date object
 */
export const parseISODate = (isoString: string): Date => {
  return parseISO(isoString);
};

/**
 * Adds a specified duration in minutes to a given date
 * @param date Date object to add duration to
 * @param minutes Number of minutes to add
 * @returns New date with added duration
 */
export const addDuration = (date: Date, minutes: number): Date => {
  return addMinutes(date, minutes);
};

/**
 * Calculates the duration in minutes between two dates
 * @param startDate Start date
 * @param endDate End date
 * @returns Duration in minutes
 */
export const calculateDuration = (startDate: Date, endDate: Date): number => {
  return differenceInMinutes(endDate, startDate);
};

/**
 * Checks if two time slots are overlapping
 * @param slot1 First time slot
 * @param slot2 Second time slot
 * @returns True if slots overlap, false otherwise
 */
export const isOverlapping = (
  slot1: { startTime: Date; endTime: Date },
  slot2: { startTime: Date; endTime: Date }
): boolean => {
  return (
    (slot1.startTime >= slot2.startTime && slot1.startTime < slot2.endTime) ||
    (slot1.endTime > slot2.startTime && slot1.endTime <= slot2.endTime) ||
    (slot1.startTime <= slot2.startTime && slot1.endTime >= slot2.endTime)
  );
};

/**
 * Calculates the duration of a booking in minutes
 * @param booking Booking object
 * @returns Duration of the booking in minutes
 */
export const getBookingDuration = (booking: Booking): number => {
  return calculateDuration(booking.startTime, booking.endTime);
};

// Human tasks:
// TODO: Verify that the date-fns library is installed and added to the project dependencies
// TODO: Ensure that the date formats used in formatDate function align with the project's requirements
// TODO: Add any additional date/time utility functions that may be needed for specific features of the Ice Rink Management system