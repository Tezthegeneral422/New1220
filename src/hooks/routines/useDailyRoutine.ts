import { useState } from 'react';
import type { DailyRoutineData, TimeBlock } from '../../types/routine';

const INITIAL_DATA: DailyRoutineData = {
  priorityTasks: [
    { id: '1', title: 'Complete 15 minutes of coding practice', completed: false },
    { id: '2', title: 'Review 1 article on leadership strategies', completed: false },
    { id: '3', title: 'Update LinkedIn profile with new certifications', completed: false }
  ],
  skillProgress: {
    skill: 'React Development',
    progress: 70,
    daysStreak: 7
  },
  dailyChallenge: {
    title: 'React Hooks Practice',
    description: 'Create a custom hook for managing form state',
    timeEstimate: '15 mins',
    completed: false
  },
  dailyQuote: {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  coachTip: "Consider pair programming today to enhance your collaborative skills.",
  timeBlocks: [
    { id: 'tb1', time: '9:00 AM', activity: 'Deep Work', status: 'pending' },
    { id: 'tb2', time: '11:00 AM', activity: 'Learning', status: 'pending' },
    { id: 'tb3', time: '3:00 PM', activity: 'Review & Planning', status: 'pending' }
  ],
  eveningReflection: {
    completed: false,
    questions: [
      "What was your biggest achievement today?",
      "What did you learn?",
      "What could you improve tomorrow?"
    ]
  }
};

export function useDailyRoutine() {
  const [routineData, setRoutineData] = useState<DailyRoutineData>(INITIAL_DATA);

  const completeTask = (taskId: string) => {
    setRoutineData(prev => ({
      ...prev,
      priorityTasks: prev.priorityTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
  };

  const updateTimeBlock = (blockId: string, status: TimeBlock['status']) => {
    setRoutineData(prev => ({
      ...prev,
      timeBlocks: prev.timeBlocks.map(block =>
        block.id === blockId ? { ...block, status } : block
      )
    }));
  };

  const completeChallenge = () => {
    setRoutineData(prev => ({
      ...prev,
      dailyChallenge: { ...prev.dailyChallenge, completed: true }
    }));
  };

  const submitReflection = (answers: string[]) => {
    setRoutineData(prev => ({
      ...prev,
      eveningReflection: {
        ...prev.eveningReflection,
        completed: true,
        answers
      }
    }));
  };

  return {
    routineData,
    completeTask,
    updateTimeBlock,
    completeChallenge,
    submitReflection
  };
}