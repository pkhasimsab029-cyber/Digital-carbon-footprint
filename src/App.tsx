import React from 'react';
import { EcoProvider, useEco } from './context/EcoContext';
import { AuthPage } from './pages/AuthPage';
import { AddActivityPage } from './pages/AddActivityPage';
import { ProcessingPage } from './pages/ProcessingPage';
import { MachineLearningPage } from './pages/MachineLearningPage';
import { DashboardPage } from './pages/DashboardPage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { ProfilePage } from './pages/ProfilePage';

const AppContent: React.FC = () => {
  const { currentRoute, isAuthenticated } = useEco();

  // If user is not authenticated and attempts to access protected route, show Auth
  if (!isAuthenticated && currentRoute !== '/auth') {
    return <AuthPage />;
  }

  switch (currentRoute) {
    case '/auth':
      return <AuthPage />;
    case '/add-activity':
      return <AddActivityPage />;
    case '/processing':
      return <ProcessingPage />;
    case '/machine-learning':
    case '/analytics':
      return <MachineLearningPage />;
    case '/dashboard':
      return <DashboardPage />;
    case '/activities':
      return <ActivitiesPage />;
    case '/recommendations':
      return <RecommendationsPage />;
    case '/profile':
      return <ProfilePage />;
    default:
      return <DashboardPage />;
  }
};

export function App() {
  return (
    <EcoProvider>
      <AppContent />
    </EcoProvider>
  );
}

export default App;
