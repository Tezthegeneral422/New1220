import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { validateEmail } from '../../utils/auth/validation';
import { resetPassword } from '../../services/auth/passwordService';

interface ForgotPasswordFormProps {
  onCancel: () => void;
}

export function ForgotPasswordForm({ onCancel }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      toast.error(emailValidation.error);
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword(email);
      toast.success('Password reset instructions sent to your email');
      onCancel();
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('Failed to send reset instructions. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email address
        </label>
        <div className="mt-1 relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input pl-10 w-full"
            placeholder="user@example.com"
            required
          />
        </div>
      </div>

      <div className="flex justify-between space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 btn-primary"
        >
          {isSubmitting ? 'Sending...' : 'Reset Password'}
        </button>
      </div>
    </form>
  );
}