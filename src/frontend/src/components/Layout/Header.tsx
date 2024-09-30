import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { logout } from '../../lib/redux/slices/authSlice';
import { UserState } from '../../types/user';

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const user = useSelector((state: { auth: UserState }) => state.auth.user);

  const handleLogout = () => {
    try {
      dispatch(logout());
      // Additional logout logic if needed
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout error (e.g., show error message to user)
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Ice Rink Management
        </Typography>
        {isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/bookings">
              Bookings
            </Button>
            <Button color="inherit" component={Link} to="/rinks">
              Rinks
            </Button>
            <Button color="inherit" component={Link} to="/equipment">
              Equipment
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

// TODO: Implement responsive design for mobile devices
// TODO: Add accessibility attributes to improve navigation for screen readers
// TODO: Implement proper error handling for logout process
// TODO: Consider adding a user profile menu or dropdown for authenticated users