import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import type { Task } from '../../../../types/routine';

interface PriorityTasksProps {
  tasks: Task[];
  onComplete: (taskId: string) => void;
}

export function PriorityTasks({ tasks, onComplete }: PriorityTasksProps) {
  return (
    <div className="bg-gray-50 dark:bg-background-card rounded-lg p-4 border border-gray-100 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Today's Focus</h3>
      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onComplete(task.id)}
                className={`
                  p-1 rounded-full transition-colors
                  ${task.completed ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}
                `}
              >
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </button>
              <span className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                {task.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}