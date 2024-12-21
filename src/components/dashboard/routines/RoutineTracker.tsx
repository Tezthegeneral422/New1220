import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { RoutineProgress } from './RoutineProgress';
import { useRoutineCompletion } from '../../../hooks/useRoutineCompletion';

export function RoutineTracker() {
  const { routines, completeAllRoutines } = useRoutineCompletion();
  const allCompleted = routines.every(routine => routine.completed);

  return (
    <div className="p-6">
      <Toaster position="top-right" />
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Daily Routines</h2>
        <Link 
          to="/calendar"
          className="text-button-primary hover:opacity-80 flex items-center space-x-1"
        >
          <Calendar className="h-5 w-5" />
          <span>View Calendar</span>
        </Link>
      </div>
      
      <div className="space-y-4">
        {routines.map(routine => (
          <RoutineProgress
            key={routine.id}
            title={routine.title}
            progress={routine.completed ? 1 : 0}
            total={1}
            streak={7}
          />
        ))}
      </div>

      <button 
        onClick={completeAllRoutines}
        disabled={allCompleted}
        className={`
          mt-6 w-full flex items-center justify-center px-4 py-2 rounded-md 
          shadow-sm text-sm font-medium transition-colors
          ${allCompleted 
            ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 cursor-not-allowed'
            : 'bg-button-primary text-black hover:opacity-90'
          }
        `}
      >
        <CheckCircle2 className="h-5 w-5 mr-2" />
        {allCompleted ? 'All Routines Completed!' : 'Complete Today\'s Routines'}
      </button>
    </div>
  );
}