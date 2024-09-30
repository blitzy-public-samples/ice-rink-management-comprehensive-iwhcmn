import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rink, RinkSchedule, IceSlot } from '../types/rink';
import { RootState } from '../lib/redux/rootReducer';
import { fetchRinks, fetchRinkById, fetchRinkSchedule, updateRink } from '../lib/redux/slices/rinkSlice';
import { AppDispatch } from '../lib/redux/store';

interface UseRinksResult {
  rinks: Rink[];
  loading: boolean;
  error: string | null;
  fetchAllRinks: () => Promise<void>;
  fetchRink: (id: string) => Promise<void>;
  fetchSchedule: (id: string) => Promise<void>;
  updateRinkInfo: (id: string, data: Partial<Rink>) => Promise<void>;
  currentRink: Rink | null;
  currentSchedule: RinkSchedule | null;
}

export const useRinks = (): UseRinksResult => {
  const dispatch = useDispatch<AppDispatch>();
  const { rinks, currentRink, currentSchedule, loading, error } = useSelector((state: RootState) => state.rink);

  const [localLoading, setLocalLoading] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (rinks.length === 0) {
      fetchAllRinks();
    }
  }, []);

  const fetchAllRinks = async (): Promise<void> => {
    setLocalLoading(true);
    setLocalError(null);
    try {
      await dispatch(fetchRinks());
    } catch (err) {
      setLocalError('Failed to fetch rinks. Please try again.');
    } finally {
      setLocalLoading(false);
    }
  };

  const fetchRink = async (id: string): Promise<void> => {
    setLocalLoading(true);
    setLocalError(null);
    try {
      await dispatch(fetchRinkById(id));
    } catch (err) {
      setLocalError('Failed to fetch rink details. Please try again.');
    } finally {
      setLocalLoading(false);
    }
  };

  const fetchSchedule = async (id: string): Promise<void> => {
    setLocalLoading(true);
    setLocalError(null);
    try {
      await dispatch(fetchRinkSchedule(id));
    } catch (err) {
      setLocalError('Failed to fetch rink schedule. Please try again.');
    } finally {
      setLocalLoading(false);
    }
  };

  const updateRinkInfo = async (id: string, data: Partial<Rink>): Promise<void> => {
    setLocalLoading(true);
    setLocalError(null);
    try {
      await dispatch(updateRink({ id, data }));
    } catch (err) {
      setLocalError('Failed to update rink information. Please try again.');
    } finally {
      setLocalLoading(false);
    }
  };

  return {
    rinks,
    loading: loading || localLoading,
    error: error || localError,
    fetchAllRinks,
    fetchRink,
    fetchSchedule,
    updateRinkInfo,
    currentRink,
    currentSchedule,
  };
};

// Human tasks:
// 1. Implement the actual API calls in the src/frontend/src/lib/api/rinks.ts file
// 2. Create and implement the rink slice in src/frontend/src/lib/redux/slices/rinkSlice.ts
// 3. Review and adjust the useRinks hook implementation based on specific project requirements
// 4. Add error handling and loading state management in the useRinks hook
// 5. Consider adding pagination or infinite scrolling for fetching rinks if dealing with a large number of rinks