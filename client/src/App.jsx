import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import QuizPage from './pages/QuizPage';

function AppContent() {
  const [currentView, setCurrentView] = useState('home');
  const { isAuthenticated, isTeacher, isStudent } = useAuth();

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage setCurrentView={setCurrentView} />;
      case 'login':
        return <LoginPage setCurrentView={setCurrentView} />;
      case 'register':
        return <RegisterPage setCurrentView={setCurrentView} />;
      case 'quiz':
        return <QuizPage setCurrentView={setCurrentView} />;
      case 'dashboard':
        if (!isAuthenticated) {
          return <LoginPage setCurrentView={setCurrentView} />;
        }
        return isTeacher ? (
          <TeacherDashboard setCurrentView={setCurrentView} />
        ) : (
          <StudentDashboard setCurrentView={setCurrentView} />
        );
      default:
        return <HomePage setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cyber-lightBg dark:bg-cyber-darkBg text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderView()}
      </main>

      <Footer />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
