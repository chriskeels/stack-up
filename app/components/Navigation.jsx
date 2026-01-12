'use client';

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/app/context/AuthContext';

const Navigation = () => {
  const { token, logout } = useContext(AuthContext);
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  React.useEffect(() => {
    // Check if user is admin by decoding token
    if (token) {
      try {
        const tokenParts = token.split('.');
        if (tokenParts.length === 3) {
          const decoded = JSON.parse(atob(tokenParts[1]));
          const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'rob@launchpadphilly.org';
          setIsAdmin(decoded.email === adminEmail);
        }
      } catch (e) {
        setIsAdmin(false);
      }
    }
  }, [token]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!token) return null;

  return (
    <nav className="nav-bar">
      <div className="nav-content">
        <Link href="/dashboard" className="nav-brand">
          Stack Up
        </Link>
        <div className="nav-links">
          <Link href="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link href="/transactions" className="nav-link">
            Transactions
          </Link>
          <Link href="/goals" className="nav-link">
            Goals
          </Link>
          {isAdmin && (
            <Link href="/rubric-evidence" className="nav-link" style={{ color: '#ff7ad5', fontWeight: 600 }}>
              Evidence
            </Link>
          )}
          <button onClick={handleLogout} className="nav-logout">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
