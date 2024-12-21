import React from 'react';
import { GraduationCap } from 'lucide-react';

interface JobCardActionsProps {
  onApply: () => void;
  onUpskill: () => void;
}

export function JobCardActions({ onApply, onUpskill }: JobCardActionsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button 
        onClick={onApply}
        className="btn-primary text-xs font-bold"
      >
        Apply Now
      </button>
      <button 
        onClick={onUpskill}
        className="bg-[#3A3B3C] text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-xs font-bold"
      >
        <GraduationCap className="h-4 w-4" />
        Upskill for Role
      </button>
    </div>
  );
}