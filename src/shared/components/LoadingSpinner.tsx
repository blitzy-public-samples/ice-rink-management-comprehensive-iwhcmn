import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// Create a styled Box component for centering the spinner
const SpinnerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  // Add any additional styling based on the theme if needed
}));

interface LoadingSpinnerProps {
  size?: string | number;
  color?: string;
}

/**
 * A functional component that renders a centered loading spinner.
 * @param {string | number} size - The size of the spinner (default: 40)
 * @param {string} color - The color of the spinner (default: 'primary')
 * @returns {JSX.Element} A React component rendering the loading spinner
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 40, color = 'primary' }) => {
  return (
    <SpinnerContainer>
      <CircularProgress size={size} color={color as any} />
    </SpinnerContainer>
  );
};

export default LoadingSpinner;