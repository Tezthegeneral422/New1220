import { useState, useEffect } from 'react';
import type { Routine } from '../types/routine';

export function useRoutines(selectedDate: Date) {
  const [routines, setRoutines] = useState<Routine[]>([
    {
      id: '1',
      title: 'Learning JavaScript',
      description: 'Practice coding for 1 hour',
      completed: false,
      streak: 7,
    },
    {
      id: '2',
      title: 'Code Review',
      description: 'Review and refactor code',
      completed: false,
      streak: 12,
    },
    {
      id: '3',
      title: 'Technical Reading',
      description: 'Read technical documentation',
      completed: false,
      streak: 0,
    },
  ]);

  const toggleRoutineCompletion = (routineId: string) => {
    setRoutines(prevRoutines =>
      prevRoutines.map(routine =>
        routine.id === routineId
          ? { ...routine, completed: !routine.completed }
          : routine
      )
    );
  };

  // In a real app, we would fetch routines based on the selected date
  useEffect(() => {
    // Simulating API call to get routines for the selected date
    console.log('Fetching routines for:', selectedDate.toDateString());
  }, [selectedDate]);

  return {
    routines,
    toggleRoutineCompletion,
  };
}