import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  getUserNotifications, 
  markNotificationAsRead, 
  deleteNotification 
} from '../../services/notifications';
import type { Database } from '../../types/database';

type Notification = Database['public']['Tables']['user_notifications']['Row'];

export function useNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function loadNotifications() {
      if (!user?.id) {
        setNotifications([]);
        setIsLoading(false);
        return;
      }

      try {
        setError(null);
        const data = await getUserNotifications(user.id);
        
        if (isMounted) {
          setNotifications(data);
          setUnreadCount(data.filter(n => !n.read).length);
        }
      } catch (err) {
        console.error('Error loading notifications:', err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to load notifications'));
          // Set empty notifications array on error to prevent undefined errors
          setNotifications([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadNotifications();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  const markAsRead = async (notificationId: string) => {
    try {
      const updated = await markNotificationAsRead(notificationId);
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? updated : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  };

  const remove = async (notificationId: string) => {
    try {
      await deleteNotification(notificationId);
      setNotifications(prev => {
        const filtered = prev.filter(n => n.id !== notificationId);
        setUnreadCount(filtered.filter(n => !n.read).length);
        return filtered;
      });
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  };

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    markAsRead,
    remove,
  };
}