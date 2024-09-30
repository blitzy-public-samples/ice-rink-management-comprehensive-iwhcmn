import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { LoginScreen } from '../../src/screens/LoginScreen';
import { useAuth } from '../../src/hooks/useAuth';
import { theme } from '../../src/styles/theme';

// Mock the useAuth hook
jest.mock('../../src/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

// Mock the navigation
const mockNavigation = {
  navigate: jest.fn(),
};

describe('LoginScreen', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      login: jest.fn(),
      isLoading: false,
      error: null,
    });
  });

  const renderLoginScreen = () => {
    return render(
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <LoginScreen navigation={mockNavigation as any} />
        </ThemeProvider>
      </NavigationContainer>
    );
  };

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = renderLoginScreen();
    
    expect(getByText('Login')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
    expect(getByText('Register')).toBeTruthy();
  });

  it('handles input changes', () => {
    const { getByPlaceholderText } = renderLoginScreen();
    
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });

  it('submits the form with valid inputs', async () => {
    const mockLogin = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: null,
    });

    const { getByPlaceholderText, getByText } = renderLoginScreen();
    
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const signInButton = getByText('Sign In');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('displays an error message when login fails', async () => {
    const mockLogin = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: 'Invalid credentials',
    });

    const { getByText } = renderLoginScreen();
    
    await waitFor(() => {
      expect(getByText('Invalid credentials')).toBeTruthy();
    });
  });

  it('navigates to registration screen when Register button is pressed', () => {
    const { getByText } = renderLoginScreen();
    
    const registerButton = getByText('Register');
    fireEvent.press(registerButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Register');
  });

  // TODO: Implement test cases for form validation
  // TODO: Add test cases for error handling and user feedback
  // TODO: Create test cases for 'Forgot Password' functionality once implemented
  // TODO: Implement test cases for loading indicator behavior
  // TODO: Add test cases for keyboard-avoiding behavior
});