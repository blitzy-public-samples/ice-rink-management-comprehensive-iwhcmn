import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import Layout from '../components/Layout';
import { setAuthToken, isAuthenticated } from '../utils/auth';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../lib/api/auth';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { updateAuth } = useAuth();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic form validation
    if (!email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await registerUser(email, password);
      if (response.token) {
        setAuthToken(response.token);
        updateAuth(true);
        router.push('/dashboard');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
      console.error('Registration error:', err);
    }
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default Register;

// TODO: Implement proper form validation with error messages
// TODO: Add password strength indicator
// TODO: Implement CAPTCHA or other anti-bot measures
// TODO: Add terms of service and privacy policy checkboxes
// TODO: Implement proper error handling for API calls
// TODO: Add unit and integration tests for the Register component