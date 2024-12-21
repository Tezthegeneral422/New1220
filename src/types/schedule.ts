export type Priority = 'low' | 'medium' | 'high';

export interface ScheduleItem {
  id: string;
  activity: string;
  time: string;
  priority: Priority;
  completed: boolean;
}