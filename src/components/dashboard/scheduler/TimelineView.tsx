import React from 'react';
import { CheckCircle2, Circle, Trash2, Clock } from 'lucide-react';
import type { ScheduleItem } from '../../../types/schedule';

interface TimelineViewProps {
  items: ScheduleItem[];
  onUpdateTask: (taskId: string, updates: Partial<ScheduleItem>) => void;
  onDeleteTask: (taskId: string) => void;
}

const PRIORITY_COLORS = {
  high: 'border-red-500 dark:border-red-400',
  medium: 'border-yellow-500 dark:border-yellow-400',
  low: 'border-green-500 dark:border-green-400'
};

export function TimelineView({ items, onUpdateTask, onDeleteTask }: TimelineViewProps) {
  const sortedItems = [...items].sort((a, b) => {
    return a.time.localeCompare(b.time);
  });

  if (items.length === 0) {
    return (
      <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
        No tasks scheduled for today
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {sortedItems.map((item) => (
        <div
          key={item.id}
          className={`flex items-center justify-between p-3 bg-gray-50 dark:bg-background-card rounded-lg border-l-4 ${PRIORITY_COLORS[item.priority]}`}
        >
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onUpdateTask(item.id, { completed: !item.completed })}
              className={`p-1 rounded-full transition-colors ${
                item.completed ? 'text-green-500' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {item.completed ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>
            
            <div>
              <span className={`text-sm ${
                item.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'
              }`}>
                {item.activity}
              </span>
              <div className="flex items-center mt-1 text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                {item.time}
              </div>
            </div>
          </div>

          <button
            onClick={() => onDeleteTask(item.id)}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}