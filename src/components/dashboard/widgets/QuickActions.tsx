import React, { useState } from 'react';
import { PlusCircle, BookOpen, Target, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AddSkillModal } from './modals/AddSkillModal';
import { SetGoalModal } from './modals/SetGoalModal';
import { useUser } from '../../../context/UserContext';

export function QuickActions() {
  const navigate = useNavigate();
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);
  const [isSetGoalModalOpen, setIsSetGoalModalOpen] = useState(false);
  const { addSkills } = useUser();

  return (
    <div className="p-6">
      <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        <ActionButton
          icon={<PlusCircle className="h-4 w-4" />}
          label="Add Skill"
          onClick={() => setIsAddSkillModalOpen(true)}
        />
        <ActionButton
          icon={<BookOpen className="h-4 w-4" />}
          label="Start Course"
          onClick={() => navigate('/courses')}
        />
        <ActionButton
          icon={<Target className="h-4 w-4" />}
          label="Set Goal"
          onClick={() => setIsSetGoalModalOpen(true)}
        />
        <ActionButton
          icon={<CheckCircle className="h-4 w-4" />}
          label="Track Progress"
          onClick={() => navigate('/calendar')}
        />
      </div>

      <AddSkillModal
        isOpen={isAddSkillModalOpen}
        onClose={() => setIsAddSkillModalOpen(false)}
        onAddSkill={(skill, level) => {
          addSkills([skill], level);
          setIsAddSkillModalOpen(false);
        }}
      />

      <SetGoalModal
        isOpen={isSetGoalModalOpen}
        onClose={() => setIsSetGoalModalOpen(false)}
      />
    </div>
  );
}

function ActionButton({ 
  icon, 
  label, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string;
  onClick: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-background-card rounded-lg hover:bg-gray-100 dark:hover:bg-background-cardLight transition-colors border border-white dark:border-gray-700"
    >
      <div className="text-button-primary">{icon}</div>
      <span className="mt-2 text-[10px] font-medium text-gray-700 dark:text-gray-300">{label}</span>
    </button>
  );
}