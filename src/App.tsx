import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { GoalProvider } from './context/GoalContext';
import { Navigation } from './components/navigation/Navigation';

// Pages
import { Home } from './pages/Home';
import { LoginPage } from './pages/LoginPage';
import { CreateAccountForm } from './components/auth/CreateAccountForm';
import { Dashboard } from './pages/Dashboard';
import { JobBoard } from './pages/JobBoard';
import { JobDetailsPage } from './pages/JobDetailsPage';
import { CourseMarketplace } from './pages/CourseMarketplace';
import { CourseViewer } from './pages/CourseViewer';
import { CourseLearning } from './pages/CourseLearning';
import { CourseCompletion } from './pages/CourseCompletion';
import { CalendarPage } from './pages/CalendarPage';
import { GoalsPage } from './pages/GoalsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SubscriptionPage } from './pages/SubscriptionPage';
import { DailyRoutinePage } from './pages/DailyRoutinePage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <GoalProvider>
            <Router>
              <div className="min-h-screen flex flex-col">
                <Navigation />
                <main className="flex-1">
                  <Toaster position="top-right" />
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/create-account" element={<CreateAccountForm />} />
                    <Route path="/jobs" element={<JobBoard />} />
                    <Route path="/jobs/:jobId" element={<JobDetailsPage />} />

                    {/* Protected Routes */}
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    } />
                    <Route path="/courses" element={
                      <ProtectedRoute>
                        <CourseMarketplace />
                      </ProtectedRoute>
                    } />
                    <Route path="/courses/:courseId" element={
                      <ProtectedRoute>
                        <CourseViewer />
                      </ProtectedRoute>
                    } />
                    <Route path="/courses/:courseId/learn" element={
                      <ProtectedRoute>
                        <CourseLearning />
                      </ProtectedRoute>
                    } />
                    <Route path="/courses/:courseId/complete" element={
                      <ProtectedRoute>
                        <CourseCompletion />
                      </ProtectedRoute>
                    } />
                    <Route path="/calendar" element={
                      <ProtectedRoute>
                        <CalendarPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/goals" element={
                      <ProtectedRoute>
                        <GoalsPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/subscription" element={
                      <ProtectedRoute>
                        <SubscriptionPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/daily-routine" element={
                      <ProtectedRoute>
                        <DailyRoutinePage />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </main>
              </div>
            </Router>
          </GoalProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}