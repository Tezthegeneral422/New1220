import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../hooks/auth/useProfile';
import { ThemeToggle } from './ThemeToggle';
import { NotificationBell } from './notifications/NotificationBell';
import { NotificationList } from './notifications/NotificationList';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, signOut } = useAuth();
  const { profile } = useProfile();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isAuthPage = ['/login', '/create-account'].includes(location.pathname);
  if (isAuthPage) return null;

  return (
    <header className="bg-black shadow-sm transition-colors">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-white">TEZHLY</span>
            </Link>
          </div>

          {/* Right side */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/jobs" className="text-xs font-bold text-gray-300 hover:text-button-primary">
              Job Board
            </Link>

            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-xs font-bold text-gray-300 hover:text-button-primary"
                >
                  Dashboard
                </Link>
                <div className="relative">
                  <NotificationBell 
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} 
                  />
                  {isNotificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-background-card rounded-lg shadow-lg overflow-hidden">
                      <NotificationList onClose={() => setIsNotificationsOpen(false)} />
                    </div>
                  )}
                </div>
                <div className="relative group">
                  <button className="flex items-center text-xs font-bold text-gray-300 hover:text-button-primary">
                    <User className="h-4 w-4 mr-1" />
                    {profile?.first_name || 'Account'}
                  </button>
                  <div className="absolute right-0 w-48 py-2 mt-2 bg-white dark:bg-background-card rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
                <ThemeToggle />
              </>
            ) : (
              <>
                <button 
                  onClick={() => navigate('/login')}
                  className="text-xs font-bold text-gray-300 hover:text-button-primary px-4 py-2 rounded-md"
                >
                  Sign In
                </button>
                <Link 
                  to="/create-account" 
                  className="text-xs font-bold btn-primary"
                >
                  Create Account
                </Link>
                <ThemeToggle />
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {isAuthenticated && (
              <NotificationBell 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} 
              />
            )}
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile notifications */}
        {isNotificationsOpen && (
          <div className="md:hidden fixed inset-0 z-50 mt-16 bg-white dark:bg-background-dark">
            <div className="p-4">
              <NotificationList onClose={() => setIsNotificationsOpen(false)} />
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/jobs"
                className="block px-3 py-2 text-xs font-bold text-gray-300 hover:text-button-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Job Board
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-xs font-bold text-gray-300 hover:text-button-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-xs font-bold text-gray-300 hover:text-button-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-xs font-bold text-red-500 hover:text-red-400"
                  >
                    <span className="flex items-center">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-xs font-bold text-gray-300 hover:text-button-primary"
                  >
                    Sign In
                  </button>
                  <div className="px-3 py-2">
                    <Link
                      to="/create-account"
                      className="block w-full text-xs font-bold btn-primary text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Create Account
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}