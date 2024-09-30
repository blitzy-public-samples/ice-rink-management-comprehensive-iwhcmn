import React from 'react';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { theme } from '../styles/theme';

interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  required?: boolean;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
  },
}));

const Input: React.FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
  error = false,
  helperText = '',
  fullWidth = false,
  required = false,
}) => {
  return (
    <StyledTextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      fullWidth={fullWidth}
      required={required}
      variant="outlined"
    />
  );
};

export default Input;

// Human tasks:
// - Review the component props and ensure they cover all necessary use cases
// - Implement unit tests for the Input component
// - Consider adding additional variants or sizes for the Input component