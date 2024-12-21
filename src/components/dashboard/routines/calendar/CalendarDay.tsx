import React from 'react';
import { Check } from 'lucide-react';
import type { DayData } from '../../../types/calendar';

interface CalendarDayProps {
  day: DayData;
  isSelected: boolean;
  onSelect: () => void;
}

export function CalendarDay({ day, isSelected, onSelect }: CalendarDayProps) {
  const isToday = day.date.toDateString() === new Date().toDateString();

  return (
    <button
      onClick={onSelect}
      className={`
        h-14 rounded-lg flex flex-col items-center justify-center relative
        ${isSelected ? 'bg-indigo-600 text-white' : 'hover:bg-gray-50'}
        ${!day.isCurrentMonth ? 'text-gray-400' : 'text-gray-900'}
        ${isToday && !isSelected ? 'border-2 border-indigo-600' : ''}
      `}
    >
      <span className="text-sm">{day.date.getDate()}</span>
      {day.hasCompletedRoutines && (
        <Check className={`h-4 w-4 ${isSelected ? 'text-white' : 'text-green-500'}`} />
      )}
    </button>
  );
}