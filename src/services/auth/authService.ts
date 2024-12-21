import { supabase } from '../../lib/supabase';
import { toast } from 'react-hot-toast';
import { getAuthErrorMessage, isUserExistsError } from '../../utils/auth/errorMessages';
import { createUserProfile } from './userService';
import type { AuthError } from '@supabase/supabase-js';

export async function signUp(email: string, password: string, metadata: { 
  first_name: string; 
  last_name: string;
}) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      }
    });

    if (error) {
      if (isUserExistsError(error)) {
        toast.error('An account with this email already exists. Please sign in instead.');
        throw error;
      }
      throw error;
    }

    if (data.user) {
      // Create user profile
      await createUserProfile(data.user.id, {
        first_name: metadata.first_name,
        last_name: metadata.last_name,
        career_level: null,
        career_focus: [],
        tracking_preferences: []
      });
    }

    toast.success('Account created successfully! Please sign in.');
    return { user: data.user };
  } catch (error) {
    const authError = error as AuthError;
    console.error('Signup error:', authError);
    if (!isUserExistsError(authError)) {
      toast.error(getAuthErrorMessage(authError));
    }
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    // Ensure profile exists
    if (data.user) {
      try {
        await createUserProfile(data.user.id, {
          first_name: data.user.user_metadata.first_name,
          last_name: data.user.user_metadata.last_name
        });
      } catch (profileError) {
        console.error('Error ensuring user profile:', profileError);
      }
    }

    return { user: data.user };
  } catch (error) {
    const authError = error as AuthError;
    console.error('Login error:', authError);
    toast.error(getAuthErrorMessage(authError));
    throw error;
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Signout error:', error);
    toast.error('Failed to sign out. Please try again.');
    throw error;
  }
}

export function isAuthError(error: unknown): error is AuthError {
  return typeof error === 'object' && error !== null && '__isAuthError' in error;
}