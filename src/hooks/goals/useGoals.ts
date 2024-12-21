import { useState } from 'react';
import { toast } from 'react-hot-toast';

export interface Goal {
  id: string;
  title: string;
  targetDate: string;
  progress: number;
  completed: boolean;
  type: 'skill' | 'course' | 'career' | 'project';
}

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Master React Hooks',
      targetDate: '2024-06-30',
      progress: 60,
      completed: false,
      type: 'skill'
    },
    {
      id: '2',
      title: 'Complete AWS Certification',
      targetDate: '2024-08-15',
      progress: 25,
      completed: false,
      type: 'course'
    }
  ]);

  const addGoal = (goal: Omit<Goal, 'id' | 'progress' | 'completed'>) => {
    const newGoal: Goal = {
      ...goal,
      id: crypto.randomUUID(),
      progress: 0,
      completed: false
    };
    
    setGoals(prev => [...prev, newGoal]);
    toast.success('Goal added successfully');
  };

  const updateGoalProgress = (goalId: string, progress: number) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const completed = progress === 100;
        return { ...goal, progress, completed };
      }
      return goal;
    }));
    toast.success('Progress updated');
  };

  const deleteGoal = (goalId: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
    toast.success('Goal deleted');
  };

  return {
    goals,
    addGoal,
    updateGoalProgress,
    deleteGoal
  };
}