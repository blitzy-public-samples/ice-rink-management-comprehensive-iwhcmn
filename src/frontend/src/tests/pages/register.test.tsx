import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from '@testing-library/react-hooks';
import { MockedProvider } from '@apollo/client/testing';
import { useRouter } from 'next/router';
import Register from '../../pages/register';
import { registerUser } from '../../lib/api/auth';
import { AuthProvider } from '../../context/AuthContext';

// Mock the next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock the registerUser function
jest.mock('../../lib/api/auth', () => ({
  registerUser: jest.fn(),
}));

describe('Register component', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (registerUser as jest.Mock).mockClear();
  });

  it('renders the registration form', () => {
    render(
      <MockedProvider>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </MockedProvider>
    );

    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('submits the form with valid inputs', async () => {
    (registerUser as jest.Mock).mockResolvedValue({ success: true });

    render(
      <MockedProvider>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /register/i }));
    });

    await waitFor(() => {
      expect(registerUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('displays an error message for invalid inputs', async () => {
    render(
      <MockedProvider>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'not-matching' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /register/i }));
    });

    expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  it('handles registration error', async () => {
    (registerUser as jest.Mock).mockRejectedValue(new Error('Registration failed'));

    render(
      <MockedProvider>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /register/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/registration failed/i)).toBeInTheDocument();
    });
  });
});

// Pending human tasks:
// TODO: Implement test cases for password strength indicator
// TODO: Add test cases for CAPTCHA or anti-bot measures
// TODO: Implement test cases for terms of service and privacy policy checkboxes
// TODO: Add more comprehensive error handling test cases
// TODO: Implement integration tests with actual API calls (using MSW or similar)