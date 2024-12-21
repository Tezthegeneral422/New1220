import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

type Notification = Database['public']['Tables']['user_notifications']['Row'];
type NotificationInsert = Database['public']['Tables']['user_notifications']['Insert'];

export async function getUserNotifications(userId: string) {
  const { data, error } = await supabase
    .from('user_notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Notification[];
}

export async function markNotificationAsRead(notificationId: string) {
  const { data, error } = await supabase
    .from('user_notifications')
    .update({ read: true })
    .eq('id', notificationId)
    .select()
    .single();

  if (error) throw error;
  return data as Notification;
}

export async function createNotification(notification: NotificationInsert) {
  const { data, error } = await supabase
    .from('user_notifications')
    .insert(notification)
    .select()
    .single();

  if (error) throw error;
  return data as Notification;
}

export async function deleteNotification(notificationId: string) {
  const { error } = await supabase
    .from('user_notifications')
    .delete()
    .eq('id', notificationId);

  if (error) throw error;
}