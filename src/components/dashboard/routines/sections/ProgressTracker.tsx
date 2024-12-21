import React from 'react';
import { Trophy } from 'lucide-react';
import type { SkillProgress } from '../../../../types/routine';

interface ProgressTrackerProps {
  progress: SkillProgress;
}

export function ProgressTracker({ progress }: ProgressTrackerProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-indigo-500" />
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Skill Progress</h3>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
            {progress.daysStreak} day streak
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-700 dark:text-gray-300">{progress.skill}</span>
          <span className="font-medium text-gray-900 dark:text-white">{progress.progress}%</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-300"
            style={{ width: `${progress.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}