import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useProfile } from '../../hooks/auth/useProfile';
import type { Database } from '../../types/database';

type Profile = Database['public']['Tables']['user_profiles']['Row'];

interface PreferencesFormProps {
  profile: Profile | null;
}

interface PreferencesFormData {
  tracking_preferences: string[];
}

const TRACKING_OPTIONS = [
  { value: 'productivity', label: 'Productivity Tracking' },
  { value: 'skills', label: 'Skills Development Tracking' },
  { value: 'work-life', label: 'Work-Life Balance Tracking' }
] as const;

export function PreferencesForm({ profile }: PreferencesFormProps) {
  const { update } = useProfile();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<PreferencesFormData>({
    defaultValues: {
      tracking_preferences: profile?.tracking_preferences || []
    }
  });

  const onSubmit = async (data: PreferencesFormData) => {
    try {
      await update(data);
      toast.success('Preferences updated successfully');
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast.error('Failed to update preferences');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          Tracking Preferences
        </label>
        <div className="space-y-2">
          {TRACKING_OPTIONS.map(({ value, label }) => (
            <label key={value} className="flex items-center">
              <input
                type="checkbox"
                value={value}
                {...register('tracking_preferences')}
                className="rounded border-gray-300 text-button-primary focus:ring-button-primary"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
        >
          {isSubmitting ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </form>
  );
}