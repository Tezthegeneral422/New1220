import React from 'react';
import { X, Check } from 'lucide-react';
import { useNotifications } from '../../hooks/notifications/useNotifications';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface NotificationListProps {
  onClose: () => void;
}

export function NotificationList({ onClose }: NotificationListProps) {
  const { notifications, isLoading, error, markAsRead, remove } = useNotifications();

  if (isLoading) {
    return (
      <div className="p-4 flex justify-center">
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 dark:text-red-400">Unable to load notifications</p>
        <button 
          onClick={onClose}
          className="mt-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Close
        </button>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        No notifications
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 ${
            !notification.read ? 'bg-gray-50 dark:bg-gray-800/50' : ''
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                {notification.title}
              </h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {notification.message}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                {new Date(notification.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="p-1 text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400"
                >
                  <Check className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => remove(notification.id)}
                className="p-1 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}