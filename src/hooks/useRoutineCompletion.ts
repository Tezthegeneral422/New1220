import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface RoutineState {
  id: string;
  title: string;
  completed: boolean;
}

export function useRoutineCompletion() {
  const [routines, setRoutines] = useState<RoutineState[]>([
    { id: '1', title: 'Learning JavaScript', completed: false },
    { id: '2', title: 'Code Review', completed: false },
    { id: '3', title: 'Technical Reading', completed: false },
  ]);

  const completeAllRoutines = async () => {
    try {
      // In a real app, this would be an API call
      setRoutines(prevRoutines => 
        prevRoutines.map(routine => ({
          ...routine,
          completed: true
        }))
      );
      
      toast.success('All routines completed for today!');
      
      // Reset routines after a delay to simulate the next day
      setTimeout(() => {
        setRoutines(prevRoutines =>
          prevRoutines.map(routine => ({
            ...routine,
            completed: false
          }))
        );
      }, 5000);
    } catch (error) {
      toast.error('Failed to complete routines. Please try again.');
    }
  };

  return {
    routines,
    completeAllRoutines,
  };
}