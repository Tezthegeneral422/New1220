import { AuthError } from '@supabase/supabase-js';

export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'user_already_exists': 'An account with this email already exists. Please sign in instead.',
  'invalid_credentials': 'Invalid email or password. Please try again.',
  'invalid_email': 'Please enter a valid email address.',
  'weak_password': 'Password must be at least 8 characters long.',
  'email_not_confirmed': 'Please verify your email address.',
  'default': 'An error occurred. Please try again.'
};

export function getAuthErrorMessage(error: AuthError | null): string {
  if (!error) return AUTH_ERROR_MESSAGES.default;
  
  // Handle Supabase auth errors
  if (error.status === 422) {
    return AUTH_ERROR_MESSAGES.user_already_exists;
  }

  if (error.message) {
    return AUTH_ERROR_MESSAGES[error.message] || error.message;
  }

  return AUTH_ERROR_MESSAGES.default;
}

export function isUserExistsError(error: AuthError): boolean {
  return error.status === 422 || error.message === 'user_already_exists';
}