// Generated Supabase Database Types
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          career_level: 'entry' | 'mid' | 'senior' | 'transitioning' | null
          career_focus: string[]
          tracking_preferences: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          career_level?: 'entry' | 'mid' | 'senior' | 'transitioning' | null
          career_focus?: string[]
          tracking_preferences?: string[]
        }
        Update: Partial<Database['public']['Tables']['user_profiles']['Insert']>
      }
      user_routines: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          schedule: string[]
          streak: number
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          title: string
          description?: string | null
          schedule?: string[]
          streak?: number
        }
        Update: Partial<Database['public']['Tables']['user_routines']['Insert']>
      }
      user_goals: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          type: 'skill' | 'course' | 'career' | 'project'
          target_date: string | null
          progress: number
          completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          title: string
          description?: string | null
          type: 'skill' | 'course' | 'career' | 'project'
          target_date?: string | null
          progress?: number
          completed?: boolean
        }
        Update: Partial<Database['public']['Tables']['user_goals']['Insert']>
      }
      user_skills_tracking: {
        Row: {
          id: string
          user_id: string
          skill_id: string
          level: 'beginner' | 'intermediate' | 'advanced'
          last_assessed: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          skill_id: string
          level: 'beginner' | 'intermediate' | 'advanced'
          last_assessed?: string | null
        }
        Update: Partial<Database['public']['Tables']['user_skills_tracking']['Insert']>
      }
      skill_assessments: {
        Row: {
          id: string
          user_id: string
          skill_id: string
          score: number
          completed_at: string
          next_assessment_at: string | null
          created_at: string
        }
        Insert: {
          user_id: string
          skill_id: string
          score: number
          completed_at?: string
          next_assessment_at?: string | null
        }
        Update: Partial<Database['public']['Tables']['skill_assessments']['Insert']>
      }
      course_reviews: {
        Row: {
          id: string
          user_id: string
          course_id: string
          rating: number
          review: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          course_id: string
          rating: number
          review?: string | null
        }
        Update: Partial<Database['public']['Tables']['course_reviews']['Insert']>
      }
      user_notifications: {
        Row: {
          id: string
          user_id: string
          type: string
          title: string
          message: string
          read: boolean
          created_at: string
        }
        Insert: {
          user_id: string
          type: string
          title: string
          message: string
          read?: boolean
        }
        Update: Partial<Database['public']['Tables']['user_notifications']['Insert']>
      }
    }
  }
}