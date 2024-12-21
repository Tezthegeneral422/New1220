import React from 'react';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDailyRoutine } from '../../../hooks/routines/useDailyRoutine';
import { GreetingSummary } from './sections/GreetingSummary';
import { PriorityTasks } from './sections/PriorityTasks';

export function DailyRoutineWidget() {
  const { routineData, completeTask } = useDailyRoutine();

  return (
    <div className="p-6 space-y-6 border border-white dark:border-gray-700 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-button-primary" />
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">Daily Routine</h2>
        </div>
        <Link 
          to="/daily-routine"
          className="text-button-primary hover:opacity-80 text-sm font-medium"
        >
          View Full Routine
        </Link>
      </div>

      <div className="space-y-6">
        <GreetingSummary focusSkill={routineData.skillProgress.skill} />
        <PriorityTasks 
          tasks={routineData.priorityTasks} 
          onComplete={completeTask} 
        />
      </div>
    </div>
  );
}