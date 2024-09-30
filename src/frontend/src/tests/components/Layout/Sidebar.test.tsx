import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { jest } from '@jest/globals';
import Sidebar from '../../../components/Layout/Sidebar';
import { routes } from '../../../constants/routes';
import { UserRole } from '../../../types';

// Mock the next/router
jest.mock('next/router', () => require('next-router-mock'));

describe('Sidebar component', () => {
  beforeEach(() => {
    // Reset the mocked router before each test
    mockRouter.setCurrentUrl('/');
  });

  test('renders Sidebar with correct navigation items for admin', () => {
    render(<Sidebar userRole={UserRole.Admin} />);
    
    // Check if all admin navigation items are present
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Bookings')).toBeInTheDocument();
    expect(screen.getByText('Rinks')).toBeInTheDocument();
    expect(screen.getByText('Equipment')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
  });

  test('renders Sidebar with correct navigation items for customer', () => {
    render(<Sidebar userRole={UserRole.Customer} />);
    
    // Check if customer navigation items are present and admin items are not
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Bookings')).toBeInTheDocument();
    expect(screen.getByText('Rinks')).toBeInTheDocument();
    expect(screen.getByText('Equipment')).toBeInTheDocument();
    expect(screen.queryByText('Users')).not.toBeInTheDocument();
    expect(screen.queryByText('Reports')).not.toBeInTheDocument();
  });

  test('highlights active route', () => {
    mockRouter.setCurrentUrl('/bookings');
    render(<Sidebar userRole={UserRole.Customer} />);
    
    const bookingsLink = screen.getByText('Bookings');
    expect(bookingsLink).toHaveClass('active'); // Assuming 'active' class is used for highlighting
  });

  test('navigates to correct route when nav item is clicked', () => {
    render(<Sidebar userRole={UserRole.Customer} />);
    
    const bookingsLink = screen.getByText('Bookings');
    fireEvent.click(bookingsLink);
    
    expect(mockRouter.asPath).toBe('/bookings');
  });

  test('renders Sidebar responsively', () => {
    const { container } = render(<Sidebar userRole={UserRole.Customer} />);
    
    // Check if the Sidebar has a responsive class or style
    expect(container.firstChild).toHaveClass('responsive-sidebar');
  });

  test('toggles mobile menu', () => {
    render(<Sidebar userRole={UserRole.Customer} />);
    
    const menuToggle = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuToggle);
    
    expect(screen.getByRole('navigation')).toHaveClass('open');
  });
});

// Commented list of human tasks
/*
Human tasks:
1. Implement test cases for different user roles and their corresponding navigation items
2. Add test cases for active route highlighting
3. Create test cases for responsive behavior and mobile view
4. Implement test cases for accessibility features
*/