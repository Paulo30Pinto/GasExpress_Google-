
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ icon, trailingIcon, ...props }) => {
  return (
    <div className="relative w-full">
      {icon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
          {icon}
        </span>
      )}
      <input
        className={`w-full py-3 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow shadow-sm ${icon ? 'pl-12' : ''} ${trailingIcon ? 'pr-12' : ''}`}
        {...props}
      />
      {trailingIcon && (
         <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
          {trailingIcon}
        </span>
      )}
    </div>
  );
};

export default Input;
    