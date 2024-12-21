import type { Course } from '../../types/course';
import type { UserSkill } from '../../types/user';

export function determineCourseSkillLevel(course: Course): UserSkill['level'] {
  switch (course.level.toLowerCase()) {
    case 'advanced':
      return 'advanced';
    case 'intermediate':
      return 'intermediate';
    default:
      return 'beginner';
  }
}