import { useCallback, useState, useEffect } from 'react';
import { User, Rink, Equipment } from '../types';
import * as adminApi from '../lib/api/admin';

interface AdminState {
  users: User[];
  rinks: Rink[];
  equipment: Equipment[];
  loading: boolean;
  error: string | null;
}

interface AdminActions {
  fetchUsers: () => Promise<void>;
  fetchRinks: () => Promise<void>;
  fetchEquipment: () => Promise<void>;
  createUser: (user: Omit<User, 'id'>) => Promise<void>;
  updateUser: (id: string, user: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  createRink: (rink: Omit<Rink, 'id'>) => Promise<void>;
  updateRink: (id: string, rink: Partial<Rink>) => Promise<void>;
  deleteRink: (id: string) => Promise<void>;
  createEquipment: (equipment: Omit<Equipment, 'id'>) => Promise<void>;
  updateEquipment: (id: string, equipment: Partial<Equipment>) => Promise<void>;
  deleteEquipment: (id: string) => Promise<void>;
}

export function useAdmin(): AdminState & AdminActions {
  const [state, setState] = useState<AdminState>({
    users: [],
    rinks: [],
    equipment: [],
    loading: false,
    error: null,
  });

  const setLoading = (loading: boolean) => setState(prev => ({ ...prev, loading }));
  const setError = (error: string | null) => setState(prev => ({ ...prev, error }));

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const users = await adminApi.getUsers();
      setState(prev => ({ ...prev, users }));
    } catch (error) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRinks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const rinks = await adminApi.getRinks();
      setState(prev => ({ ...prev, rinks }));
    } catch (error) {
      setError('Failed to fetch rinks');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchEquipment = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const equipment = await adminApi.getEquipment();
      setState(prev => ({ ...prev, equipment }));
    } catch (error) {
      setError('Failed to fetch equipment');
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(async (user: Omit<User, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await adminApi.createUser(user);
      setState(prev => ({ ...prev, users: [...prev.users, newUser] }));
    } catch (error) {
      setError('Failed to create user');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (id: string, user: Partial<User>) => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await adminApi.updateUser(id, user);
      setState(prev => ({
        ...prev,
        users: prev.users.map(u => (u.id === id ? updatedUser : u)),
      }));
    } catch (error) {
      setError('Failed to update user');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await adminApi.deleteUser(id);
      setState(prev => ({
        ...prev,
        users: prev.users.filter(u => u.id !== id),
      }));
    } catch (error) {
      setError('Failed to delete user');
    } finally {
      setLoading(false);
    }
  }, []);

  const createRink = useCallback(async (rink: Omit<Rink, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const newRink = await adminApi.createRink(rink);
      setState(prev => ({ ...prev, rinks: [...prev.rinks, newRink] }));
    } catch (error) {
      setError('Failed to create rink');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateRink = useCallback(async (id: string, rink: Partial<Rink>) => {
    setLoading(true);
    setError(null);
    try {
      const updatedRink = await adminApi.updateRink(id, rink);
      setState(prev => ({
        ...prev,
        rinks: prev.rinks.map(r => (r.id === id ? updatedRink : r)),
      }));
    } catch (error) {
      setError('Failed to update rink');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteRink = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await adminApi.deleteRink(id);
      setState(prev => ({
        ...prev,
        rinks: prev.rinks.filter(r => r.id !== id),
      }));
    } catch (error) {
      setError('Failed to delete rink');
    } finally {
      setLoading(false);
    }
  }, []);

  const createEquipment = useCallback(async (equipment: Omit<Equipment, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const newEquipment = await adminApi.createEquipment(equipment);
      setState(prev => ({ ...prev, equipment: [...prev.equipment, newEquipment] }));
    } catch (error) {
      setError('Failed to create equipment');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEquipment = useCallback(async (id: string, equipment: Partial<Equipment>) => {
    setLoading(true);
    setError(null);
    try {
      const updatedEquipment = await adminApi.updateEquipment(id, equipment);
      setState(prev => ({
        ...prev,
        equipment: prev.equipment.map(e => (e.id === id ? updatedEquipment : e)),
      }));
    } catch (error) {
      setError('Failed to update equipment');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEquipment = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await adminApi.deleteEquipment(id);
      setState(prev => ({
        ...prev,
        equipment: prev.equipment.filter(e => e.id !== id),
      }));
    } catch (error) {
      setError('Failed to delete equipment');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchRinks();
    fetchEquipment();
  }, [fetchUsers, fetchRinks, fetchEquipment]);

  return {
    ...state,
    fetchUsers,
    fetchRinks,
    fetchEquipment,
    createUser,
    updateUser,
    deleteUser,
    createRink,
    updateRink,
    deleteRink,
    createEquipment,
    updateEquipment,
    deleteEquipment,
  };
}

// Human tasks:
// 1. Implement error handling and loading states for all API calls (Required)
// 2. Add proper TypeScript typing for all functions and state variables (Required)
// 3. Implement pagination for fetching large datasets of users, rinks, or equipment (Optional)