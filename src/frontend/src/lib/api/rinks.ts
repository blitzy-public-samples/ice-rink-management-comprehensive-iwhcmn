import { AxiosResponse } from 'axios';
import apiClient from './index';

// Assuming these types are defined elsewhere in the project
interface Rink {
  id: string;
  name: string;
  // Add other properties as needed
}

interface RinkSchedule {
  // Define the structure of RinkSchedule
}

interface IceSlot {
  id: string;
  // Add other properties as needed
}

/**
 * Fetches all rinks from the backend
 * @returns A promise that resolves to an array of Rink objects
 */
export const getRinks = (): Promise<AxiosResponse<Rink[]>> => {
  return apiClient.get('/api/rinks');
};

/**
 * Fetches a specific rink by its ID
 * @param id The ID of the rink to fetch
 * @returns A promise that resolves to a single Rink object
 */
export const getRinkById = (id: string): Promise<AxiosResponse<Rink>> => {
  return apiClient.get(`/api/rinks/${id}`);
};

/**
 * Fetches the schedule for a specific rink
 * @param rinkId The ID of the rink
 * @param startDate The start date of the schedule
 * @param endDate The end date of the schedule
 * @returns A promise that resolves to a RinkSchedule object
 */
export const getRinkSchedule = (
  rinkId: string,
  startDate: Date,
  endDate: Date
): Promise<AxiosResponse<RinkSchedule>> => {
  return apiClient.get(`/api/rinks/${rinkId}/schedule`, {
    params: { startDate, endDate },
  });
};

/**
 * Creates a new rink
 * @param rinkData The data for the new rink
 * @returns A promise that resolves to the newly created Rink object
 */
export const createRink = (rinkData: Omit<Rink, 'id'>): Promise<AxiosResponse<Rink>> => {
  return apiClient.post('/api/rinks', rinkData);
};

/**
 * Updates an existing rink
 * @param id The ID of the rink to update
 * @param rinkData The updated data for the rink
 * @returns A promise that resolves to the updated Rink object
 */
export const updateRink = (id: string, rinkData: Partial<Rink>): Promise<AxiosResponse<Rink>> => {
  return apiClient.put(`/api/rinks/${id}`, rinkData);
};

/**
 * Deletes a rink
 * @param id The ID of the rink to delete
 * @returns A promise that resolves when the rink is successfully deleted
 */
export const deleteRink = (id: string): Promise<AxiosResponse<void>> => {
  return apiClient.delete(`/api/rinks/${id}`);
};

/**
 * Creates a new ice slot for a rink
 * @param rinkId The ID of the rink
 * @param slotData The data for the new ice slot
 * @returns A promise that resolves to the newly created IceSlot object
 */
export const createIceSlot = (
  rinkId: string,
  slotData: Omit<IceSlot, 'id'>
): Promise<AxiosResponse<IceSlot>> => {
  return apiClient.post(`/api/rinks/${rinkId}/slots`, slotData);
};

/**
 * Updates an existing ice slot
 * @param rinkId The ID of the rink
 * @param slotId The ID of the ice slot to update
 * @param slotData The updated data for the ice slot
 * @returns A promise that resolves to the updated IceSlot object
 */
export const updateIceSlot = (
  rinkId: string,
  slotId: string,
  slotData: Partial<IceSlot>
): Promise<AxiosResponse<IceSlot>> => {
  return apiClient.put(`/api/rinks/${rinkId}/slots/${slotId}`, slotData);
};

/**
 * Deletes an ice slot
 * @param rinkId The ID of the rink
 * @param slotId The ID of the ice slot to delete
 * @returns A promise that resolves when the ice slot is successfully deleted
 */
export const deleteIceSlot = (rinkId: string, slotId: string): Promise<AxiosResponse<void>> => {
  return apiClient.delete(`/api/rinks/${rinkId}/slots/${slotId}`);
};

// TODO: Implement error handling for API calls
// TODO: Add input validation for function parameters
// TODO: Consider implementing caching mechanisms for frequently accessed data
// TODO: Review and update API endpoints to ensure they match the backend implementation