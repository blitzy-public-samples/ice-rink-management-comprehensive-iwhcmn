import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { EquipmentList } from '../../../components/Equipment/EquipmentList';
import { useEquipment } from '../../../hooks/useEquipment';
import { Equipment } from '../../../types/equipment';

// Mock the useEquipment hook
jest.mock('../../../hooks/useEquipment');

describe('EquipmentList component', () => {
  const mockEquipment: Equipment[] = [
    { id: '1', name: 'Skates', type: 'Footwear', quantity: 10, status: 'Available' },
    { id: '2', name: 'Helmet', type: 'Safety', quantity: 5, status: 'Available' },
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    jest.resetAllMocks();
  });

  it('renders the equipment list correctly', async () => {
    (useEquipment as jest.Mock).mockReturnValue({
      equipment: mockEquipment,
      loading: false,
      error: null,
    });

    render(<EquipmentList />);

    await waitFor(() => {
      expect(screen.getByText('Skates')).toBeInTheDocument();
      expect(screen.getByText('Helmet')).toBeInTheDocument();
    });
  });

  it('displays loading state', () => {
    (useEquipment as jest.Mock).mockReturnValue({
      equipment: [],
      loading: true,
      error: null,
    });

    render(<EquipmentList />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error message when loading fails', () => {
    const errorMessage = 'Failed to load equipment';
    (useEquipment as jest.Mock).mockReturnValue({
      equipment: [],
      loading: false,
      error: new Error(errorMessage),
    });

    render(<EquipmentList />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('allows filtering equipment by type', async () => {
    (useEquipment as jest.Mock).mockReturnValue({
      equipment: mockEquipment,
      loading: false,
      error: null,
    });

    render(<EquipmentList />);

    // Assuming there's a filter input
    const filterInput = screen.getByPlaceholderText('Filter by type');
    fireEvent.change(filterInput, { target: { value: 'Footwear' } });

    await waitFor(() => {
      expect(screen.getByText('Skates')).toBeInTheDocument();
      expect(screen.queryByText('Helmet')).not.toBeInTheDocument();
    });
  });

  it('allows sorting equipment by name', async () => {
    (useEquipment as jest.Mock).mockReturnValue({
      equipment: mockEquipment,
      loading: false,
      error: null,
    });

    render(<EquipmentList />);

    // Assuming there's a sort button
    const sortButton = screen.getByText('Sort by Name');
    fireEvent.click(sortButton);

    await waitFor(() => {
      const equipmentItems = screen.getAllByRole('listitem');
      expect(equipmentItems[0]).toHaveTextContent('Helmet');
      expect(equipmentItems[1]).toHaveTextContent('Skates');
    });
  });
});