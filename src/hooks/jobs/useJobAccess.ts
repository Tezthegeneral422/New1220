import { useSubscription } from '../subscriptions/useSubscription';

export function useJobAccess() {
  const { subscription } = useSubscription();
  const isPaidUser = subscription?.status === 'active' && subscription.plan?.price > 0;

  const getAccessibleJobs = (jobs: any[]) => {
    if (isPaidUser) return jobs;
    // Show only first two jobs for free users
    return jobs.map((job, index) => ({
      ...job,
      isAccessible: index < 2
    }));
  };

  return {
    isPaidUser,
    getAccessibleJobs
  };
}