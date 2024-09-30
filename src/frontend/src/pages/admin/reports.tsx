import React from 'react';
import { Typography } from '@material-ui/core';
import Layout from '../../components/Layout';
import ReportGenerator from '../../components/Admin/ReportGenerator';
import useAuth from '../../hooks/useAuth';

// This is a placeholder for the withAuth decorator
// In a real implementation, this would be a proper Higher Order Component
const withAuth = (Component: React.ComponentType) => (props: any) => {
  const { isAdmin } = useAuth();
  if (!isAdmin) {
    return <Typography>Access Denied. Admin privileges required.</Typography>;
  }
  return <Component {...props} />;
};

const ReportsPage: React.FC = () => {
  const { isAdmin } = useAuth();

  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Reports
      </Typography>
      {isAdmin ? (
        <ReportGenerator />
      ) : (
        <Typography color="error">
          Access Denied. Admin privileges required.
        </Typography>
      )}
    </Layout>
  );
};

export default withAuth(ReportsPage);

// Human tasks:
// TODO: Implement access control to ensure only users with admin privileges can access this page (Critical)
// TODO: Add breadcrumbs for easy navigation within the admin section (Optional)
// TODO: Implement a system to save and display previously generated reports (Optional)