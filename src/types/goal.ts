export interface Goal {
  id: string;
  title: string;
  category: string;
  targetDate: string;
  progress: number;
  completed: boolean;
  createdAt: string;
}

export interface GoalState {
  goals: Goal[];
  addGoal: (goals: string[], category: string, targetDate: string) => void;
  updateGoalProgress: (goalId: string, progress: number) => void;
  deleteGoal: (goalId: string) => void;
}