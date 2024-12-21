import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserGoals, createGoal, updateGoal, deleteGoal } from '../../services/goals';
import type { Database } from '../../types/database';

type Goal = Database['public']['Tables']['user_goals']['Row'];
type GoalInsert = Database['public']['Tables']['user_goals']['Insert'];
type GoalUpdate = Database['public']['Tables']['user_goals']['Update'];

export function useGoalManagement() {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    async function loadGoals() {
      try {
        const data = await getUserGoals(user.id);
        setGoals(data);
      } catch (error) {
        console.error('Error loading goals:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadGoals();
  }, [user?.id]);

  const create = async (data: Omit<GoalInsert, 'user_id'>) => {
    if (!user?.id) return;

    try {
      const newGoal = await createGoal({
        ...data,
        user_id: user.id,
      });
      setGoals(prev => [newGoal, ...prev]);
      return newGoal;
    } catch (error) {
      console.error('Error creating goal:', error);
      throw error;
    }
  };

  const update = async (goalId: string, updates: GoalUpdate) => {
    try {
      const updated = await updateGoal(goalId, updates);
      setGoals(prev => prev.map(g => g.id === goalId ? updated : g));
      return updated;
    } catch (error) {
      console.error('Error updating goal:', error);
      throw error;
    }
  };

  const remove = async (goalId: string) => {
    try {
      await deleteGoal(goalId);
      setGoals(prev => prev.filter(g => g.id !== goalId));
    } catch (error) {
      console.error('Error deleting goal:', error);
      throw error;
    }
  };

  return {
    goals,
    isLoading,
    create,
    update,
    remove,
  };
}