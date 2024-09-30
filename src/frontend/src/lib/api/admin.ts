import apiClient from '../api';
import axios from 'axios';

// Types
interface User {
  // Define User interface based on your backend model
  id: number;
  // Add other user properties
}

interface Rink {
  // Define Rink interface based on your backend model
  id: number;
  // Add other rink properties
}

interface Equipment {
  // Define Equipment interface based on your backend model
  id: number;
  // Add other equipment properties
}

interface Report {
  // Define Report interface based on your backend model
  id: number;
  // Add other report properties
}

// Admin API functions

/**
 * Fetches a list of all users from the backend
 * @param params - Query parameters for filtering users
 * @returns A promise that resolves to an array of User objects
 */
export const getUsers = async (params: object): Promise<User[]> => {
  try {
    const response = await apiClient.get('/admin/users', { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
    throw error;
  }
};

/**
 * Creates a new user in the system
 * @param userData - The data for the new user
 * @returns A promise that resolves to the created User object
 */
export const createUser = async (userData: object): Promise<User> => {
  try {
    const response = await apiClient.post('/admin/users', userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
    throw error;
  }
};

/**
 * Updates an existing user's information
 * @param userId - The ID of the user to update
 * @param userData - The updated user data
 * @returns A promise that resolves to the updated User object
 */
export const updateUser = async (userId: number, userData: object): Promise<User> => {
  try {
    const response = await apiClient.put(`/admin/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
    throw error;
  }
};

/**
 * Deletes a user from the system
 * @param userId - The ID of the user to delete
 * @returns A promise that resolves when the user is successfully deleted
 */
export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await apiClient.delete(`/admin/users/${userId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
    throw error;
  }
};

/**
 * Fetches a list of all rinks from the backend
 * @param params - Query parameters for filtering rinks
 * @returns A promise that resolves to an array of Rink objects
 */
export const getRinks = async (params: object): Promise<Rink[]> => {
  try {
    const response = await apiClient.get('/admin/rinks', { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch rinks: ${error.message}`);
    }
    throw error;
  }
};

/**
 * Creates a new rink in the system
 * @param rinkData - The data for the new rink
 * @returns A promise that resolves to the created Rink object
 */
export const createRink = async (rinkData: object): Promise<Rink> => {
  try {
    const response = await apiClient.post('/admin/rinks', rinkData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to create rink: ${error.message}`);
    }
    throw error;
  }
};

/**
 * Updates an existing rink's information
 * @param rinkId - The ID of the rink to update
 * @param rinkData - The updated rink data
 * @returns A promise that resolves to the updated Rink object
 */
export const updateRink = async (rinkId: number, rinkData: object): Promise<Rink> => {
  try {
    const response = await apiClient.put(`/admin/rinks/${rinkId}`, rinkData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to update rink: ${error.message}`);
    }
    throw error;
  }
};

/**
 * Deletes a rink from the system
 * @param rinkId - The ID of the rink to delete
 * @returns A promise that resolves when the rink is successfully deleted
 */
export const deleteRink = async (rinkId: number): Promise<void> => {
  try {
    await apiClient.delete(`/admin/rinks/${rinkId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to delete rink: ${error.message}`);
    }
    throw error;
  }
};

/**
 * Fetches a list of all equipment from the backend
 * @param params - Query parameters for filtering equipment
 * @returns A promise that resolves to an array of Equipment objects
 */
export const getEquipment = async (params: object): Promise<Equipment[]> => {
  try {
    const response = await apiClient.get('/admin/equipment', { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch equipment: ${error.message}`);
    }
    throw error;
  }
};

/**
 * Creates a new equipment item in the system
 * @param equipmentData - The data for the new equipment item
 * @returns A promise that resolves to the created Equipment object
 */
export const createEquipment = async (equipmentData: object): Promise<Equipment> => {
  try {
    const response = await apiClient.post('/admin/equipment', equipmentData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to create equipment: ${error.message}`);
    }
    throw error;
  }
};

/**
 * Updates an existing equipment item's information
 * @param equipmentId - The ID of the equipment item to update
 * @param equipmentData - The updated equipment data
 * @returns A promise that resolves to the updated Equipment object
 */
export const updateEquipment = async (equipmentId: number, equipmentData: object): Promise<Equipment> => {
  try {
    const response = await apiClient.put(`/admin/equipment/${equipmentId}`, equipmentData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to update equipment: ${error.message}`);
    }
    throw error;
  }
};

/**
 * Deletes an equipment item from the system
 * @param equipmentId - The ID of the equipment item to delete
 * @returns A promise that resolves when the equipment is successfully deleted
 */
export const deleteEquipment = async (equipmentId: number): Promise<void> => {
  try {
    await apiClient.delete(`/admin/equipment/${equipmentId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to delete equipment: ${error.message}`);
    }
    throw error;
  }
};

/**
 * Generates a report based on specified parameters
 * @param reportParams - Parameters for generating the report
 * @returns A promise that resolves to the generated Report object
 */
export const generateReport = async (reportParams: object): Promise<Report> => {
  try {
    const response = await apiClient.post('/admin/reports', reportParams);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to generate report: ${error.message}`);
    }
    throw error;
  }
};

// Human tasks (commented)
/*
TODO: Implement error handling for all API calls, including network errors and unexpected server responses.
TODO: Add input validation for all function parameters to ensure data integrity before making API calls.
TODO: Implement proper authentication token handling, possibly by using an interceptor in the apiClient.
TODO: Consider adding pagination support for list operations (getUsers, getRinks, getEquipment) to handle large datasets efficiently.
TODO: Add JSDoc comments to all functions for better code documentation and IDE support.
*/