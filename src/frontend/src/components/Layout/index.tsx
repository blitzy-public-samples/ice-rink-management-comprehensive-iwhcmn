import React from 'react';
import { Box, Container } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {isAuthenticated && <Sidebar />}
        <Container component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;

// Human tasks:
// TODO: Implement responsive design to ensure proper layout on various screen sizes
// TODO: Add error boundary to handle potential errors in child components
// TODO: Implement loading state for authentication check to prevent layout flicker
// TODO: Consider adding a context provider for managing layout-related state (e.g., sidebar open/closed)