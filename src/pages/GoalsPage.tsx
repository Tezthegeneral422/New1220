import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react';
import { useGoals, Goal } from '../hooks/goals/useGoals';
import { SetGoalModal } from '../components/dashboard/widgets/modals/SetGoalModal';

export function GoalsPage() {
  const { goals, updateGoalProgress, deleteGoal } = useGoals();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<string | null>(null);

  const handleProgressUpdate = (goal: Goal, newProgress: number) => {
    updateGoalProgress(goal.id, Math.min(100, Math.max(0, newProgress)));
    setEditingGoal(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-button-primary hover:opacity-80"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Goal
          </button>
        </div>

        <div className="space-y-6">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="bg-white dark:bg-background-card rounded-lg shadow p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {goal.title}
                  </h3>
                  <div className="mt-1 flex items-center space-x-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Due: {new Date(goal.targetDate).toLocaleDateString()}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      Type: {goal.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingGoal(goal.id)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  >
                    <Pencil className="h-5 w-5 text-gray-500" />
                  </button>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  >
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </button>
                </div>
              </div>

              {editingGoal === goal.id ? (
                <div className="space-y-2">
                  <input
                    type="number"
                    value={goal.progress}
                    onChange={(e) => handleProgressUpdate(goal, parseInt(e.target.value))}
                    className="input w-full"
                    min="0"
                    max="100"
                  />
                  <p className="text-xs text-gray-500">Enter progress (0-100)</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-button-primary rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-end">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {goal.progress}% Complete
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <SetGoalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}