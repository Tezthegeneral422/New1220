import React, { createContext, useContext } from 'react';
import { useUserSkills } from '../hooks/user/useUserSkills';
import type { UserSkill } from '../types/user';

interface UserContextType {
  skills: UserSkill[];
  addSkills: (skills: string[], level: UserSkill['level']) => void;
  updateSkill: (skillName: string, newLevel: UserSkill['level']) => void;
  deleteSkill: (skillName: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { skills, addSkills, updateSkill, deleteSkill } = useUserSkills();

  return (
    <UserContext.Provider value={{ skills, addSkills, updateSkill, deleteSkill }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}