import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserProfile, updateUserProfile } from '../../services/auth/userService';
import type { Database } from '../../types/database';

type Profile = Database['public']['Tables']['user_profiles']['Row'];

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user?.id) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    async function loadProfile() {
      try {
        const data = await getUserProfile(user.id);
        if (isMounted) {
          setProfile(data);
          setError(null);
        }
      } catch (err) {
        console.error('Error loading profile:', err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to load profile'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  const update = async (updates: Partial<Profile>) => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      const updated = await updateUserProfile(user.id, updates);
      setProfile(updated);
      setError(null);
      return updated;
    } catch (err) {
      console.error('Error updating profile:', err);
      const error = err instanceof Error ? err : new Error('Failed to update profile');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { profile, isLoading, error, update };
}