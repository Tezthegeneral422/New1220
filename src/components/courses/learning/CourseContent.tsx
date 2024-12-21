import React from 'react';
import { Play, BookOpen, HelpCircle } from 'lucide-react';
import type { CourseModule } from '../../../types/course';

interface CourseContentProps {
  modules: CourseModule[];
  onSelectLesson: (moduleId: string, lessonId: string) => void;
  currentModuleId?: string;
  currentLessonId?: string;
}

export function CourseContent({
  modules,
  onSelectLesson,
  currentModuleId,
  currentLessonId
}: CourseContentProps) {
  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-4 w-4" />;
      case 'reading': return <BookOpen className="h-4 w-4" />;
      case 'quiz': return <HelpCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-lg font-semibold text-white">Course Content</h2>
      </div>
      <div className="divide-y divide-gray-800">
        {modules.map((module) => (
          <div key={module.id} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-white">{module.title}</h3>
              <span className="text-sm text-gray-400">{module.duration}</span>
            </div>
            <div className="space-y-2">
              {module.lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => onSelectLesson(module.id, lesson.id)}
                  className={`
                    w-full flex items-center justify-between p-2 rounded-md transition-colors
                    ${currentModuleId === module.id && currentLessonId === lesson.id
                      ? 'bg-gray-800 text-button-primary'
                      : 'hover:bg-gray-800 text-gray-300'
                    }
                    ${lesson.completed ? 'text-green-400' : ''}
                  `}
                >
                  <div className="flex items-center space-x-2">
                    {getLessonIcon(lesson.type)}
                    <span>{lesson.title}</span>
                  </div>
                  <span className="text-sm text-gray-500">{lesson.duration}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}