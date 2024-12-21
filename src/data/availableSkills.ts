export const SKILL_CATEGORIES = {
  'Technology & Digital': [
    'Data Analysis',
    'SQL',
    'Excel (Advanced)',
    'Tableau',
    'Python',
    'AI & Machine Learning',
    'Natural Language Processing (NLP)',
    'Cloud Computing (AWS, Azure, Google Cloud)',
    'Cybersecurity',
    'Ethical Hacking',
    'Software Development (Full-Stack, API Development)',
    'Mobile App Development (iOS, Android, Flutter)',
    'Web3 & Blockchain Development',
    'UX/UI Design (Figma, Adobe XD)',
    'Automation (RPA Tools, Workflow Optimization)'
  ],
  'Business & Management': [
    'Project Management (Agile, Scrum, Kanban)',
    'Risk Management',
    'Product Management',
    'Digital Marketing (SEO, SEM, Social Media Ads)',
    'Sales & CRM Tools (Salesforce, HubSpot)',
    'Financial Modeling',
    'Market Analysis',
    'Negotiation Skills'
  ],
  'Creativity & Communication': [
    'Video Editing (Final Cut Pro, Premiere Pro)',
    'Podcast Production',
    'Storytelling',
    'Public Speaking',
    'Presentation Design (PowerPoint, Canva)',
    'Personal Branding',
    'Community Management'
  ],
  'Leadership & Interpersonal': [
    'Emotional Intelligence (EQ)',
    'Conflict Resolution',
    'Team Leadership',
    'Coaching and Mentoring',
    'Strategic Thinking'
  ],
  'Emerging Fields': [
    'Carbon Footprint Analysis',
    'Renewable Energy Systems',
    'Telemedicine Platforms',
    'Data Privacy & Governance',
    'Hybrid Team Management',
    'Bias Mitigation in AI'
  ],
  'General Skills': [
    'Critical Thinking',
    'Time Management',
    'Adaptability',
    'Problem-Solving',
    'Multilingual Communication',
    'Remote Collaboration Tools (Slack, Zoom, Miro)'
  ]
} as const;

// Flatten skills array for dropdown while preserving categories
export const AVAILABLE_SKILLS = Object.entries(SKILL_CATEGORIES).flatMap(
  ([category, skills]) => skills.map(skill => ({
    category,
    name: skill
  }))
).sort((a, b) => a.name.localeCompare(b.name));