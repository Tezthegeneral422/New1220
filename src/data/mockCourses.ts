export const mockCourses = [
  {
    id: '1',
    title: 'Advanced React Development',
    description: 'Master modern React with hooks, context, and advanced patterns',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '12 weeks',
    level: 'Advanced',
    skills: ['React', 'TypeScript', 'GraphQL'],
    provider: 'TechAcademy',
    modules: [
      {
        id: 'm1',
        title: 'React Fundamentals',
        duration: '2 hours',
        completed: false,
        lessons: [
          {
            id: 'l1',
            title: 'Introduction to Modern React',
            duration: '30 min',
            completed: false,
            type: 'video'
          },
          {
            id: 'l2',
            title: 'Understanding Hooks',
            duration: '45 min',
            completed: false,
            type: 'reading'
          },
          {
            id: 'l3',
            title: 'Hooks Knowledge Check',
            duration: '15 min',
            completed: false,
            type: 'quiz'
          }
        ]
      },
      {
        id: 'm2',
        title: 'Advanced State Management',
        duration: '3 hours',
        completed: false,
        lessons: [
          {
            id: 'l4',
            title: 'Context API Deep Dive',
            duration: '45 min',
            completed: false,
            type: 'video'
          },
          {
            id: 'l5',
            title: 'Building Custom Hooks',
            duration: '1 hour',
            completed: false,
            type: 'reading'
          }
        ]
      }
    ]
  },
  // ... other courses
] as const;