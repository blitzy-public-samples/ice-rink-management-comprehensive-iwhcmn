import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import configureStore from '@reduxjs/toolkit';
import { MockStoreEnhanced } from 'redux-mock-store';
import useEquipment from '../../hooks/useEquipment';
import { Equipment, EquipmentRental, EquipmentStatus, RentalStatus, EquipmentType } from '../../types/equipment';

// Mock the Redux store
const mockStore = configureStore([]);

// Mock API calls
jest.mock('../../lib/api/equipment', () => ({
  fetchEquipment: jest.fn(),
  createEquipment: jest.fn(),
  updateEquipment: jest.fn(),
  deleteEquipment: jest.fn(),
  rentEquipment: jest.fn(),
}));

describe('useEquipment hook', () => {
  let store: MockStoreEnhanced<unknown, {}>;

  beforeEach(() => {
    store = mockStore({
      equipment: {
        items: [],
        loading: false,
        error: null,
      },
    });
  });

  it('should fetch equipment', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useEquipment(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.equipment).toEqual([]);
    expect(result.current.loading).toBe(false);

    act(() => {
      result.current.fetchEquipment();
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.equipment).toHaveLength(1); // Assuming one equipment item is fetched
  });

  it('should create equipment', async () => {
    const newEquipment: Omit<Equipment, 'id'> = {
      name: 'New Skates',
      type: EquipmentType.SKATES,
      status: EquipmentStatus.AVAILABLE,
      quantity: 10,
    };

    const { result, waitForNextUpdate } = renderHook(() => useEquipment(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      result.current.createEquipment(newEquipment);
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.equipment).toHaveLength(1);
    expect(result.current.equipment[0].name).toBe('New Skates');
  });

  it('should update equipment', async () => {
    const updatedEquipment: Equipment = {
      id: '1',
      name: 'Updated Skates',
      type: EquipmentType.SKATES,
      status: EquipmentStatus.MAINTENANCE,
      quantity: 8,
    };

    const { result, waitForNextUpdate } = renderHook(() => useEquipment(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      result.current.updateEquipment(updatedEquipment);
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.equipment[0].name).toBe('Updated Skates');
    expect(result.current.equipment[0].status).toBe(EquipmentStatus.MAINTENANCE);
  });

  it('should delete equipment', async () => {
    const equipmentId = '1';

    const { result, waitForNextUpdate } = renderHook(() => useEquipment(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      result.current.deleteEquipment(equipmentId);
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.equipment).toHaveLength(0);
  });

  it('should rent equipment', async () => {
    const rental: Omit<EquipmentRental, 'id'> = {
      equipmentId: '1',
      userId: 'user1',
      startDate: new Date(),
      endDate: new Date(Date.now() + 86400000), // 1 day later
      status: RentalStatus.ACTIVE,
    };

    const { result, waitForNextUpdate } = renderHook(() => useEquipment(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      result.current.rentEquipment(rental);
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    // Add assertions based on the expected behavior after renting equipment
  });

  // Add more test cases for error handling scenarios
  it('should handle fetch error', async () => {
    const error = new Error('Failed to fetch equipment');
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(require('../../lib/api/equipment'), 'fetchEquipment').mockRejectedValue(error);

    const { result, waitForNextUpdate } = renderHook(() => useEquipment(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      result.current.fetchEquipment();
    });

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to fetch equipment');
    expect(console.error).toHaveBeenCalledWith(error);
  });
});