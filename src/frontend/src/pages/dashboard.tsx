import React from 'react';
import { NextPage } from 'next';
import { Grid, Typography, Box } from '@mui/material';
import Layout from '../components/Layout';
import OverviewCard from '../components/Dashboard/OverviewCard';
import RecentBookings from '../components/Dashboard/RecentBookings';
import UpcomingEvents from '../components/Dashboard/UpcomingEvents';
import useAuth from '../hooks/useAuth';
import useBookings from '../hooks/useBookings';
import useRinks from '../hooks/useRinks';
import useEquipment from '../hooks/useEquipment';

const Dashboard: NextPage = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { bookings, isLoading: bookingsLoading } = useBookings();
  const { rinks, isLoading: rinksLoading } = useRinks();
  const { equipment, isLoading: equipmentLoading } = useEquipment();

  if (authLoading || bookingsLoading || rinksLoading || equipmentLoading) {
    return <Box>Loading...</Box>;
  }

  if (!isAuthenticated) {
    // Redirect to login page or show an error message
    return <Box>Please log in to view the dashboard.</Box>;
  }

  const metrics = {
    totalBookings: bookings.length,
    totalRinks: rinks.length,
    totalEquipment: equipment.length,
    // Add more metrics as needed
  };

  return (
    <Layout>
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.firstName}!
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <OverviewCard metrics={metrics} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RecentBookings bookings={bookings.slice(0, 5)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <UpcomingEvents events={bookings.filter(booking => new Date(booking.startTime) > new Date()).slice(0, 5)} />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Dashboard;

// Human tasks:
// TODO: Implement server-side rendering (SSR) or static site generation (SSG) for improved performance
// TODO: Add data refresh functionality to update dashboard information periodically
// TODO: Implement user-specific dashboard views based on roles (e.g., admin, staff, customer)
// TODO: Add accessibility features to ensure the dashboard is usable by all users
// TODO: Implement analytics tracking for dashboard usage and interactions