import React from 'react';
import { Typography, Container, Box } from '@material-ui/core';
import Layout from '../../components/Layout';
import EquipmentList from '../../components/Equipment/EquipmentList';
import useAuth from '../../hooks/useAuth';

const EquipmentPage: React.FC = () => {
  const { isAuthenticated, isAuthorized } = useAuth();

  // Check if the user is authenticated and authorized
  if (!isAuthenticated || !isAuthorized('view_equipment')) {
    return (
      <Layout>
        <Typography variant="h4">Unauthorized</Typography>
        <Typography>You do not have permission to view this page.</Typography>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Equipment Inventory
          </Typography>
          <EquipmentList />
        </Box>
      </Container>
    </Layout>
  );
};

export default EquipmentPage;

// TODO: Implement access control to ensure only authorized users can view the equipment page
// TODO: Add a loading state while fetching equipment data
// TODO: Implement error handling for cases where equipment data cannot be loaded
// TODO: Add unit tests for the EquipmentPage component
// TODO: Consider adding a feature to add new equipment items directly from this page