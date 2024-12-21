/*
  # Add sample job descriptions

  1. Sample Data
    - Add initial job descriptions for existing jobs
    - Include detailed requirements, responsibilities, and benefits
*/

INSERT INTO job_descriptions (job_id, description, requirements, responsibilities, benefits) VALUES
('1', 
  'We are seeking an experienced Senior Frontend Developer to join our dynamic team. In this role, you will be responsible for building and maintaining high-quality web applications using modern frontend technologies.',
  ARRAY[
    '5+ years of experience with React and TypeScript',
    'Experience with GraphQL and modern frontend architecture',
    'Strong understanding of web performance optimization',
    'Experience with responsive design and cross-browser compatibility'
  ],
  ARRAY[
    'Lead frontend development initiatives and mentor junior developers',
    'Architect and implement scalable frontend solutions',
    'Collaborate with designers and backend developers',
    'Participate in code reviews and technical discussions'
  ],
  ARRAY[
    'Competitive salary and equity package',
    'Flexible remote work options',
    'Health, dental, and vision insurance',
    'Professional development budget'
  ]
),
('2',
  'We are looking for a Product Manager to drive product strategy and execution. You will work closely with engineering, design, and business teams to deliver exceptional user experiences.',
  ARRAY[
    'Bachelor''s degree in Computer Science or related field',
    '3+ years of product management experience',
    'Strong analytical and problem-solving skills',
    'Excellent communication and leadership abilities'
  ],
  ARRAY[
    'Define product strategy and roadmap',
    'Gather and analyze user feedback and market research',
    'Work with engineering teams to deliver features',
    'Track and measure product metrics'
  ],
  ARRAY[
    'Competitive compensation package',
    'Remote-first work environment',
    'Comprehensive benefits package',
    'Stock options'
  ]
);