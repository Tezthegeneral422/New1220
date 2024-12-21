import React, { useState } from 'react';
import { Target, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoalsList } from './GoalsList';
import { SetGoalModal } from '../modals/SetGoalModal';

export function GoalsWidget() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-button-primary" />
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">Goals</h2>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to="/goals"
            className="text-button-primary hover:opacity-80 text-sm font-medium flex items-center"
          >
            See All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <Plus className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <GoalsList />

      <SetGoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}