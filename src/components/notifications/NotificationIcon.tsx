import React from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../../hooks/notifications/useNotifications';

interface NotificationIconProps {
  onClick: () => void;
}

export function NotificationIcon({ onClick }: NotificationIconProps) {
  const { unreadCount } = useNotifications();

  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  );
}