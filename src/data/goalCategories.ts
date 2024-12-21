export const GOAL_CATEGORIES = {
  'Career & Professional': [
    'Get a promotion',
    'Switch to a new industry',
    'Start a business or side hustle',
    'Earn a professional certification (e.g., PMP, AWS)',
    'Improve public speaking skills',
    'Build a professional network',
    'Develop leadership skills',
    'Complete a significant work project',
    'Create a personal brand',
    'Learn a new technical skill (e.g., coding, data analysis)',
    'Publish an article or research paper',
    'Mentor someone in your field'
  ],
  'Financial': [
    'Save for an emergency fund',
    'Pay off debt (e.g., student loans, credit cards)',
    'Start investing (e.g., stocks, real estate)',
    'Create a monthly budget and stick to it',
    'Increase income through a side hustle',
    'Save for a major purchase (e.g., house, car)',
    'Build a retirement fund',
    'Set up an automatic savings plan',
    'Understand and improve credit score'
  ],
  'Wellness': [
    'Exercise regularly (e.g., 3–5 times per week)',
    'Practice mindfulness or meditation daily',
    'Develop a consistent sleep schedule',
    'Drink more water (e.g., 8 glasses/day)',
    'Reduce screen time before bed',
    'Eat healthier by incorporating more whole foods',
    'Try a new physical activity or sport',
    'Take regular mental health days',
    'Establish a morning or evening routine',
    'Reduce stress with relaxation techniques',
    'Journal for mental clarity'
  ],
  'Education & Learning': [
    'Learn a new language',
    'Read a certain number of books in a year',
    'Take an online course on a topic of interest',
    'Attend a workshop or conference',
    'Start a new hobby (e.g., painting, cooking, coding)',
    'Stay updated on industry trends',
    'Watch educational documentaries or videos',
    'Improve writing skills',
    'Join a book club or study group'
  ],
  'Personal Development': [
    'Build self-confidence',
    'Develop better time management skills',
    'Practice gratitude daily',
    'Improve listening skills',
    'Set and maintain boundaries',
    'Create a vision board for long-term goals',
    'Overcome a personal fear (e.g., public speaking, heights)',
    'Volunteer for a cause you care about',
    'Spend quality time with loved ones'
  ],
  'Relationship': [
    'Communicate more openly with family or friends',
    'Schedule regular date nights with a partner',
    'Make new friends or strengthen existing friendships',
    'Join a community group or club',
    'Improve conflict resolution skills',
    'Practice acts of kindness'
  ],
  'Lifestyle': [
    'Declutter and organize your living space',
    'Travel to a new destination',
    'Spend more time outdoors',
    'Explore a creative passion (e.g., photography, music)',
    'Try new recipes or cuisines',
    'Reduce reliance on social media',
    'Create a balance between work and personal life'
  ],
  'Wellness-Driven Professional': [
    'Incorporate wellness breaks into the workday',
    'Practice deep work for improved focus',
    'Take a course on workplace wellness',
    'Advocate for work-life balance in your organization',
    'Organize team wellness challenges or events'
  ],
  'Environmental & Community': [
    'Reduce waste and adopt sustainable habits',
    'Participate in community cleanups',
    'Plant a garden or trees',
    'Support local businesses',
    'Donate to or volunteer with a charity'
  ]
} as const;

export type GoalCategory = keyof typeof GOAL_CATEGORIES;
export type GoalOption = typeof GOAL_CATEGORIES[GoalCategory][number];