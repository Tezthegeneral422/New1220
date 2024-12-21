import { useSubscription } from '../subscriptions/useSubscription';
import type { Course } from '../../types/course';

export function useCourseAccess() {
  const { subscription } = useSubscription();
  const isPaidUser = subscription?.status === 'active' && 
                    subscription.plan?.price > 0;

  const getAccessibleCourses = (courses: Course[]) => {
    if (isPaidUser) return courses;
    // Free users can only access basic courses
    return courses.filter(course => course.level === 'Beginner');
  };

  return {
    isPaidUser,
    getAccessibleCourses
  };
}