import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/client/testing';
import LoginPage from '../../pages/login';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/router';

// Mock the useAuth hook
jest.mock('../../hooks/useAuth');
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('LoginPage', () => {
  const mockLogin = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      isAuthenticated: false,
    });
    mockUseRouter.mockReturnValue({
      push: mockPush,
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderLoginPage = () => {
    return render(
      <MockedProvider>
        <LoginPage />
      </MockedProvider>
    );
  };

  it('renders login form', () => {
    renderLoginPage();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    renderLoginPage();
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    await act(async () => {
      fireEvent.click(loginButton);
    });

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('handles login failure', async () => {
    mockLogin.mockRejectedValueOnce(new Error('Invalid credentials'));
    renderLoginPage();
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    await act(async () => {
      fireEvent.click(loginButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('redirects to dashboard if already authenticated', () => {
    mockUseAuth.mockReturnValueOnce({
      login: mockLogin,
      isAuthenticated: true,
    });
    renderLoginPage();
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });

  it('navigates to registration page when signup link is clicked', () => {
    renderLoginPage();
    const signupLink = screen.getByText(/sign up/i);
    fireEvent.click(signupLink);
    expect(mockPush).toHaveBeenCalledWith('/register');
  });
});

// TODO: Implement tests for form validation errors
// TODO: Add tests for 'remember me' functionality once implemented
// TODO: Create tests for social media login options when added