import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../components/Layout';
import UserManagement from '../../components/Admin/UserManagement';
import { useAuth } from '../../hooks/useAuth';
import { withAdminAuth } from '../../utils/auth';

const UsersPage: NextPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Unauthorized access</div>;
  }

  return (
    <Layout>
      <Head>
        <title>User Management - Ice Rink Admin</title>
        <meta name="description" content="Admin page for user management in the Ice Rink Management and Booking System" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">User Management</h1>
        <UserManagement />
      </div>
    </Layout>
  );
};

export default withAdminAuth(UsersPage);

// Human tasks:
// TODO: Implement proper error handling for authentication failures
// TODO: Add loading state while checking authentication
// TODO: Implement breadcrumb navigation for better user experience
// TODO: Ensure responsive design for various screen sizes