
import React, { useState, useMemo, useRef } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { Screen, UserRole } from '../types';

interface SignUpScreenProps {
  onNavigate: (screen: Screen) => void;
  onBack: () => void;
}

const CameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const ClientIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);
const SellerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
);


const SignUpScreen: React.FC<SignUpScreenProps> = ({ onNavigate, onBack }) => {
    const [role, setRole] = useState<UserRole>(UserRole.Client);
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);


    const isFormValid = useMemo(() => {
        return name.trim() !== '' && phone.trim() !== '' && password.length >= 6;
    }, [name, phone, password]);

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4 animate-fade-in relative pb-24">
            <button onClick={onBack} className="absolute top-0 left-0 text-gray-500 hover:text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <h1 className="text-3xl font-bold text-gray-800 text-center">Seja Bem Vindo</h1>

            <div className="pt-4">
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" />
                <button onClick={() => fileInputRef.current?.click()} className="relative w-32 h-32 bg-gray-100 rounded-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:bg-gray-200 transition-colors">
                    {photo ? (
                        <img src={URL.createObjectURL(photo)} alt="Preview" className="w-full h-full object-cover rounded-full" />
                    ) : (
                        <>
                            <CameraIcon />
                            <span className="text-sm font-medium text-gray-600 mt-1">Adicionar Foto</span>
                            <span className="text-xs text-gray-400">(Opcional)</span>
                        </>
                    )}
                </button>
            </div>

            <div>
                <p className="text-lg font-semibold text-gray-700">Você é:</p>
                <div className="flex space-x-4 mt-2">
                    <button onClick={() => setRole(UserRole.Client)} className={`flex items-center justify-center w-36 py-3 px-4 rounded-xl border-2 transition-all ${role === UserRole.Client ? 'bg-orange-500 border-orange-500 text-white shadow-lg' : 'bg-white border-gray-300 text-gray-600'}`}>
                        <span className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${role === UserRole.Client ? 'border-white' : 'border-gray-400'}`}>
                            {role === UserRole.Client && <span className="w-2.5 h-2.5 bg-white rounded-full"></span>}
                        </span>
                        <ClientIcon />
                        Cliente
                    </button>
                    <button onClick={() => setRole(UserRole.Seller)} className={`flex items-center justify-center w-36 py-3 px-4 rounded-xl border-2 transition-all ${role === UserRole.Seller ? 'bg-orange-500 border-orange-500 text-white shadow-lg' : 'bg-white border-gray-300 text-gray-600'}`}>
                        <span className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${role === UserRole.Seller ? 'border-white' : 'border-gray-400'}`}>
                            {role === UserRole.Seller && <span className="w-2.5 h-2.5 bg-white rounded-full"></span>}
                        </span>
                        <SellerIcon />
                        Vendedor
                    </button>
                </div>
            </div>

            <div className="w-full space-y-4 pt-2">
                <Input placeholder="Seu Nome" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <Input placeholder="Email (opcional)" type="email" />
                <Input placeholder="Seu número de telefone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <Input placeholder="Palavra passe (mínimo 6 caracteres)" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
                 <Button onClick={() => alert('Cadastro clicado!')} disabled={!isFormValid}>
                    Cadastrar-se
                </Button>
            </div>
        </div>
    );
};

export default SignUpScreen;
    