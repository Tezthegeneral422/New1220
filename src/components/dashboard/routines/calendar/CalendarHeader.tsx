import React from 'react';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function CalendarHeader() {
  return (
    <>
      {WEEKDAYS.map(day => (
        <div
          key={day}
          className="text-center text-sm font-medium text-gray-500 py-2"
        >
          {day}
        </div>
      ))}
    </>
  );
}