import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// TODO: Import actual routes when available
const routes = {
  dashboard: '/dashboard',
  bookings: '/bookings',
  rinks: '/rinks',
  equipment: '/equipment',
  profile: '/profile',
  admin: '/admin',
};

// TODO: Import actual UserRole type when available
type UserRole = 'admin' | 'manager' | 'staff' | 'customer';

interface SidebarProps {
  userRole: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const router = useRouter();

  const getNavItems = (role: UserRole) => {
    const items = [
      { label: 'Dashboard', path: routes.dashboard },
      { label: 'Bookings', path: routes.bookings },
      { label: 'Rinks', path: routes.rinks },
      { label: 'Equipment', path: routes.equipment },
      { label: 'Profile', path: routes.profile },
    ];

    if (role === 'admin' || role === 'manager') {
      items.push({ label: 'Admin', path: routes.admin });
    }

    return items;
  };

  const navItems = getNavItems(userRole);

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h1>Ice Rink Management</h1>
      </div>
      <ul className="sidebar-nav">
        {navItems.map((item) => (
          <li key={item.path} className={router.pathname === item.path ? 'active' : ''}>
            <Link href={item.path}>
              <a>{item.label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;

// TODO: Implement proper styling for the Sidebar component using the project's design system
// TODO: Ensure that the Sidebar component is responsive and works well on mobile devices
// TODO: Add accessibility features such as proper ARIA labels and keyboard navigation
// TODO: Implement logic to show/hide certain navigation items based on user permissions