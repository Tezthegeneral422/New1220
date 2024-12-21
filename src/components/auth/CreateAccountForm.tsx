import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import { StepIndicator } from '../common/StepIndicator';
import { AccountCredentialsStep } from './steps/AccountCredentialsStep';
import { CareerGoalsStep } from './steps/CareerGoalsStep';
import { PreferencesStep } from './steps/PreferencesStep';
import { SkillsStep } from './steps/SkillsStep';
import { SubscriptionStep } from './steps/SubscriptionStep';
import { validateEmail, validatePassword, validateName } from '../../utils/auth/validation';
import { signUp } from '../../services/auth/authService';
import { isUserExistsError } from '../../utils/auth/errorMessages';
import type { OnboardingData } from '../../types/onboarding';

const INITIAL_DATA: OnboardingData = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  goals: [],
  careerFocus: [],
  careerLevel: null,
  currentSkills: [],
  desiredSkills: [],
  trackingPreferences: [],
  courseInterest: false,
  courseCategories: [],
  jobRecommendations: false,
  assessmentInterest: false,
  selectedPlanId: 'free'
};

export function CreateAccountForm() {
  const [data, setData] = useState(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    currentStepIndex,
    step,
    steps,
    isFirstStep,
    isLastStep,
    back,
    next,
  } = useMultiStepForm([
    <AccountCredentialsStep {...data} updateFields={updateFields} />,
    <CareerGoalsStep {...data} updateFields={updateFields} />,
    <SkillsStep {...data} updateFields={updateFields} />,
    <PreferencesStep {...data} updateFields={updateFields} />,
    <SubscriptionStep {...data} updateFields={updateFields} />
  ]);

  function updateFields(fields: Partial<OnboardingData>) {
    setData(prev => ({ ...prev, ...fields }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isLastStep) {
      if (currentStepIndex === 0) {
        // Validate first step fields
        const emailValidation = validateEmail(data.email);
        if (!emailValidation.valid) {
          toast.error(emailValidation.error);
          return;
        }

        const passwordValidation = validatePassword(data.password);
        if (!passwordValidation.valid) {
          toast.error(passwordValidation.error);
          return;
        }

        const firstNameValidation = validateName(data.firstName);
        if (!firstNameValidation.valid) {
          toast.error(`First name: ${firstNameValidation.error}`);
          return;
        }

        const lastNameValidation = validateName(data.lastName);
        if (!lastNameValidation.valid) {
          toast.error(`Last name: ${lastNameValidation.error}`);
          return;
        }
      }
      next();
      return;
    }

    setIsSubmitting(true);

    try {
      await signUp(data.email, data.password, {
        first_name: data.firstName,
        last_name: data.lastName,
        onboarding_data: {
          career_level: data.careerLevel,
          career_focus: data.careerFocus,
          goals: data.goals,
          current_skills: data.currentSkills,
          desired_skills: data.desiredSkills,
          tracking_preferences: data.trackingPreferences,
          selected_plan_id: data.selectedPlanId
        }
      });

      toast.success('Account created successfully! Please sign in.');
      navigate('/login');
    } catch (error: any) {
      if (isUserExistsError(error)) {
        toast.error('An account with this email already exists. Please sign in instead.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error('Failed to create account. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-background-card py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <StepIndicator
                currentStep={currentStepIndex + 1}
                totalSteps={steps.length}
              />
            </div>

            {step}

            <div className="mt-6 flex justify-between">
              {!isFirstStep && (
                <button
                  type="button"
                  onClick={back}
                  className="text-button-primary hover:opacity-80"
                  disabled={isSubmitting}
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className="ml-auto btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Account...' : isLastStep ? 'Create Account' : 'Next'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}