import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Booking, BookingWithDetails, UpdateBookingDTO } from '../../types/booking';
import { useBookings } from '../../hooks/useBookings';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { LoadingSpinner } from '../common/LoadingSpinner';

const BookingDetails: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [booking, setBooking] = useState<BookingWithDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { getBookingDetails, updateBooking, cancelBooking } = useBookings();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        const details = await getBookingDetails(bookingId);
        setBooking(details);
        setError(null);
      } catch (err) {
        setError('Failed to fetch booking details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId, getBookingDetails]);

  const handleUpdateBooking = async (updatedData: UpdateBookingDTO) => {
    try {
      setLoading(true);
      const updatedBooking = await updateBooking(bookingId, updatedData);
      setBooking(updatedBooking);
      setError(null);
    } catch (err) {
      setError('Failed to update booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    try {
      setLoading(true);
      await cancelBooking(bookingId);
      setBooking((prevBooking) => prevBooking ? { ...prevBooking, status: 'cancelled' } : null);
      setError(null);
    } catch (err) {
      setError('Failed to cancel booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!booking) {
    return <div className="not-found">Booking not found</div>;
  }

  return (
    <Card>
      <h2>Booking Details</h2>
      <div className="booking-info">
        <p><strong>User:</strong> {booking.user.firstName} {booking.user.lastName}</p>
        <p><strong>Rink:</strong> {booking.rink.name}</p>
        <p><strong>Date:</strong> {format(new Date(booking.startTime), 'MMMM d, yyyy')}</p>
        <p><strong>Time:</strong> {format(new Date(booking.startTime), 'h:mm a')} - {format(new Date(booking.endTime), 'h:mm a')}</p>
        <p><strong>Status:</strong> {booking.status}</p>
        <p><strong>Total Price:</strong> ${booking.totalPrice.toFixed(2)}</p>
      </div>

      {booking.equipmentRentals && booking.equipmentRentals.length > 0 && (
        <div className="equipment-rentals">
          <h3>Equipment Rentals</h3>
          <ul>
            {booking.equipmentRentals.map((rental, index) => (
              <li key={index}>{rental.equipment.name} - Quantity: {rental.quantity}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="booking-actions">
        <Button onClick={() => handleUpdateBooking({ /* Add update data here */ })}>
          Update Booking
        </Button>
        <Button onClick={handleCancelBooking} variant="danger">
          Cancel Booking
        </Button>
      </div>
    </Card>
  );
};

export default BookingDetails;
```

This implementation of the BookingDetails component follows the specifications provided in the JSON representation. Here's a breakdown of the key features:

1. The component uses React hooks (useState, useEffect) to manage state and side effects.
2. It fetches booking details using the `useBookings` hook when the component mounts.
3. Loading state and error handling are implemented.
4. The component displays detailed information about the booking, including user info, rink info, time slot, status, and total price.
5. Equipment rentals associated with the booking are displayed if available.
6. Update and cancel buttons are provided with appropriate handlers.

Please note that this implementation makes some assumptions about the structure of the `Booking`, `BookingWithDetails`, and `UpdateBookingDTO` types, as well as the `useBookings` hook. You may need to adjust these based on your actual implementations.

Here are the pending human tasks as comments:

```typescript
// TODO: Implement proper error handling for API calls
// TODO: Add confirmation modal before cancelling a booking
// TODO: Implement edit functionality for updating booking details
// TODO: Add accessibility attributes to improve component usability
// TODO: Implement unit tests for the BookingDetails component