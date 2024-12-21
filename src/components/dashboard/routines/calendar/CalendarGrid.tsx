import React from 'react';
import { CalendarDay } from './CalendarDay';
import type { MonthData } from '../../../types/calendar';

interface CalendarGridProps {
  monthData: MonthData;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export function CalendarGrid({ monthData, selectedDate, onSelectDate }: CalendarGridProps) {
  return (
    <>
      {monthData.days.map((day, index) => (
        <CalendarDay
          key={index}
          day={day}
          isSelected={day.date.toDateString() === selectedDate.toDateString()}
          onSelect={() => onSelectDate(day.date)}
        />
      ))}
    </>
  );
}