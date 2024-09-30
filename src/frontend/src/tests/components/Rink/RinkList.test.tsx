import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { RinkList } from '../../../components/Rink/RinkList';
import { Rink } from '../../../types/rink';
import { useRinks } from '../../../hooks/useRinks';

// Mock the useRinks hook
jest.mock('../../../hooks/useRinks');

describe('RinkList component', () => {
  const mockRinks: Rink[] = [
    { id: '1', name: 'Ice Palace', location: 'Downtown', capacity: 100 },
    { id: '2', name: 'Frozen Arena', location: 'Uptown', capacity: 150 },
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    jest.resetAllMocks();
  });

  it('renders loading state when fetching rinks', () => {
    (useRinks as jest.Mock).mockReturnValue({ rinks: [], isLoading: true, error: null });

    render(<RinkList />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders rink list when data is loaded', async () => {
    (useRinks as jest.Mock).mockReturnValue({ rinks: mockRinks, isLoading: false, error: null });

    render(<RinkList />);

    await waitFor(() => {
      expect(screen.getByText('Ice Palace')).toBeInTheDocument();
      expect(screen.getByText('Frozen Arena')).toBeInTheDocument();
    });
  });

  it('renders error message when fetching fails', () => {
    const errorMessage = 'Failed to fetch rinks';
    (useRinks as jest.Mock).mockReturnValue({ rinks: [], isLoading: false, error: errorMessage });

    render(<RinkList />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('displays rink details correctly', async () => {
    (useRinks as jest.Mock).mockReturnValue({ rinks: mockRinks, isLoading: false, error: null });

    render(<RinkList />);

    await waitFor(() => {
      expect(screen.getByText('Ice Palace')).toBeInTheDocument();
      expect(screen.getByText('Downtown')).toBeInTheDocument();
      expect(screen.getByText('Capacity: 100')).toBeInTheDocument();

      expect(screen.getByText('Frozen Arena')).toBeInTheDocument();
      expect(screen.getByText('Uptown')).toBeInTheDocument();
      expect(screen.getByText('Capacity: 150')).toBeInTheDocument();
    });
  });
});

// Human tasks:
// TODO: Implement additional test cases for error handling and edge cases
// TODO: Add integration tests with actual API calls (mocked)