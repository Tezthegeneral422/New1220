import React from 'react';
import { Flame } from 'lucide-react';

interface RoutineProgressProps {
  title: string;
  progress: number;
  total: number;
  streak: number;
}

export function RoutineProgress({ title, progress, total, streak }: RoutineProgressProps) {
  const percentage = (progress / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-white">{title}</span>
        <div className="flex items-center space-x-2">
          <Flame className="h-4 w-4 text-orange-500" />
          <span className="text-sm text-gray-500 dark:text-white">{streak} day streak</span>
        </div>
      </div>
      
      <div className="relative">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div
            className="h-2 bg-green-500 dark:bg-green-500 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="absolute right-0 top-2 text-xs text-gray-500 dark:text-gray-400">
          {progress}/{total} completed
        </span>
      </div>
    </div>
  );
}