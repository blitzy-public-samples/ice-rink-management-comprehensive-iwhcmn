import React from 'react';
import { NextPage } from 'next';
import { Grid, Typography, Box } from '@mui/material';
import Layout from '../components/Layout';
import OverviewCard from '../components/Dashboard/OverviewCard';
import RecentBookings from '../components/Dashboard/RecentBookings';
import UpcomingEvents from '../components/Dashboard/UpcomingEvents';
import useBookings from '../hooks/useBookings';
import useRinks from '../hooks/useRinks';
import useEquipment from '../hooks/useEquipment';
import { useAuth } from '../context/AuthContext';

const HomePage: NextPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { bookings, isLoading: isBookingsLoading, error: bookingsError } = useBookings();
  const { rinks, isLoading: isRinksLoading, error: rinksError } = useRinks();
  const { equipment, isLoading: isEquipmentLoading, error: equipmentError } = useEquipment();

  const isLoading = isBookingsLoading || isRinksLoading || isEquipmentLoading;
  const error = bookingsError || rinksError || equipmentError;

  if (!isAuthenticated) {
    // Redirect to login page or show a message
    return (
      <Layout>
        <Typography variant="h4">Please log in to access the dashboard</Typography>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <Typography variant="h5">Loading...</Typography>
        </Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <Typography variant="h5" color="error">Error: {error.message}</Typography>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the Ice Rink Management Dashboard
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <OverviewCard
            totalBookings={bookings.length}
            totalRinks={rinks.length}
            totalEquipment={equipment.length}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <RecentBookings bookings={bookings.slice(0, 5)} />
        </Grid>
        <Grid item xs={12}>
          <UpcomingEvents events={bookings.filter(booking => new Date(booking.startTime) > new Date()).slice(0, 5)} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;

// Human tasks:
// 1. Implement proper error handling and display user-friendly error messages
// 2. Add loading indicators for each section of the dashboard
// 3. Implement responsive design to ensure proper layout on various screen sizes
// 4. Add unit and integration tests for the HomePage component
// 5. Implement data refresh mechanism (e.g., polling or websockets) for real-time updates
// 6. Consider adding user-specific welcome message or personalized content