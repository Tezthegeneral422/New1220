import React from 'react';
import { Brain, Clock } from 'lucide-react';
import type { DailyChallenge } from '../../../../types/routine';

interface SkillChallengeProps {
  challenge: DailyChallenge;
  onComplete: () => void;
}

export function SkillChallenge({ challenge, onComplete }: SkillChallengeProps) {
  return (
    <div className="bg-gray-50 dark:bg-background-card rounded-lg p-4 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-button-primary" />
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Daily Challenge</h3>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-xs text-gray-500">{challenge.timeEstimate}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">{challenge.title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{challenge.description}</p>
        </div>

        <button
          onClick={onComplete}
          disabled={challenge.completed}
          className={`w-full px-3 py-2 text-xs font-medium rounded-md transition-colors ${
            challenge.completed
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 cursor-not-allowed'
              : 'bg-button-primary text-black hover:opacity-90'
          }`}
        >
          {challenge.completed ? 'Completed!' : 'Complete Challenge'}
        </button>
      </div>
    </div>
  );
}