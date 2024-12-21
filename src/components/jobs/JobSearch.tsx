import React from 'react';
import { Search, MapPin } from 'lucide-react';

interface JobSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function JobSearch({ searchQuery, onSearchChange }: JobSearchProps) {
  return (
    <div className="card p-4">
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={e => e.preventDefault()}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Job title, keywords, or company"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="input w-full pl-10 pr-4 py-2 text-xs"
          />
        </div>
      </form>
    </div>
  );
}