export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  lessons: CourseLesson[];
  completed: boolean;
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: 'video' | 'reading' | 'quiz';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  skills: string[];
  provider: string;
  modules?: CourseModule[];
}