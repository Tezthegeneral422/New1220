import React from 'react';
import { BookOpen } from 'lucide-react';

interface DailyNotesProps {
  value: string;
  onChange: (value: string) => void;
}

export function DailyNotes({ value, onChange }: DailyNotesProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <BookOpen className="h-4 w-4 text-gray-400" />
        <span className="text-sm text-gray-700 dark:text-gray-300">Daily Notes</span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add notes, thoughts, or reflections for the day..."
        className="w-full h-24 input text-sm resize-none"
      />
    </div>
  );
}