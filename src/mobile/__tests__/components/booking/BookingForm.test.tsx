import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { BookingForm } from '../../../src/components/booking/BookingForm';
import { CreateBookingInputType, UpdateBookingInputType } from '../../../src/types/booking';
import { validateBookingDate, validateBookingDuration, validateEquipmentQuantity } from '../../../src/utils/validation';

// Mock the validation functions
jest.mock('../../../src/utils/validation', () => ({
  validateBookingDate: jest.fn(),
  validateBookingDuration: jest.fn(),
  validateEquipmentQuantity: jest.fn(),
}));

describe('BookingForm', () => {
  const mockOnSubmit = jest.fn();
  const defaultProps = {
    onSubmit: mockOnSubmit,
    initialValues: {} as CreateBookingInputType | UpdateBookingInputType,
  };

  const renderBookingForm = (props = {}) => {
    const mergedProps = { ...defaultProps, ...props };
    return render(<BookingForm {...mergedProps} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = renderBookingForm();
    
    expect(getByText('Book Ice Time')).toBeTruthy();
    expect(getByPlaceholderText('Select Date')).toBeTruthy();
    expect(getByPlaceholderText('Select Time')).toBeTruthy();
    expect(getByPlaceholderText('Duration (hours)')).toBeTruthy();
    expect(getByText('Select Equipment')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();
  });

  it('submits the form with valid data', async () => {
    const { getByPlaceholderText, getByText } = renderBookingForm();

    fireEvent.changeText(getByPlaceholderText('Select Date'), '2023-07-01');
    fireEvent.changeText(getByPlaceholderText('Select Time'), '14:00');
    fireEvent.changeText(getByPlaceholderText('Duration (hours)'), '2');

    fireEvent.press(getByText('Submit'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        date: '2023-07-01',
        time: '14:00',
        duration: '2',
        equipment: [],
      });
    });
  });

  it('displays validation errors for invalid input', async () => {
    const { getByPlaceholderText, getByText } = renderBookingForm();

    fireEvent.changeText(getByPlaceholderText('Select Date'), 'invalid-date');
    fireEvent.changeText(getByPlaceholderText('Duration (hours)'), '-1');

    fireEvent.press(getByText('Submit'));

    await waitFor(() => {
      expect(getByText('Invalid date')).toBeTruthy();
      expect(getByText('Duration must be a positive number')).toBeTruthy();
    });
  });

  it('updates form fields correctly', () => {
    const { getByPlaceholderText } = renderBookingForm();

    fireEvent.changeText(getByPlaceholderText('Select Date'), '2023-07-01');
    fireEvent.changeText(getByPlaceholderText('Select Time'), '15:30');
    fireEvent.changeText(getByPlaceholderText('Duration (hours)'), '1.5');

    expect(getByPlaceholderText('Select Date').props.value).toBe('2023-07-01');
    expect(getByPlaceholderText('Select Time').props.value).toBe('15:30');
    expect(getByPlaceholderText('Duration (hours)').props.value).toBe('1.5');
  });

  it('handles date and time selection correctly', () => {
    const { getByPlaceholderText } = renderBookingForm();

    fireEvent(getByPlaceholderText('Select Date'), 'onDateChange', new Date('2023-07-01'));
    fireEvent(getByPlaceholderText('Select Time'), 'onTimeChange', new Date('2023-07-01T16:00:00'));

    expect(getByPlaceholderText('Select Date').props.value).toBe('2023-07-01');
    expect(getByPlaceholderText('Select Time').props.value).toBe('16:00');
  });

  it('integrates with equipment selection correctly', () => {
    const { getByText, getAllByText } = renderBookingForm();

    fireEvent.press(getByText('Select Equipment'));
    fireEvent.press(getAllByText('Skates')[0]);
    fireEvent.press(getAllByText('Helmet')[0]);

    expect(getAllByText('Skates')[0].props.selected).toBeTruthy();
    expect(getAllByText('Helmet')[0].props.selected).toBeTruthy();
  });
});

// Commented list of human tasks
/*
Human tasks:
1. Implement comprehensive test cases covering all possible scenarios and edge cases (Required)
2. Add tests for accessibility features of the BookingForm component (Required)
3. Create mock data for testing various booking scenarios (Required)
4. Implement performance tests for the BookingForm component (Optional)
*/