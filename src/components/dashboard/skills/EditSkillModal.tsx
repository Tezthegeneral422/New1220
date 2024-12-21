import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { UserSkill } from '../../../types/user';

interface EditSkillModalProps {
  skill: UserSkill;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (skillName: string, newLevel: UserSkill['level']) => void;
  onDelete: (skillName: string) => void;
}

export function EditSkillModal({
  skill,
  isOpen,
  onClose,
  onUpdate,
  onDelete
}: EditSkillModalProps) {
  const [level, setLevel] = useState<UserSkill['level']>(skill.level);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(skill.name, level);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-background-card rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Edit Skill: {skill.name}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Proficiency Level
            </label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value as UserSkill['level'])}
              className="input mt-1 block w-full"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => {
                onDelete(skill.name);
                onClose();
              }}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
            >
              Delete Skill
            </button>
            <div className="space-x-3">
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
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}