
import React from 'react';
import Button from '../components/Button';
import FlameIcon from '../components/FlameIcon';
import { Screen, UserRole } from '../types';

interface WelcomeScreenProps {
  onNavigate: (screen: Screen, type?: UserRole) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 h-full">
      <FlameIcon className="w-24 h-24 text-orange-500 mb-4" />
      <h1 className="text-3xl font-bold text-gray-800">Seja Bem Vindo</h1>
      
      <div className="w-full space-y-4 pt-4">
        <Button onClick={() => onNavigate(Screen.Login, UserRole.Client)}>
          Conta Cliente
        </Button>
        <Button onClick={() => onNavigate(Screen.Login, UserRole.Seller)}>
          Conta Vendedor
        </Button>
      </div>

      <button
        onClick={() => onNavigate(Screen.SignUp)}
        className="mt-8 text-gray-600 hover:text-orange-500 transition-colors"
      >
        Não tenho conta, <span className="font-semibold">Criar novo</span>
      </button>
    </div>
  );
};

export default WelcomeScreen;
    