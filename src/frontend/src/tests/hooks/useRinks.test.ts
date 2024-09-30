import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import useRinks from '../../hooks/useRinks';
import { Rink, RinkSchedule, IceSlot } from '../../types/rink';

// Mock the API calls
jest.mock('../../lib/api/rinks', () => ({
  fetchAllRinks: jest.fn(),
  fetchRink: jest.fn(),
  fetchRinkSchedule: jest.fn(),
  updateRink: jest.fn(),
}));

// Mock API functions
import { fetchAllRinks, fetchRink, fetchRinkSchedule, updateRink } from '../../lib/api/rinks';

// Create a mock store
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      rinks: (state = initialState, action) => state,
    },
  });
};

describe('useRinks', () => {
  // Helper function to render the hook with a Provider
  const renderUseRinksHook = (initialState = {}) => {
    const mockStore = createMockStore(initialState);
    return renderHook(() => useRinks(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('initial state', () => {
    const { result } = renderUseRinksHook();
    expect(result.current.rinks).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('fetching all rinks', async () => {
    const mockRinks: Rink[] = [
      { id: '1', name: 'Rink 1', location: 'Location 1' },
      { id: '2', name: 'Rink 2', location: 'Location 2' },
    ];
    (fetchAllRinks as jest.Mock).mockResolvedValue(mockRinks);

    const { result, waitForNextUpdate } = renderUseRinksHook();

    act(() => {
      result.current.fetchRinks();
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.rinks).toEqual(mockRinks);
    expect(result.current.error).toBeNull();
    expect(fetchAllRinks).toHaveBeenCalledTimes(1);
  });

  test('fetching a single rink', async () => {
    const mockRink: Rink = { id: '1', name: 'Rink 1', location: 'Location 1' };
    (fetchRink as jest.Mock).mockResolvedValue(mockRink);

    const { result, waitForNextUpdate } = renderUseRinksHook();

    act(() => {
      result.current.fetchRink('1');
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.selectedRink).toEqual(mockRink);
    expect(result.current.error).toBeNull();
    expect(fetchRink).toHaveBeenCalledWith('1');
  });

  test('fetching rink schedule', async () => {
    const mockSchedule: RinkSchedule = {
      rinkId: '1',
      slots: [
        { id: '1', startTime: '2023-05-01T09:00:00Z', endTime: '2023-05-01T10:00:00Z', status: 'available' },
        { id: '2', startTime: '2023-05-01T10:00:00Z', endTime: '2023-05-01T11:00:00Z', status: 'booked' },
      ],
    };
    (fetchRinkSchedule as jest.Mock).mockResolvedValue(mockSchedule);

    const { result, waitForNextUpdate } = renderUseRinksHook();

    act(() => {
      result.current.fetchRinkSchedule('1');
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.rinkSchedule).toEqual(mockSchedule);
    expect(result.current.error).toBeNull();
    expect(fetchRinkSchedule).toHaveBeenCalledWith('1');
  });

  test('updating rink information', async () => {
    const updatedRink: Rink = { id: '1', name: 'Updated Rink 1', location: 'New Location 1' };
    (updateRink as jest.Mock).mockResolvedValue(updatedRink);

    const { result, waitForNextUpdate } = renderUseRinksHook();

    act(() => {
      result.current.updateRink(updatedRink);
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.selectedRink).toEqual(updatedRink);
    expect(result.current.error).toBeNull();
    expect(updateRink).toHaveBeenCalledWith(updatedRink);
  });

  test('error handling', async () => {
    const error = new Error('Failed to fetch rinks');
    (fetchAllRinks as jest.Mock).mockRejectedValue(error);

    const { result, waitForNextUpdate } = renderUseRinksHook();

    act(() => {
      result.current.fetchRinks();
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toEqual(error);
    expect(result.current.rinks).toEqual([]);
  });

  test('loading states', async () => {
    const mockRinks: Rink[] = [{ id: '1', name: 'Rink 1', location: 'Location 1' }];
    (fetchAllRinks as jest.Mock).mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(mockRinks), 100)));

    const { result, waitForNextUpdate } = renderUseRinksHook();

    act(() => {
      result.current.fetchRinks();
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.rinks).toEqual(mockRinks);
  });
});
```

This test file covers the main functionality of the useRinks hook as described in the JSON specification. Here's a breakdown of what's included:

1. We import necessary dependencies and mock the API calls.
2. We create a mock store and a helper function to render the hook with a Provider.
3. We test the initial state of the hook.
4. We test fetching all rinks, a single rink, and the rink schedule.
5. We test updating rink information.
6. We test error handling.
7. We test loading states.

Note that this implementation makes some assumptions about the structure of the useRinks hook and the Redux store. You may need to adjust the tests based on the actual implementation of the hook and the Redux store structure.

Human tasks that should be added as comments in the file:

```typescript
// TODO: Implement actual test cases based on the outlined test structure
// TODO: Set up mock store and API responses for testing
// TODO: Ensure all edge cases and error scenarios are covered in the tests
// TODO: Add integration tests with actual Redux store if not covered in separate integration test files
// TODO: Consider adding performance tests for operations that might be resource-intensive