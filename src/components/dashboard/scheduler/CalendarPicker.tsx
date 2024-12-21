import React from 'react';
import { X } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';

interface CalendarPickerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export function CalendarPicker({ isOpen, onClose, selectedDate, onSelectDate }: CalendarPickerProps) {
  if (!isOpen) return null;

  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-background-card rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {format(selectedDate, 'MMMM yyyy')}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm text-gray-500 dark:text-gray-400 py-2">
                {day}
              </div>
            ))}
            
            {days.map((day) => (
              <button
                key={day.toString()}
                onClick={() => onSelectDate(day)}
                className={`
                  p-2 text-sm rounded-full hover:bg-gray-100 dark:hover:bg-gray-800
                  ${isSameDay(day, selectedDate)
                    ? 'bg-button-primary text-black'
                    : 'text-gray-700 dark:text-gray-300'
                  }
                  ${!isSameMonth(day, selectedDate) && 'text-gray-400 dark:text-gray-600'}
                `}
              >
                {format(day, 'd')}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}