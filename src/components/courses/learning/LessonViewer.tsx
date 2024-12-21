import React from 'react';
import { CheckCircle } from 'lucide-react';
import type { CourseModule, CourseLesson } from '../../../types/course';

interface LessonViewerProps {
  module: CourseModule;
  lesson: CourseLesson;
  onComplete: () => void;
}

export function LessonViewer({ module, lesson, onComplete }: LessonViewerProps) {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">{lesson.title}</h2>
          <p className="text-gray-400 mt-1">Module: {module.title}</p>
        </div>

        {/* Placeholder content based on lesson type */}
        <div className="aspect-w-16 aspect-h-9 mb-6">
          {lesson.type === 'video' && (
            <div className="bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Video content would appear here</p>
            </div>
          )}
          {lesson.type === 'reading' && (
            <div className="prose max-w-none text-gray-300">
              <p>Reading content would appear here...</p>
            </div>
          )}
          {lesson.type === 'quiz' && (
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-300">Quiz content would appear here</p>
            </div>
          )}
        </div>

        <button
          onClick={onComplete}
          disabled={lesson.completed}
          className={`
            w-full flex items-center justify-center px-6 py-3 rounded-lg transition-colors
            ${lesson.completed
              ? 'bg-green-900/20 text-green-400 cursor-not-allowed'
              : 'bg-button-primary text-black hover:opacity-90'
            }
          `}
        >
          <CheckCircle className="h-5 w-5 mr-2" />
          {lesson.completed ? 'Completed!' : 'Mark as Complete'}
        </button>
      </div>
    </div>
  );
}