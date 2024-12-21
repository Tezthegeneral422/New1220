import React from 'react';
import { Sun } from 'lucide-react';
import type { Task } from '../../../../types/routine';

interface MorningCheckInProps {
  tasks: Task[];
}

export function MorningCheckIn({ tasks }: MorningCheckInProps) {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-3">
        <Sun className="h-5 w-5 text-amber-500" />
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Morning Check-In</h3>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Welcome to your day! Here's what's planned:
        </p>
        <ul className="text-sm space-y-1">
          {tasks.map((task, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="w-1 h-1 bg-amber-500 rounded-full" />
              <span className="text-gray-700 dark:text-gray-300">{task.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}