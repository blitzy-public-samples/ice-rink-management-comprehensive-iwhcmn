import React from 'react';
import { NextPage } from 'next';
import { Typography } from '@material-ui/core';
import AdminLayout from '../../components/Layout/AdminLayout';
import EquipmentManagement from '../../components/Admin/EquipmentManagement';
import withAuth from '../../utils/auth';

const EquipmentPage: NextPage = () => {
  return (
    <AdminLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Equipment Management
      </Typography>
      <EquipmentManagement />
    </AdminLayout>
  );
};

export default withAuth(EquipmentPage);

// TODO: Implement the following tasks:
// - Add breadcrumb navigation for better user experience (Optional)
// - Implement loading state while fetching equipment data (Required)
// - Implement error handling and display error messages to the user (Required)
// - Add unit tests for the EquipmentPage component (Required)
// - Ensure proper SEO meta tags are added for the Equipment Management page (Optional)