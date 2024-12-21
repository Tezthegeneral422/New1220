import React, { createContext, useContext, useState } from 'react';
import type { Goal, GoalState } from '../types/goal';

const GoalContext = createContext<GoalState | undefined>(undefined);

export function GoalProvider({ children }: { children: React.ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>([]);

  const addGoal = (titles: string[], category: string, targetDate: string) => {
    const newGoals = titles.map(title => ({
      id: crypto.randomUUID(),
      title,
      category,
      targetDate,
      progress: 0,
      completed: false,
      createdAt: new Date().toISOString()
    }));

    setGoals(prev => [...prev, ...newGoals]);
  };

  const updateGoalProgress = (goalId: string, progress: number) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        return {
          ...goal,
          progress,
          completed: progress === 100
        };
      }
      return goal;
    }));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  return (
    <GoalContext.Provider value={{ goals, addGoal, updateGoalProgress, deleteGoal }}>
      {children}
    </GoalContext.Provider>
  );
}

export function useGoals() {
  const context = useContext(GoalContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalProvider');
  }
  return context;
}