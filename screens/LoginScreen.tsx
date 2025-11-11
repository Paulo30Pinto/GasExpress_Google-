import React, { useState } from 'react';
import Button from '../components/Button';
import FlameIcon from '../components/FlameIcon';
import Input from '../components/Input';
import { Screen } from '../types';

interface LoginScreenProps {
  onNavigate: (screen: Screen) => void;
  onBack: () => void;
}

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
    </svg>
);


const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigate, onBack }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="flex flex-col items-center text-center space-y-6 animate-fade-in">
        <button onClick={onBack} className="absolute top-4 left-4 text-gray-500 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
        </button>
      <FlameIcon className="w-16 h-16 text-orange-500" />
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Seja Bem Vindo</h1>
        <p className="text-gray-500 mt-1">Faça login para continuar</p>
      </div>

      <div className="w-full space-y-4 pt-4">
        <Input icon={<PhoneIcon />} placeholder="Número de telefone ou Email" type="text" />
        <Input 
            icon={<LockIcon />} 
            placeholder="Senha" 
            type={passwordVisible ? "text" : "password"} 
            trailingIcon={
                <button onClick={() => setPasswordVisible(!passwordVisible)} className="focus:outline-none">
                    {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
                </button>
            }
        />
      </div>

      <div className="w-full text-right">
        <a href="#" className="text-sm font-medium text-orange-500 hover:underline">
          Esqueci minha senha
        </a>
      </div>

      <Button onClick={() => onNavigate(Screen.Home)}>Entrar</Button>

      <div className="mt-6 text-center text-gray-600">
        Não tem uma conta?{' '}
        <button onClick={() => onNavigate(Screen.SignUp)} className="font-semibold text-orange-500 hover:underline">
          Cadastre-se
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;