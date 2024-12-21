export interface Task {
  id: string;
  title: string;
  completed?: boolean;
  urgency?: boolean;
  time?: string;
}

export interface SkillProgress {
  skill: string;
  progress: number;
  daysStreak: number;
}

export interface DailyChallenge {
  title: string;
  description: string;
  timeEstimate: string;
  completed: boolean;
}

export interface TimeBlock {
  id: string;
  time: string;
  activity: string;
  status: 'pending' | 'completed' | 'skipped';
}

export interface DailyRoutineData {
  tasks: Task[];
  priorityTasks: Task[];
  skillProgress: SkillProgress;
  dailyChallenge: DailyChallenge;
  dailyQuote: {
    text: string;
    author: string;
  };
  coachTip: string;
  timeBlocks: TimeBlock[];
  eveningReflection: {
    completed: boolean;
    questions: string[];
    answers?: string[];
  };
}