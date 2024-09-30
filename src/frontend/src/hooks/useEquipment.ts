import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Equipment, EquipmentRental, EquipmentStatus, RentalStatus, EquipmentType } from '../types/equipment';

interface UseEquipmentReturn {
  equipmentList: Equipment[];
  isLoading: boolean;
  error: string | null;
  fetchEquipment: () => Promise<void>;
  createEquipment: (equipment: Omit<Equipment, 'id'>) => Promise<void>;
  updateEquipment: (id: string, updates: Partial<Equipment>) => Promise<void>;
  deleteEquipment: (id: string) => Promise<void>;
  rentEquipment: (rental: Omit<EquipmentRental, 'id'>) => Promise<void>;
  returnEquipment: (rentalId: string) => Promise<void>;
}

export const useEquipment = (): UseEquipmentReturn => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Assuming we have a Redux slice for equipment
  const equipmentList = useSelector((state: any) => state.equipment.list);

  const fetchEquipment = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Dispatch an action to fetch equipment from the API
      await dispatch({ type: 'equipment/fetchEquipment' });
    } catch (err) {
      setError('Failed to fetch equipment');
      console.error('Error fetching equipment:', err);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const createEquipment = useCallback(async (equipment: Omit<Equipment, 'id'>) => {
    setIsLoading(true);
    setError(null);
    try {
      await dispatch({ type: 'equipment/createEquipment', payload: equipment });
    } catch (err) {
      setError('Failed to create equipment');
      console.error('Error creating equipment:', err);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const updateEquipment = useCallback(async (id: string, updates: Partial<Equipment>) => {
    setIsLoading(true);
    setError(null);
    try {
      await dispatch({ type: 'equipment/updateEquipment', payload: { id, updates } });
    } catch (err) {
      setError('Failed to update equipment');
      console.error('Error updating equipment:', err);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const deleteEquipment = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await dispatch({ type: 'equipment/deleteEquipment', payload: id });
    } catch (err) {
      setError('Failed to delete equipment');
      console.error('Error deleting equipment:', err);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const rentEquipment = useCallback(async (rental: Omit<EquipmentRental, 'id'>) => {
    setIsLoading(true);
    setError(null);
    try {
      await dispatch({ type: 'equipment/rentEquipment', payload: rental });
    } catch (err) {
      setError('Failed to rent equipment');
      console.error('Error renting equipment:', err);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const returnEquipment = useCallback(async (rentalId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await dispatch({ type: 'equipment/returnEquipment', payload: rentalId });
    } catch (err) {
      setError('Failed to return equipment');
      console.error('Error returning equipment:', err);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

  return {
    equipmentList,
    isLoading,
    error,
    fetchEquipment,
    createEquipment,
    updateEquipment,
    deleteEquipment,
    rentEquipment,
    returnEquipment,
  };
};

// Human tasks:
// TODO: Implement error handling and retry logic for API calls (Required)
// TODO: Add unit tests for the useEquipment hook (Required)
// TODO: Consider implementing caching mechanisms for equipment data to improve performance (Optional)
// TODO: Review and optimize the equipment fetching strategy (e.g., pagination, filtering) (Optional)