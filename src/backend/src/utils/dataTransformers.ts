import moment from 'moment';
import { ServiceTypes, JobTypes, IntegrationTypes } from '../types';

/**
 * Transforms raw booking data into a standardized format for use in the application
 * @param rawBooking - The raw booking data object
 * @returns Transformed booking data object
 */
export const transformBookingData = (rawBooking: any): any => {
  const {
    id,
    userId,
    rinkId,
    startTime,
    endTime,
    status,
    price,
    createdAt,
    updatedAt,
  } = rawBooking;

  const formattedStartTime = moment(startTime).format('YYYY-MM-DD HH:mm:ss');
  const formattedEndTime = moment(endTime).format('YYYY-MM-DD HH:mm:ss');
  const duration = moment.duration(moment(endTime).diff(moment(startTime))).asHours();

  return {
    id,
    userId,
    rinkId,
    startTime: formattedStartTime,
    endTime: formattedEndTime,
    status,
    price: parseFloat(price),
    duration,
    createdAt: moment(createdAt).format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: moment(updatedAt).format('YYYY-MM-DD HH:mm:ss'),
  };
};

/**
 * Formats a number as a currency string based on the application's locale settings
 * @param amount - The amount to be formatted
 * @param currencyCode - The currency code (e.g., 'USD', 'EUR')
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currencyCode: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
};

/**
 * Converts a date-time from one timezone to another
 * @param date - The date to be converted
 * @param fromTz - The source timezone
 * @param toTz - The target timezone
 * @returns Converted date in the target timezone
 */
export const convertTimeZone = (date: Date, fromTz: string, toTz: string): Date => {
  return moment(date).tz(fromTz).clone().tz(toTz).toDate();
};

/**
 * Recursively flattens a nested object structure
 * @param obj - The object to be flattened
 * @returns Flattened object
 */
export const flattenObject = (obj: any): any => {
  const flattened: any = {};

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(flattened, flattenObject(obj[key]));
    } else {
      flattened[key] = obj[key];
    }
  });

  return flattened;
};

/**
 * Transforms raw rink data into a standardized format for use in the application
 * @param rawRink - The raw rink data object
 * @returns Transformed rink data object
 */
export const transformRinkData = (rawRink: any): any => {
  const {
    id,
    name,
    address,
    capacity,
    hourlyRate,
    openingTime,
    closingTime,
    createdAt,
    updatedAt,
  } = rawRink;

  return {
    id,
    name,
    address,
    capacity: parseInt(capacity, 10),
    hourlyRate: parseFloat(hourlyRate),
    openingTime: moment(openingTime, 'HH:mm:ss').format('HH:mm'),
    closingTime: moment(closingTime, 'HH:mm:ss').format('HH:mm'),
    createdAt: moment(createdAt).format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: moment(updatedAt).format('YYYY-MM-DD HH:mm:ss'),
  };
};

/**
 * Transforms raw equipment data into a standardized format for use in the application
 * @param rawEquipment - The raw equipment data object
 * @returns Transformed equipment data object
 */
export const transformEquipmentData = (rawEquipment: any): any => {
  const {
    id,
    name,
    type,
    quantity,
    rentalPrice,
    status,
    createdAt,
    updatedAt,
  } = rawEquipment;

  return {
    id,
    name,
    type,
    quantity: parseInt(quantity, 10),
    rentalPrice: parseFloat(rentalPrice),
    status,
    createdAt: moment(createdAt).format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: moment(updatedAt).format('YYYY-MM-DD HH:mm:ss'),
  };
};

// Human tasks:
// TODO: Implement specific data transformation logic based on the exact structure of raw data from various sources
// TODO: Add unit tests for each transformation function to ensure correct behavior
// TODO: Consider adding more specific transformation functions as needed for different data types in the system