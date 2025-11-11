import React from 'react';
import { HomeIcon, CartIcon, NotificationIcon, ProfileIcon } from './Icons';
import { Screen } from '../types';

interface BottomNavProps {
  cartCount: number;
  notificationCount: number;
  onNavigate: (screen: Screen) => void;
  activeScreen: Screen;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; count?: number; isActive?: boolean; onClick: () => void; }> = ({ icon, label, count, isActive, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center w-1/4 transition-colors ${isActive ? 'text-white' : 'text-orange-200 hover:text-white'}`}>
    <div className="relative">
      {icon}
      {count !== undefined && count > 0 && (
        <span className="absolute -top-1 -right-2.5 flex items-center justify-center w-5 h-5 text-xs font-bold text-orange-500 bg-white rounded-full">
          {count}
        </span>
      )}
    </div>
    <span className="text-xs mt-1">{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ cartCount, notificationCount, onNavigate, activeScreen }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-16 bg-orange-500 shadow-t-lg z-50 max-w-md mx-auto rounded-t-2xl">
      <div className="flex items-center justify-around h-full">
        <NavItem 
            icon={<HomeIcon className="w-6 h-6" />} 
            label="Home"
            isActive={activeScreen === Screen.Home}
            onClick={() => onNavigate(Screen.Home)}
        />
        <NavItem 
            icon={<CartIcon className="w-6 h-6" />} 
            label="Carrinho"
            count={cartCount}
            isActive={activeScreen === Screen.Cart}
            onClick={() => onNavigate(Screen.Cart)}
        />
        <NavItem 
            icon={<NotificationIcon className="w-6 h-6" />} 
            label="Notificações"
            count={notificationCount}
            isActive={activeScreen === Screen.Notifications}
            onClick={() => onNavigate(Screen.Notifications)}
        />
        <NavItem 
            icon={<ProfileIcon className="w-6 h-6" />} 
            label="Perfil"
            isActive={activeScreen === Screen.Profile}
            onClick={() => onNavigate(Screen.Profile)}
        />
      </div>
    </footer>
  );
};

export default BottomNav;
