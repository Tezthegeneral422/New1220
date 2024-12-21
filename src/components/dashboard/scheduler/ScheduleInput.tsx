import React, { useState } from 'react';
import { Clock, Plus } from 'lucide-react';
import type { ScheduleItem, Priority } from '../../../types/schedule';

interface ScheduleInputProps {
  onAddTask: (task: ScheduleItem) => void;
}

export function ScheduleInput({ onAddTask }: ScheduleInputProps) {
  const [activity, setActivity] = useState('');
  const [time, setTime] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity.trim() || !time) return;

    onAddTask({
      id: crypto.randomUUID(),
      activity: activity.trim(),
      time,
      priority,
      completed: false
    });

    setActivity('');
    setTime('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-center space-x-3">
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="Add a task or activity..."
          className="flex-grow input text-sm"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="input text-sm w-32"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="input text-sm"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <button
          type="submit"
          className="btn-primary text-sm flex items-center"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Task
        </button>
      </div>
    </form>
  );
}