import { useState } from 'react';
import { toast } from 'react-hot-toast';
import type { CourseModule, CourseLesson } from '../../types/course';

export function useCourseProgress(initialModules: CourseModule[]) {
  const [modules, setModules] = useState(initialModules);

  const markLessonComplete = (moduleId: string, lessonId: string) => {
    setModules(prevModules => 
      prevModules.map(module => {
        if (module.id !== moduleId) return module;
        
        const updatedLessons = module.lessons.map(lesson =>
          lesson.id === lessonId ? { ...lesson, completed: true } : lesson
        );
        
        const allLessonsCompleted = updatedLessons.every(lesson => lesson.completed);
        
        return {
          ...module,
          lessons: updatedLessons,
          completed: allLessonsCompleted
        };
      })
    );
    
    toast.success('Lesson completed!');
  };

  const getProgress = () => {
    const totalLessons = modules.reduce(
      (total, module) => total + module.lessons.length,
      0
    );
    
    const completedLessons = modules.reduce(
      (total, module) => total + module.lessons.filter(l => l.completed).length,
      0
    );

    return Math.round((completedLessons / totalLessons) * 100);
  };

  return {
    modules,
    markLessonComplete,
    getProgress
  };
}