import axios from 'axios';
import { RinkType, RinkScheduleType, RinkFilterType } from '../types/rink';
import api from './index';

/**
 * Fetches a list of rinks based on optional filters
 * @param filters Optional filters to apply to the rink search
 * @returns A promise that resolves to an array of rinks
 */
export const getRinks = async (filters?: RinkFilterType): Promise<RinkType[]> => {
  try {
    const response = await api.get('/rinks', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching rinks:', error);
    throw error;
  }
};

/**
 * Fetches a single rink by its ID
 * @param id The ID of the rink to fetch
 * @returns A promise that resolves to a single rink
 */
export const getRinkById = async (id: string): Promise<RinkType> => {
  try {
    const response = await api.get(`/rinks/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching rink with id ${id}:`, error);
    throw error;
  }
};

/**
 * Fetches the schedule for a specific rink
 * @param rinkId The ID of the rink to fetch the schedule for
 * @param date The date for which to fetch the schedule
 * @returns A promise that resolves to the rink's schedule
 */
export const getRinkSchedule = async (rinkId: string, date: Date): Promise<RinkScheduleType> => {
  try {
    const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    const response = await api.get(`/rinks/${rinkId}/schedule`, { params: { date: formattedDate } });
    return response.data;
  } catch (error) {
    console.error(`Error fetching schedule for rink ${rinkId}:`, error);
    throw error;
  }
};

/**
 * Searches for rinks based on a query string
 * @param query The search query string
 * @returns A promise that resolves to an array of rinks matching the search query
 */
export const searchRinks = async (query: string): Promise<RinkType[]> => {
  try {
    const response = await api.get('/rinks/search', { params: { query } });
    return response.data;
  } catch (error) {
    console.error('Error searching rinks:', error);
    throw error;
  }
};

// TODO: Implement error handling for API requests
// TODO: Add authentication token to API requests if required
// TODO: Implement caching mechanism for frequently accessed rink data
// TODO: Add pagination support for getRinks function if dealing with large datasets
// TODO: Implement offline support for basic rink information