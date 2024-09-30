import React from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import BookingDetails from '../../components/Booking/BookingDetails';
import useBookings from '../../hooks/useBookings';
import Layout from '../../components/Layout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const BookingDetailsPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { booking, isLoading, error } = useBookings(id as string);

  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <ErrorMessage message={error.message} />
      </Layout>
    );
  }

  return (
    <Layout>
      {booking ? (
        <BookingDetails booking={booking} />
      ) : (
        <ErrorMessage message="Booking not found" />
      )}
    </Layout>
  );
};

export default BookingDetailsPage;

// TODO: Implement SEO optimization for the booking details page
// TODO: Add breadcrumb navigation for better user experience
// TODO: Implement print functionality for booking details
// TODO: Add schema markup for better search engine understanding