import React from 'react';
import { Search, BookOpen } from 'lucide-react';

export function CourseSearch() {
  return (
    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search courses by title or skill..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-button-primary focus:border-button-primary"
          />
        </div>
        <div className="relative">
          <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <select
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white appearance-none focus:ring-2 focus:ring-button-primary focus:border-button-primary"
          >
            <option value="">All Categories</option>
            <option value="development">Development</option>
            <option value="design">Design</option>
            <option value="business">Business</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
      </form>
    </div>
  );
}