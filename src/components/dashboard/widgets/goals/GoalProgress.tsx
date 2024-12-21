import React from 'react';

interface GoalProgressProps {
  progress: number;
}

export function GoalProgress({ progress }: GoalProgressProps) {
  return (
    <div className="space-y-1">
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-button-primary rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-end">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {progress}% Complete
        </span>
      </div>
    </div>
  );
}