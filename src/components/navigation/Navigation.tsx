import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from '../ThemeToggle';
import { NotificationBell } from '../notifications/NotificationBell';
import { NotificationList } from '../notifications/NotificationList';
import { UserMenu } from './UserMenu';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Don't show navigation on auth pages
  const isAuthPage = ['/login', '/create-account'].includes(location.pathname);
  if (isAuthPage) return null;

  return (
    <nav className="bg-black shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-white">TEZHLY</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/jobs" className="text-sm font-medium text-gray-300 hover:text-button-primary">
              Job Board
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium text-gray-300 hover:text-button-primary">
                  Dashboard
                </Link>
                <NotificationBell onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} />
                <UserMenu onLogout={handleLogout} />
                
                {/* Notifications Dropdown */}
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-background-card rounded-lg shadow-lg overflow-hidden top-16">
                    <NotificationList onClose={() => setIsNotificationsOpen(false)} />
                  </div>
                )}
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-button-primary">
                  Sign In
                </Link>
                <Link to="/create-account" className="text-sm font-medium btn-primary">
                  Create Account
                </Link>
              </>
            )}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {isAuthenticated && <NotificationBell onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} />}
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-2 space-y-1">
            <Link to="/jobs" className="block px-3 py-2 text-sm font-medium text-gray-300 hover:text-button-primary">
              Job Board
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 text-sm font-medium text-gray-300 hover:text-button-primary">
                  Dashboard
                </Link>
                <Link to="/profile" className="block px-3 py-2 text-sm font-medium text-gray-300 hover:text-button-primary">
                  Profile Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-sm font-medium text-red-500"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-sm font-medium text-gray-300 hover:text-button-primary">
                  Sign In
                </Link>
                <Link to="/create-account" className="block px-3 py-2 text-sm font-medium btn-primary">
                  Create Account
                </Link>
              </>
            )}
          </div>
        )}

        {/* Mobile notifications */}
        {isNotificationsOpen && (
          <div className="md:hidden fixed inset-0 z-50 mt-16 bg-white dark:bg-background-dark">
            <div className="p-4">
              <NotificationList onClose={() => setIsNotificationsOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}