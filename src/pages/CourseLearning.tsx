import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { mockCourses } from '../data/mockCourses';
import { CourseContent } from '../components/courses/learning/CourseContent';
import { LessonViewer } from '../components/courses/learning/LessonViewer';
import { useCourseProgress } from '../hooks/courses/useCourseProgress';
import { useUser } from '../context/UserContext';
import { determineCourseSkillLevel } from '../utils/courses/courseCompletion';

export function CourseLearning() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = mockCourses.find(c => c.id === courseId);
  const { addSkills } = useUser();
  
  const [currentModuleId, setCurrentModuleId] = useState(
    course?.modules?.[0]?.id
  );
  const [currentLessonId, setCurrentLessonId] = useState(
    course?.modules?.[0]?.lessons[0]?.id
  );

  const { modules, markLessonComplete, getProgress } = useCourseProgress(
    course?.modules || []
  );

  const currentModule = modules.find(m => m.id === currentModuleId);
  const currentLesson = currentModule?.lessons.find(l => l.id === currentLessonId);

  const handleSelectLesson = (moduleId: string, lessonId: string) => {
    setCurrentModuleId(moduleId);
    setCurrentLessonId(lessonId);
  };

  const handleLessonComplete = () => {
    if (currentModuleId && currentLessonId) {
      markLessonComplete(currentModuleId, currentLessonId);
    }
  };

  // Check for course completion
  useEffect(() => {
    const progress = getProgress();
    if (progress === 100 && course) {
      const skillLevel = determineCourseSkillLevel(course);
      addSkills(course.skills, skillLevel);
      navigate(`/courses/${courseId}/complete`, {
        state: {
          course,
          acquiredSkills: course.skills.map(skill => ({
            name: skill,
            level: skillLevel
          }))
        }
      });
    }
  }, [getProgress, course, addSkills, navigate, courseId]);

  if (!course || !currentModule || !currentLesson) {
    return (
      <div className="min-h-screen bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Course not found</h2>
            <Link to="/dashboard" className="text-button-primary hover:opacity-80 mt-4 inline-block">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-8">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to={`/courses/${courseId}`}
            className="inline-flex items-center text-button-primary hover:opacity-80"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Course Overview
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Course Content Sidebar */}
          <div className="lg:col-span-4">
            <CourseContent
              modules={modules}
              onSelectLesson={handleSelectLesson}
              currentModuleId={currentModuleId}
              currentLessonId={currentLessonId}
            />
          </div>

          {/* Lesson Viewer */}
          <div className="lg:col-span-8">
            <LessonViewer
              module={currentModule}
              lesson={currentLesson}
              onComplete={handleLessonComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}