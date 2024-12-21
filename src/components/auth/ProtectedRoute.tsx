import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SubscriptionGate } from './SubscriptionGate';
import { LoadingScreen } from '../common/LoadingScreen';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresSubscription?: boolean;
}

export function ProtectedRoute({ children, requiresSubscription = true }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiresSubscription) {
    return <SubscriptionGate>{children}</SubscriptionGate>;
  }

  return <>{children}</>;
}