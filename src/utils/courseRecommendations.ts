import type { Course } from '../types/course';

// Get missing skills by comparing user skills with job requirements
export function getMissingSkills(
  userSkills: string[] = [], // Add default empty array
  jobSkills: string[] = []  // Add default empty array
): string[] {
  if (!userSkills || !jobSkills) return [];
  
  return jobSkills.filter(
    skill => !userSkills.some(
      userSkill => userSkill.toLowerCase() === skill.toLowerCase()
    )
  );
}

// Get recommended courses based on missing skills
export function getRecommendedCourses(
  missingSkills: string[] = [], // Add default empty array
  allCourses: Course[] = []    // Add default empty array
): Course[] {
  if (!missingSkills || !allCourses) return [];

  return allCourses.filter(course =>
    course.skills.some(skill =>
      missingSkills.some(
        missingSkill => missingSkill.toLowerCase() === skill.toLowerCase()
      )
    )
  );
}