import { AxiosResponse } from 'axios';
import { apiClient } from './index';

// Since we don't have the actual types, we'll define them here based on the JSON specification
export interface MobileEquipment {
  id: string;
  name: string;
  type: string;
  status: string;
  // Add other relevant fields
}

export interface MobileEquipmentRental {
  id: string;
  equipmentId: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: string;
  // Add other relevant fields
}

export interface EquipmentFilterOptions {
  type?: string;
  status?: string;
  // Add other relevant filter options
}

/**
 * Fetches a list of equipment based on filter options
 * @param filterOptions Options to filter the equipment list
 * @returns A promise that resolves to an array of MobileEquipment
 */
export const getEquipment = async (filterOptions: EquipmentFilterOptions): Promise<AxiosResponse<MobileEquipment[]>> => {
  const queryParams = new URLSearchParams(filterOptions as Record<string, string>).toString();
  const endpoint = `/equipment${queryParams ? `?${queryParams}` : ''}`;
  return apiClient.get(endpoint);
};

/**
 * Fetches a single equipment item by its ID
 * @param equipmentId The ID of the equipment to fetch
 * @returns A promise that resolves to a single MobileEquipment object
 */
export const getEquipmentById = async (equipmentId: string): Promise<AxiosResponse<MobileEquipment>> => {
  return apiClient.get(`/equipment/${equipmentId}`);
};

/**
 * Creates a new equipment rental
 * @param rentalData The data for the new equipment rental
 * @returns A promise that resolves to the created MobileEquipmentRental object
 */
export const createEquipmentRental = async (rentalData: Omit<MobileEquipmentRental, 'id'>): Promise<AxiosResponse<MobileEquipmentRental>> => {
  return apiClient.post('/equipment-rentals', rentalData);
};

/**
 * Updates an existing equipment rental
 * @param rentalId The ID of the rental to update
 * @param updateData The data to update in the rental
 * @returns A promise that resolves to the updated MobileEquipmentRental object
 */
export const updateEquipmentRental = async (rentalId: string, updateData: Partial<MobileEquipmentRental>): Promise<AxiosResponse<MobileEquipmentRental>> => {
  return apiClient.put(`/equipment-rentals/${rentalId}`, updateData);
};

/**
 * Cancels an equipment rental
 * @param rentalId The ID of the rental to cancel
 * @returns A promise that resolves when the rental is successfully canceled
 */
export const cancelEquipmentRental = async (rentalId: string): Promise<AxiosResponse<void>> => {
  return apiClient.delete(`/equipment-rentals/${rentalId}`);
};

/**
 * Fetches all equipment rentals for the current user
 * @returns A promise that resolves to an array of MobileEquipmentRental objects
 */
export const getUserRentals = async (): Promise<AxiosResponse<MobileEquipmentRental[]>> => {
  return apiClient.get('/user/equipment-rentals');
};

// TODO: Implement error handling and retry logic for API calls
// TODO: Add caching mechanism for frequently accessed equipment data to improve mobile app performance
// TODO: Implement offline support for equipment-related operations