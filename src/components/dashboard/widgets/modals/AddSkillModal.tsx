import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { UserSkill } from '../../../../types/user';
import { AVAILABLE_SKILLS, SKILL_CATEGORIES } from '../../../../data/availableSkills';

interface AddSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSkill: (skill: string, level: UserSkill['level']) => void;
}

export function AddSkillModal({ isOpen, onClose, onAddSkill }: AddSkillModalProps) {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [level, setLevel] = useState<UserSkill['level']>('beginner');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSkill) {
      onAddSkill(selectedSkill, level);
      setSelectedSkill('');
      setLevel('beginner');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-background-card rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Skill</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="skill" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Skill
            </label>
            <select
              id="skill"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="input mt-1 block w-full"
              required
            >
              <option value="">Select a skill...</option>
              {Object.entries(SKILL_CATEGORIES).map(([category, skills]) => (
                <optgroup key={category} label={category}>
                  {skills.map(skill => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

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
              Add Skill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}