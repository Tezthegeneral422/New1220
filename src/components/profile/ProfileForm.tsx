import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useProfile } from '../../hooks/auth/useProfile';
import type { Database } from '../../types/database';

type Profile = Database['public']['Tables']['user_profiles']['Row'];

const CAREER_LEVELS = [
  { value: '', label: 'Select Level' },
  { value: 'entry', label: 'Entry Level' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior Level' },
  { value: 'transitioning', label: 'Career Transition' }
] as const;

interface ProfileFormProps {
  profile: Profile | null;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const { update } = useProfile();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
      career_level: profile?.career_level || '',
      career_focus: profile?.career_focus || []
    }
  });

  const onSubmit = async (data: Partial<Profile>) => {
    try {
      await update(data);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            First Name
          </label>
          <input
            type="text"
            {...register('first_name')}
            className="mt-1 input w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Last Name
          </label>
          <input
            type="text"
            {...register('last_name')}
            className="mt-1 input w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Career Level
          </label>
          <select
            {...register('career_level')}
            className="mt-1 input w-full"
          >
            {CAREER_LEVELS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Career Focus
          </label>
          <select
            multiple
            {...register('career_focus')}
            className="mt-1 input w-full"
          >
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="creative">Creative</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}