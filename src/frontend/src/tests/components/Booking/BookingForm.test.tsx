import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { BookingForm } from '../../../components/Booking/BookingForm';
import { useBookings } from '../../../hooks/useBookings';
import { useRinks } from '../../../hooks/useRinks';
import { useEquipment } from '../../../hooks/useEquipment';
import { useAuth } from '../../../hooks/useAuth';

// Mock the hooks
jest.mock('../../../hooks/useBookings');
jest.mock('../../../hooks/useRinks');
jest.mock('../../../hooks/useEquipment');
jest.mock('../../../hooks/useAuth');

describe('BookingForm', () => {
  // Mock data
  const mockRinks = [
    { id: 1, name: 'Rink 1' },
    { id: 2, name: 'Rink 2' },
  ];
  const mockEquipment = [
    { id: 1, name: 'Skates', available: 10 },
    { id: 2, name: 'Helmet', available: 5 },
  ];
  const mockUser = { id: 1, name: 'John Doe' };

  beforeEach(() => {
    // Set up mock hook returns
    (useBookings as jest.Mock).mockReturnValue({
      createBooking: jest.fn(),
      updateBooking: jest.fn(),
    });
    (useRinks as jest.Mock).mockReturnValue({ rinks: mockRinks });
    (useEquipment as jest.Mock).mockReturnValue({ equipment: mockEquipment });
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
  });

  it('renders the booking form', () => {
    const { getByText, getByLabelText } = render(<BookingForm />);
    
    expect(getByText('Create Booking')).toBeInTheDocument();
    expect(getByLabelText('Select Rink')).toBeInTheDocument();
    expect(getByLabelText('Date')).toBeInTheDocument();
    expect(getByLabelText('Time')).toBeInTheDocument();
    expect(getByLabelText('Duration (hours)')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    const { getByLabelText, getByText } = render(<BookingForm />);
    const createBookingMock = jest.fn();
    (useBookings as jest.Mock).mockReturnValue({ createBooking: createBookingMock });

    await act(async () => {
      fireEvent.change(getByLabelText('Select Rink'), { target: { value: '1' } });
      fireEvent.change(getByLabelText('Date'), { target: { value: '2023-05-01' } });
      fireEvent.change(getByLabelText('Time'), { target: { value: '14:00' } });
      fireEvent.change(getByLabelText('Duration (hours)'), { target: { value: '2' } });
      fireEvent.click(getByText('Submit'));
    });

    await waitFor(() => {
      expect(createBookingMock).toHaveBeenCalledWith({
        rinkId: '1',
        date: '2023-05-01',
        time: '14:00',
        duration: '2',
        userId: 1,
      });
    });
  });

  it('displays validation errors for empty fields', async () => {
    const { getByText } = render(<BookingForm />);

    await act(async () => {
      fireEvent.click(getByText('Submit'));
    });

    await waitFor(() => {
      expect(getByText('Please select a rink')).toBeInTheDocument();
      expect(getByText('Please select a date')).toBeInTheDocument();
      expect(getByText('Please select a time')).toBeInTheDocument();
      expect(getByText('Please enter a duration')).toBeInTheDocument();
    });
  });

  it('allows equipment selection', () => {
    const { getByLabelText } = render(<BookingForm />);
    
    const skatesCheckbox = getByLabelText('Skates') as HTMLInputElement;
    const helmetCheckbox = getByLabelText('Helmet') as HTMLInputElement;

    fireEvent.click(skatesCheckbox);
    fireEvent.click(helmetCheckbox);

    expect(skatesCheckbox.checked).toBe(true);
    expect(helmetCheckbox.checked).toBe(true);
  });

  // Add more tests here for other scenarios, such as:
  // - Updating an existing booking
  // - Handling API errors
  // - Checking real-time availability
  // - Testing responsive design
  // - Accessibility testing
});

// Commented list of human tasks
/*
Human tasks:
1. Implement test cases for all form validation scenarios
2. Add test cases for error handling and error message display
3. Create test cases for real-time availability checking
4. Implement accessibility testing for form elements
5. Add test cases for responsive design and mobile compatibility
*/