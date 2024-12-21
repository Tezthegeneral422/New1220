import { z } from 'zod';

// Email validation schema with custom error message
const emailSchema = z.string().email('Please enter a valid email address (e.g., user@example.com)');

// Password validation schema with detailed requirements
const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

// Name validation schema
const nameSchema = z.string()
  .min(2, 'Name must be at least 2 characters')
  .regex(/^[a-zA-Z\s-']+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes');

export function validateEmail(email: string): { valid: boolean; error?: string } {
  const result = emailSchema.safeParse(email);
  return {
    valid: result.success,
    error: result.success ? undefined : result.error.errors[0].message
  };
}

export function validatePassword(password: string): { valid: boolean; error?: string } {
  const result = passwordSchema.safeParse(password);
  return {
    valid: result.success,
    error: result.success ? undefined : result.error.errors[0].message
  };
}

export function validateName(name: string): { valid: boolean; error?: string } {
  const result = nameSchema.safeParse(name);
  return {
    valid: result.success,
    error: result.success ? undefined : result.error.errors[0].message
  };
}