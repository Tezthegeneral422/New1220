import React, { useState } from 'react';
import { Plus, Calendar as CalendarIcon, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format, addDays, subDays } from 'date-fns';
import { ScheduleInput } from './ScheduleInput';
import { TimelineView } from './TimelineView';
import { CalendarPicker } from './CalendarPicker';
import type { ScheduleItem } from '../../../types/schedule';

export function DailyScheduleBuilder() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);

  const handleAddTask = (task: ScheduleItem) => {
    setScheduleItems(prev => [...prev, task]);
  };

  const handleUpdateTask = (taskId: string, updates: Partial<ScheduleItem>) => {
    setScheduleItems(prev =>
      prev.map(item =>
        item.id === taskId ? { ...item, ...updates } : item
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setScheduleItems(prev => prev.filter(item => item.id !== taskId));
  };

  const handlePreviousDay = () => {
    setSelectedDate(prev => subDays(prev, 1));
  };

  const handleNextDay = () => {
    setSelectedDate(prev => addDays(prev, 1));
  };

  return (
    <div className="p-6 border border-white dark:border-gray-700 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-4 w-4 text-button-primary" />
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">Daily Schedule</h2>
        </div>
        <Link 
          to="/daily-routine"
          className="text-button-primary hover:opacity-80 text-sm font-medium"
        >
          Full View
        </Link>
      </div>

      <div className="space-y-6">
        {/* Date Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePreviousDay}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </button>
          
          <button
            onClick={() => setIsCalendarOpen(true)}
            className="flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <span>{format(selectedDate, 'MMMM d, yyyy')}</span>
            <CalendarIcon className="h-4 w-4" />
          </button>

          <button
            onClick={handleNextDay}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowRight className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Schedule Input */}
        <ScheduleInput onAddTask={handleAddTask} />

        {/* Timeline View */}
        <TimelineView
          items={scheduleItems}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>

      {/* Calendar Picker Modal */}
      <CalendarPicker
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        selectedDate={selectedDate}
        onSelectDate={(date) => {
          setSelectedDate(date);
          setIsCalendarOpen(false);
        }}
      />
    </div>
  );
}