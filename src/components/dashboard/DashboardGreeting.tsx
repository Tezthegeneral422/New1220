import React from 'react';
import { useProfile } from '../../hooks/auth/useProfile';

export function DashboardGreeting() {
  const { profile } = useProfile();
  const firstName = profile?.first_name || 'there';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {getGreeting()}, {firstName}
      </h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Here's an overview of your progress and activities
      </p>
    </div>
  );
}