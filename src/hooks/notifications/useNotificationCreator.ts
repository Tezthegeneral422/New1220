import { useAuth } from '../../context/AuthContext';
import { createSystemNotifications } from '../../services/notifications/notificationService';

export function useNotificationCreator() {
  const { user } = useAuth();

  const createNotification = async (event: {
    type: 'course' | 'goal' | 'skill' | 'routine' | 'job';
    action: string;
    details: string;
  }) => {
    if (!user) return;

    try {
      await createSystemNotifications(user.id, event);
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };

  return { createNotification };
}