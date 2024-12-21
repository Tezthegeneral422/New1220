// ... existing imports ...

export function OnboardingPage() {
  // ... existing code ...

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLastStep) {
      next();
      return;
    }

    if (!validateEmail(data.email).valid) {
      toast.error('Please enter a valid email address');
      return;
    }

    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.valid) {
      toast.error(passwordValidation.error);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
          },
        },
      });

      if (error) {
        if (error.status === 422) {
          toast.error('An account with this email already exists. Please sign in instead.');
          setTimeout(() => navigate('/login'), 2000);
          return;
        }
        throw error;
      }

      toast.success('Account created successfully! Please sign in.');
      navigate('/login');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(getAuthErrorMessage(error));
    }
  };

  // ... rest of the component
}