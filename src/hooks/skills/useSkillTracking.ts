import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserSkills, trackSkill, updateSkillTracking, deleteSkillTracking } from '../../services/skills';
import type { Database } from '../../types/database';

type SkillTracking = Database['public']['Tables']['user_skills_tracking']['Row'] & {
  skills: {
    name: string;
    category: string;
  };
};

type SkillTrackingInsert = Database['public']['Tables']['user_skills_tracking']['Insert'];
type SkillTrackingUpdate = Database['public']['Tables']['user_skills_tracking']['Update'];

export function useSkillTracking() {
  const { user } = useAuth();
  const [skills, setSkills] = useState<SkillTracking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    async function loadSkills() {
      try {
        const data = await getUserSkills(user.id);
        setSkills(data);
      } catch (error) {
        console.error('Error loading skills:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadSkills();
  }, [user?.id]);

  const track = async (data: Omit<SkillTrackingInsert, 'user_id'>) => {
    if (!user?.id) return;

    try {
      const newTracking = await trackSkill({
        ...data,
        user_id: user.id,
      });
      await loadSkills(); // Reload to get the skills relation
      return newTracking;
    } catch (error) {
      console.error('Error tracking skill:', error);
      throw error;
    }
  };

  const update = async (trackingId: string, updates: SkillTrackingUpdate) => {
    try {
      const updated = await updateSkillTracking(trackingId, updates);
      await loadSkills(); // Reload to get the skills relation
      return updated;
    } catch (error) {
      console.error('Error updating skill tracking:', error);
      throw error;
    }
  };

  const remove = async (trackingId: string) => {
    try {
      await deleteSkillTracking(trackingId);
      setSkills(prev => prev.filter(s => s.id !== trackingId));
    } catch (error) {
      console.error('Error deleting skill tracking:', error);
      throw error;
    }
  };

  const loadSkills = async () => {
    if (!user?.id) return;
    
    try {
      const data = await getUserSkills(user.id);
      setSkills(data);
    } catch (error) {
      console.error('Error reloading skills:', error);
      throw error;
    }
  };

  return {
    skills,
    isLoading,
    track,
    update,
    remove,
  };
}