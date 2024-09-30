import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Box, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';
import { getCurrentUser, updateProfile } from '../lib/api/auth';
import { User } from '../types';

const ProfilePage: React.FC = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<User>();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
        setValue('firstName', userData.firstName);
        setValue('lastName', userData.lastName);
        setValue('email', userData.email);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    };

    if (authUser) {
      fetchUserProfile();
    }
  }, [authUser, setValue]);

  const onSubmit = async (data: User) => {
    setLoading(true);
    try {
      const updatedUser = await updateProfile(data);
      setUser(updatedUser);
      setUpdateSuccess(true);
      setLoading(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box maxWidth={600} margin="auto" padding={3}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        {updateSuccess && (
          <Typography color="success" gutterBottom>
            Profile updated successfully!
          </Typography>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            {...register('firstName', { required: 'First name is required' })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            {...register('lastName', { required: 'Last name is required' })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Update Profile
          </Button>
        </form>
      </Box>
    </Layout>
  );
};

export default ProfilePage;

// TODO: Implement form validation for profile fields
// TODO: Add functionality to change user password
// TODO: Implement profile picture upload functionality
// TODO: Add confirmation modal before saving profile changes
// TODO: Implement error handling for failed profile updates