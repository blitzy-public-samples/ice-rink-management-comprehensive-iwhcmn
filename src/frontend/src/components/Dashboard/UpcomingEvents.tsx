import React, { useState, useEffect } from 'react';
import { Card, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { Booking, BookingWithDetails } from '../../types/booking';
import { useBookings } from '../../hooks/useBookings';

// Helper function to format the event date and time
const formatEventDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

// Helper function to determine the event type based on the booking details
const getEventType = (booking: BookingWithDetails): string => {
  // This is a placeholder implementation. Adjust according to your actual booking structure
  if (booking.type === 'ice_skating') return 'Ice Skating';
  if (booking.type === 'hockey') return 'Hockey Practice';
  if (booking.type === 'figure_skating') return 'Figure Skating Lesson';
  return 'Other Event';
};

const UpcomingEvents: React.FC = () => {
  const [upcomingBookings, setUpcomingBookings] = useState<BookingWithDetails[]>([]);
  const { getUpcomingBookings, loading, error } = useBookings();

  useEffect(() => {
    const fetchUpcomingBookings = async () => {
      try {
        const bookings = await getUpcomingBookings();
        // Sort bookings by start time
        const sortedBookings = bookings.sort((a, b) => 
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        );
        setUpcomingBookings(sortedBookings);
      } catch (err) {
        console.error('Error fetching upcoming bookings:', err);
      }
    };

    fetchUpcomingBookings();
  }, [getUpcomingBookings]);

  if (loading) {
    return <Typography>Loading upcoming events...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error loading upcoming events. Please try again later.</Typography>;
  }

  return (
    <Card>
      <Typography variant="h6" component="h2" gutterBottom>
        Upcoming Events
      </Typography>
      {upcomingBookings.length === 0 ? (
        <Typography>No upcoming events scheduled.</Typography>
      ) : (
        <List>
          {upcomingBookings.map((booking) => (
            <ListItem key={booking.id} button>
              <ListItemText
                primary={getEventType(booking)}
                secondary={formatEventDate(new Date(booking.startTime))}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Card>
  );
};

export default UpcomingEvents;

// TODO: Implement proper error handling and display error messages to the user
// TODO: Add pagination or 'load more' functionality if the number of upcoming events is large
// TODO: Implement click handling on list items to navigate to detailed event view