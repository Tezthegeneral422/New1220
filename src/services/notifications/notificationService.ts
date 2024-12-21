import { supabase } from '../../lib/supabase';
import type { Database } from '../../types/database';

type Notification = Database['public']['Tables']['user_notifications']['Row'];

export async function getUserNotifications(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    const { data, error } = await supabase
      .from('user_notifications')
      .update({ read: true })
      .eq('id', notificationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
}

export async function deleteNotification(notificationId: string) {
  try {
    const { error } = await supabase
      .from('user_notifications')
      .delete()
      .eq('id', notificationId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
}

export async function createSystemNotification(userId: string, notification: {
  type: string;
  title: string;
  message: string;
}) {
  try {
    const { data, error } = await supabase
      .from('user_notifications')
      .insert({
        user_id: userId,
        type: notification.type,
        title: notification.title,
        message: notification.message,
        read: false
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
}