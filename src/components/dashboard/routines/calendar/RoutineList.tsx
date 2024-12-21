import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { useRoutines } from '../../../../hooks/routines/useRoutines';

interface RoutineListProps {
  selectedDate: Date;
}

export function RoutineList({ selectedDate }: RoutineListProps) {
  const { routines, toggleRoutineCompletion } = useRoutines(selectedDate);

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Routines for {selectedDate.toLocaleDateString()}
      </h3>
      <div className="space-y-3">
        {routines.map((routine) => (
          <div
            key={routine.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <button
                onClick={() => toggleRoutineCompletion(routine.id)}
                className={`
                  p-1 rounded-full transition-colors
                  ${routine.completed ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}
                `}
              >
                {routine.completed ? (
                  <CheckCircle2 className="h-6 w-6" />
                ) : (
                  <Circle className="h-6 w-6" />
                )}
              </button>
              <div>
                <p className="font-medium text-gray-900">{routine.title}</p>
                <p className="text-sm text-gray-600">{routine.description}</p>
              </div>
            </div>
            {routine.streak > 0 && (
              <span className="text-sm text-orange-600">
                {routine.streak} day streak
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}