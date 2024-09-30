import React from 'react';
import styled from 'styled-components';
import { Booking } from '../../types/booking';
import { useBookings } from '../../hooks/useBookings';

const RecentBookingsContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
`;

const BookingList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const BookingItem = styled.li`
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  &:last-child {
    border-bottom: none;
  }
`;

const BookingInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BookingDate = styled.span`
  font-weight: bold;
`;

const BookingTime = styled.span`
  color: #666;
`;

const BookingRink = styled.span`
  color: #0066cc;
`;

const BookingStatus = styled.span<{ status: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  color: #fff;
  background-color: ${({ status }) => {
    switch (status) {
      case 'confirmed':
        return '#28a745';
      case 'pending':
        return '#ffc107';
      case 'cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  }};
`;

const NoBookingsMessage = styled.p`
  color: #666;
  font-style: italic;
`;

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const RecentBookings: React.FC = () => {
  const { bookings, loading, error } = useBookings();

  if (loading) {
    return <div>Loading recent bookings...</div>;
  }

  if (error) {
    return <div>Error loading recent bookings: {error.message}</div>;
  }

  const recentBookings = bookings.slice(0, 5); // Display only the 5 most recent bookings

  return (
    <RecentBookingsContainer>
      <Title>Recent Bookings</Title>
      {recentBookings.length > 0 ? (
        <BookingList>
          {recentBookings.map((booking: Booking) => (
            <BookingItem key={booking.id}>
              <BookingInfo>
                <div>
                  <BookingDate>{formatDate(new Date(booking.startTime))}</BookingDate>
                  <BookingTime> {formatTime(new Date(booking.startTime))}</BookingTime>
                </div>
                <BookingRink>{booking.rink.name}</BookingRink>
                <BookingStatus status={booking.status}>{booking.status}</BookingStatus>
              </BookingInfo>
            </BookingItem>
          ))}
        </BookingList>
      ) : (
        <NoBookingsMessage>No recent bookings found.</NoBookingsMessage>
      )}
    </RecentBookingsContainer>
  );
};

export default RecentBookings;

// Human tasks:
// 1. Implement error handling for failed API requests in the useBookings hook (Required)
// 2. Add pagination or 'load more' functionality if the number of recent bookings becomes large (Optional)
// 3. Implement click functionality to navigate to the full booking details (Required)