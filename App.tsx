import React, { useState, useCallback } from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import { Screen } from './types';
import type { UserRole } from './types';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Welcome);

  const navigateTo = useCallback((screen: Screen) => {
    setCurrentScreen(screen);
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.Login:
        return <LoginScreen onNavigate={navigateTo} onBack={() => navigateTo(Screen.Welcome)} />;
      case Screen.SignUp:
        return <SignUpScreen onNavigate={navigateTo} onBack={() => navigateTo(Screen.Welcome)} />;
      case Screen.Home:
        return <HomeScreen onNavigate={navigateTo} />;
      case Screen.Welcome:
      default:
        return <WelcomeScreen onNavigate={navigateTo} />;
    }
  };

  const isAuthScreen = currentScreen === Screen.Welcome || currentScreen === Screen.Login || currentScreen === Screen.SignUp;

  return (
    <main className={`min-h-screen font-sans ${isAuthScreen ? 'flex items-center justify-center bg-zinc-50' : 'bg-gray-100'}`}>
      <div className={isAuthScreen ? "w-full max-w-md p-4" : "w-full max-w-md mx-auto"}>
        {renderScreen()}
      </div>
    </main>
  );
};

export default App;