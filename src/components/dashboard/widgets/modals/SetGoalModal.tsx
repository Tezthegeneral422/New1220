import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { useGoals } from '../../../../context/GoalContext';
import { GOAL_CATEGORIES, type GoalCategory } from '../../../../data/goalCategories';

interface SetGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SetGoalModal({ isOpen, onClose }: SetGoalModalProps) {
  const { addGoal } = useGoals();
  const [selectedCategory, setSelectedCategory] = useState<GoalCategory | ''>('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [targetDate, setTargetDate] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGoals.length === 0 || !selectedCategory) {
      alert('Please select at least one goal and a category');
      return;
    }
    
    addGoal(selectedGoals, selectedCategory, targetDate);
    
    // Reset form
    setSelectedCategory('');
    setSelectedGoals([]);
    setTargetDate('');
    onClose();
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev =>
      prev.includes(goal)
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-background-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Set New Goals</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4 max-h-[calc(90vh-8rem)] overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Goal Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as GoalCategory)}
              className="input w-full"
              required
            >
              <option value="">Select a category...</option>
              {Object.keys(GOAL_CATEGORIES).map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {selectedCategory && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Select Goals
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto p-2 border dark:border-gray-700 rounded-md">
                {GOAL_CATEGORIES[selectedCategory as GoalCategory].map((goal) => (
                  <label key={goal} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedGoals.includes(goal)}
                      onChange={() => toggleGoal(goal)}
                      className="rounded border-gray-300 text-button-primary focus:ring-button-primary"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{goal}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="input pl-10 w-full"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
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
              Set Goals
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}