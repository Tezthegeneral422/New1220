import React, { useState } from 'react';
import { useUser } from '../../../context/UserContext';
import { Brain, Pencil } from 'lucide-react';
import { EditSkillModal } from './EditSkillModal';
import type { UserSkill } from '../../../types/user';

const LEVEL_COLORS = {
  beginner: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
  intermediate: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
  advanced: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300'
};

export function UserSkills() {
  const { skills, updateSkill, deleteSkill } = useUser();
  const [editingSkill, setEditingSkill] = useState<UserSkill | null>(null);

  const handleUpdateSkill = (skillName: string, newLevel: UserSkill['level']) => {
    updateSkill(skillName, newLevel);
    setEditingSkill(null);
  };

  const handleDeleteSkill = (skillName: string) => {
    deleteSkill(skillName);
    setEditingSkill(null);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Brain className="h-4 w-4 text-button-primary" />
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">My Skills</h2>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="group relative flex items-center"
          >
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${LEVEL_COLORS[skill.level]}`}>
              {skill.name}
            </span>
            <button
              onClick={() => setEditingSkill(skill)}
              className="ml-1 p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"
            >
              <Pencil className="h-3 w-3 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        ))}

        {skills.length === 0 && (
          <div className="text-center py-6 text-xs text-gray-500 dark:text-gray-400">
            Complete courses to add skills to your profile
          </div>
        )}
      </div>

      {editingSkill && (
        <EditSkillModal
          skill={editingSkill}
          isOpen={true}
          onClose={() => setEditingSkill(null)}
          onUpdate={handleUpdateSkill}
          onDelete={handleDeleteSkill}
        />
      )}
    </div>
  );
}