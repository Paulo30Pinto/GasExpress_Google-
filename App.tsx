import React, { useState, useCallback, useMemo } from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';
import { Screen } from './types';
import type { UserRole } from './types';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  color: string;
  quantity: number;
}

export interface Notification {
  id: number;
  type: 'location' | 'user';
  text: string;
  action: 'star' | 'heart';
}

const initialNotifications: Notification[] = [
    { id: 1, type: 'location', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipson', action: 'star' },
    { id: 2, type: 'user', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipson', action: 'heart' },
    { id: 3, type: 'location', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipson', action: 'star' },
];

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Welcome);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const navigateTo = useCallback((screen: Screen) => {
    if (screen === Screen.Welcome) {
      setCart([]); // Reset cart on logout
    }
    setCurrentScreen(screen);
  }, []);

  const handleAddToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === product.id);
        if (existingItem) {
            return prevCart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            return [...prevCart, { ...product, quantity: 1 }];
        }
    });
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
      if (newQuantity < 1) {
          handleRemoveFromCart(productId);
          return;
      }
      setCart(prevCart =>
          prevCart.map(item =>
              item.id === productId ? { ...item, quantity: newQuantity } : item
          )
      );
  };

  const handleRemoveFromCart = (productId: number) => {
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const cartItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const notificationCount = useMemo(() => notifications.length, [notifications]);

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.Login:
        return <LoginScreen onNavigate={navigateTo} onBack={() => navigateTo(Screen.Welcome)} />;
      case Screen.SignUp:
        return <SignUpScreen onNavigate={navigateTo} onBack={() => navigateTo(Screen.Welcome)} />;
      case Screen.Home:
        return <HomeScreen 
          onNavigate={navigateTo} 
          onAddToCart={handleAddToCart}
          cartCount={cartItemCount}
          notificationCount={notificationCount}
          activeScreen={currentScreen}
        />;
      case Screen.Cart:
        return <CartScreen 
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveFromCart={handleRemoveFromCart}
          onNavigate={navigateTo}
          notificationCount={notificationCount}
          activeScreen={currentScreen}
        />;
      case Screen.Notifications:
        return <NotificationsScreen
          notifications={notifications}
          onNavigate={navigateTo}
          cartCount={cartItemCount}
          notificationCount={notificationCount}
          activeScreen={currentScreen}
        />;
       case Screen.Profile:
        return <ProfileScreen
          onNavigate={navigateTo}
          cartCount={cartItemCount}
          notificationCount={notificationCount}
          activeScreen={currentScreen}
        />;
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
