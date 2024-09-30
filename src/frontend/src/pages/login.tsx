import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { User } from '../types/user';
import { setAuthToken, isAuthenticated } from '../utils/auth';
import { useAuth } from '../hooks/useAuth';
import { Button, Input } from '../components/common';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check if user is already authenticated and redirect if true
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      const user = await login(email, password);
      setAuthToken(user.token);
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}

          <div>
            <Button type="submit" fullWidth>
              Sign in
            </Button>
          </div>
        </form>
        <div className="text-sm text-center">
          <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Don't have an account? Register here
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// TODO: Implement proper error handling and user feedback for login failures
// TODO: Add form validation for email and password fields
// TODO: Implement remember me functionality
// TODO: Add support for social media login options
// TODO: Ensure the login page is fully responsive and accessible