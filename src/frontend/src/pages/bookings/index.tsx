import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { Typography, Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import BookingList from '../../components/Booking/BookingList';
import useAuth from '../../hooks/useAuth';

const BookingsPage: NextPage = () => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  const handleCreateBooking = () => {
    router.push('/bookings/create');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Bookings
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateBooking}
        style={{ marginBottom: '1rem' }}
      >
        Create New Booking
      </Button>
      <BookingList />
    </Layout>
  );
};

export default BookingsPage;

// Human tasks:
// TODO: Implement proper error handling for authentication failures
// TODO: Add loading state while checking authentication
// TODO: Implement unit and integration tests for the BookingsPage component
// TODO: Add meta tags for SEO optimization