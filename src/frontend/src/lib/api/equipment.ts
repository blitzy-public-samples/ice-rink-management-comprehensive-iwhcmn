import axios from 'axios';
import { Equipment, EquipmentRental } from '../types/equipment';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

export const getEquipmentList = async (): Promise<Equipment[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/equipment`);
    return response.data;
  } catch (error) {
    console.error('Error fetching equipment list:', error);
    throw error;
  }
};

export const getEquipmentById = async (id: string): Promise<Equipment> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/equipment/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching equipment with id ${id}:`, error);
    throw error;
  }
};

export const createEquipmentRental = async (rentalData: Omit<EquipmentRental, 'id'>): Promise<EquipmentRental> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/equipment-rentals`, rentalData);
    return response.data;
  } catch (error) {
    console.error('Error creating equipment rental:', error);
    throw error;
  }
};

export const updateEquipmentRental = async (id: string, updateData: Partial<EquipmentRental>): Promise<EquipmentRental> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/equipment-rentals/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error(`Error updating equipment rental with id ${id}:`, error);
    throw error;
  }
};

export const cancelEquipmentRental = async (id: string): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/equipment-rentals/${id}/cancel`);
  } catch (error) {
    console.error(`Error cancelling equipment rental with id ${id}:`, error);
    throw error;
  }
};

export const getAvailableEquipment = async (startTime: Date, endTime: Date): Promise<Equipment[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/equipment/available`, {
      params: {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching available equipment:', error);
    throw error;
  }
};

// TODO: Implement error handling for API requests
// TODO: Add authentication token to API requests if not handled globally
// TODO: Consider implementing request caching for frequently accessed data
// TODO: Add any ice rink-specific equipment API functions that may be needed