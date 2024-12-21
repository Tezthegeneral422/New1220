import { useState } from 'react';
import { toast } from 'react-hot-toast';
import type { UserSkill } from '../../types/user';

export function useUserSkills() {
  const [skills, setSkills] = useState<UserSkill[]>([
    { name: 'JavaScript', level: 'intermediate', lastUpdated: new Date() },
    { name: 'React', level: 'beginner', lastUpdated: new Date() },
  ]);

  const addSkills = (newSkills: string[], level: UserSkill['level'] = 'beginner') => {
    setSkills(prevSkills => {
      const updatedSkills = [...prevSkills];
      
      newSkills.forEach(skillName => {
        const existingSkillIndex = updatedSkills.findIndex(
          skill => skill.name.toLowerCase() === skillName.toLowerCase()
        );
        
        if (existingSkillIndex >= 0) {
          // Update existing skill level if new level is higher
          const currentLevel = updatedSkills[existingSkillIndex].level;
          if (
            (currentLevel === 'beginner' && (level === 'intermediate' || level === 'advanced')) ||
            (currentLevel === 'intermediate' && level === 'advanced')
          ) {
            updatedSkills[existingSkillIndex] = {
              ...updatedSkills[existingSkillIndex],
              level,
              lastUpdated: new Date()
            };
          }
        } else {
          // Add new skill
          updatedSkills.push({
            name: skillName,
            level,
            lastUpdated: new Date()
          });
        }
      });
      
      return updatedSkills;
    });

    toast.success('Skills updated successfully!');
  };

  const updateSkill = (skillName: string, newLevel: UserSkill['level']) => {
    setSkills(prevSkills =>
      prevSkills.map(skill =>
        skill.name === skillName
          ? { ...skill, level: newLevel, lastUpdated: new Date() }
          : skill
      )
    );
    toast.success('Skill updated successfully!');
  };

  const deleteSkill = (skillName: string) => {
    setSkills(prevSkills => prevSkills.filter(skill => skill.name !== skillName));
    toast.success('Skill deleted successfully!');
  };

  return {
    skills,
    addSkills,
    updateSkill,
    deleteSkill
  };
}