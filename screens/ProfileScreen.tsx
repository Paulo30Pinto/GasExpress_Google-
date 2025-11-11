import React from 'react';
import { Screen } from '../types';
import FlameIcon from '../components/FlameIcon';
import BottomNav from '../components/BottomNav';
import { CompassIcon, UserIcon, CogIcon, HeadphonesIcon, LogoutIcon, ChevronRightIcon } from '../components/Icons';

interface ProfileScreenProps {
  onNavigate: (screen: Screen) => void;
  cartCount: number;
  notificationCount: number;
  activeScreen: Screen;
}

const ProfileOption: React.FC<{ icon: React.ReactNode; text: string; onClick: () => void }> = ({ icon, text, onClick }) => (
  <button onClick={onClick} className="w-full bg-white p-3 rounded-xl border border-orange-300 shadow-sm flex items-center space-x-4 transition-transform transform active:scale-95 hover:bg-gray-50">
    <div className="bg-orange-500 rounded-full p-2.5 flex-shrink-0">
      {icon}
    </div>
    <span className="flex-grow text-left font-semibold text-gray-700">{text}</span>
    <ChevronRightIcon className="w-6 h-6 text-gray-400" />
  </button>
);

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigate, cartCount, notificationCount, activeScreen }) => {
  const profileOptions = [
    {
      icon: <UserIcon className="w-6 h-6 text-white" />,
      text: 'Editar Perfil',
      action: () => alert('Editar Perfil clicado!'),
    },
    {
      icon: <CogIcon className="w-6 h-6 text-white" />,
      text: 'Definições',
      action: () => alert('Definições clicado!'),
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6 text-white" />,
      text: 'Ajudas',
      action: () => alert('Ajudas clicado!'),
    },
    {
      icon: <LogoutIcon className="w-6 h-6 text-white" />,
      text: 'Sair do App',
      action: () => onNavigate(Screen.Welcome),
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen pb-20">
      <header className="p-4 flex justify-between items-center">
        <FlameIcon className="w-6 h-6 text-orange-500" />
        <button className="text-gray-600">
          <CompassIcon className="w-7 h-7" />
        </button>
      </header>
      
      <main className="px-4 flex flex-col items-center">
        <div className="relative w-28 h-28 mb-4">
            <div className="w-full h-full bg-white rounded-full border-4 border-orange-500 flex items-center justify-center">
                <svg className="w-20 h-20 text-blue-400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="4" />
                    <path d="M25 75C35 45, 65 45, 75 75" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    <path d="M20 50C40 30, 60 30, 80 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    <path d="M40 25C50 15, 60 15, 70 25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
            </div>
        </div>
        <p className="font-semibold text-gray-500 text-sm tracking-widest">PERFIL</p>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Testado</h1>

        <div className="w-full space-y-4">
          {profileOptions.map((opt) => (
            <ProfileOption key={opt.text} icon={opt.icon} text={opt.text} onClick={opt.action} />
          ))}
        </div>
      </main>
      
      <BottomNav cartCount={cartCount} notificationCount={notificationCount} onNavigate={onNavigate} activeScreen={activeScreen} />
    </div>
  );
};

export default ProfileScreen;
