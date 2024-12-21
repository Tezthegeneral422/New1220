import React from 'react';
import { useProfile } from '../../../../hooks/auth/useProfile';

interface GreetingSummaryProps {
  focusSkill: string;
}

export function GreetingSummary({ focusSkill }: GreetingSummaryProps) {
  const { profile } = useProfile();
  const firstName = profile?.first_name || 'there';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="bg-gray-50 dark:bg-background-card rounded-lg p-4 border border-gray-100 dark:border-gray-700">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {getGreeting()}, {firstName}!
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        Today's focus: {focusSkill}. Stay consistent!
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 italic">
        Tip: Consistency beats intensity. Keep moving forward.
      </p>
    </div>
  );
}