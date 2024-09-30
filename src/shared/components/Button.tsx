import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

// Define the ButtonProps interface
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

// Create the styled component for the button
const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.fonts.primary};
  font-weight: ${theme.fontWeights.medium};
  border-radius: ${theme.borderRadius.medium};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  /* Variant styles */
  ${({ variant }) => {
    switch (variant) {
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.white};
          &:hover {
            background-color: ${theme.colors.secondaryDark};
          }
        `;
      case 'tertiary':
        return `
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary};
          &:hover {
            background-color: ${theme.colors.primaryLight};
          }
        `;
      default:
        return `
          background-color: ${theme.colors.primary};
          color: ${theme.colors.white};
          &:hover {
            background-color: ${theme.colors.primaryDark};
          }
        `;
    }
  }}

  /* Size styles */
  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          font-size: ${theme.fontSizes.sm};
        `;
      case 'large':
        return `
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: ${theme.fontSizes.lg};
        `;
      default:
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.fontSizes.md};
        `;
    }
  }}

  /* Full width style */
  ${({ fullWidth }) => fullWidth && `
    width: 100%;
  `}

  /* Disabled style */
  ${({ disabled }) => disabled && `
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background-color: ${theme.colors.primary};
    }
  `}
`;

// Create the Button component
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;