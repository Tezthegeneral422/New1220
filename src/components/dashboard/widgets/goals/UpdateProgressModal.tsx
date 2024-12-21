import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Goal } from '../../../../types/goal';

interface UpdateProgressModalProps {
  goal: Goal;
  onClose: () => void;
  onUpdate: (goalId: string, progress: number) => void;
}

export function UpdateProgressModal({ goal, onClose, onUpdate }: UpdateProgressModalProps) {
  const [progress, setProgress] = useState(goal.progress);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(goal.id, progress);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-background-card rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Update Progress</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {goal.title}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between mt-1">
              <span className="text-sm text-gray-500">{progress}% Complete</span>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Update Progress
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}