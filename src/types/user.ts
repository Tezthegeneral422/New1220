export interface UserSkill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  lastUpdated: Date;
}

export interface UserProfile {
  id: string;
  skills: UserSkill[];
}