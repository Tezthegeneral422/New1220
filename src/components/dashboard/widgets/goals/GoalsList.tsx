import React, { useState } from 'react';
import { CheckCircle2, Calendar, ChevronDown, Pencil } from 'lucide-react';
import { useGoals } from '../../../../context/GoalContext';
import { Link } from 'react-router-dom';
import { UpdateProgressModal } from './UpdateProgressModal';
import type { Goal } from '../../../../types/goal';

export function GoalsList() {
  const { goals, updateGoalProgress, deleteGoal } = useGoals();
  const [showAll, setShowAll] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  if (goals.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500 dark:text-gray-400 text-sm">No goals set yet</p>
      </div>
    );
  }

  const displayedGoals = showAll ? goals : goals.slice(0, 4);

  return (
    <div className="space-y-2">
      {displayedGoals.map((goal) => (
        <div
          key={goal.id}
          className="bg-gray-50 dark:bg-background-card rounded-lg p-3 space-y-2"
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white text-sm">{goal.title}</h4>
              <div className="flex items-center space-x-2 mt-1">
                <Calendar className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Due {new Date(goal.targetDate).toLocaleDateString()}
                </span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                {goal.category}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {goal.completed ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <button
                  onClick={() => setSelectedGoal(goal)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <Pencil className="h-3 w-3 text-gray-500" />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-button-primary rounded-full transition-all duration-300"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
            <div className="flex justify-end">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {goal.progress}% Complete
              </span>
            </div>
          </div>
        </div>
      ))}

      {goals.length > 4 && (
        <div className="text-center pt-2">
          {showAll ? (
            <Link 
              to="/goals"
              className="inline-flex items-center text-button-primary hover:opacity-80 text-sm"
            >
              View All Goals
            </Link>
          ) : (
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center text-button-primary hover:opacity-80 text-sm"
            >
              <span>Show More</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
          )}
        </div>
      )}

      {selectedGoal && (
        <UpdateProgressModal
          goal={selectedGoal}
          onClose={() => setSelectedGoal(null)}
          onUpdate={updateGoalProgress}
        />
      )}
    </div>
  );
}