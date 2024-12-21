import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { signIn, signOut, signUp, isAuthError } from '../services/auth/authService';
import { createUserProfile } from '../services/auth/userService';
import { getAuthErrorMessage } from '../utils/auth/errorMessages';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string, metadata: { 
    first_name: string; 
    last_name: string; 
  }) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignUp = async (
    email: string, 
    password: string, 
    metadata: { first_name: string; last_name: string }
  ) => {
    try {
      const { user } = await signUp(email, password, metadata);
      if (user) {
        await createUserProfile(user.id, {
          first_name: metadata.first_name,
          last_name: metadata.last_name,
        });
      }
      toast.success('Account created successfully! Please sign in.');
    } catch (error) {
      console.error('Signup error:', error);
      if (isAuthError(error)) {
        toast.error(getAuthErrorMessage(error));
      } else {
        toast.error('An error occurred during signup');
      }
      throw error;
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      const { user } = await signIn(email, password);
      setUser(user);
      toast.success('Signed in successfully');
    } catch (error) {
      console.error('Login error:', error);
      if (isAuthError(error)) {
        toast.error(getAuthErrorMessage(error));
      } else {
        toast.error('An error occurred during sign in');
      }
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Signout error:', error);
      toast.error('An error occurred during sign out');
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signUp: handleSignUp,
    signIn: handleSignIn,
    signOut: handleSignOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}