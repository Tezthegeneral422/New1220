import React from 'react';
import { Percent } from 'lucide-react';

interface MatchIndicatorProps {
  percentage: number;
}

export function MatchIndicator({ percentage }: MatchIndicatorProps) {
  const getColorClass = (percent: number) => {
    if (percent >= 80) return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-300';
    if (percent >= 60) return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300';
    if (percent >= 40) return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-300';
    return 'text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-300';
  };

  return (
    <div className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full ${getColorClass(percentage)}`}>
      <Percent className="h-3 w-3" />
      <span className="text-xs font-medium">{percentage}% Match</span>
    </div>
  );
}