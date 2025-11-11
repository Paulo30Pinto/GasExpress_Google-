
import React from 'react';

const FlameIcon: React.FC<{ className?: string }> = ({ className = "w-20 h-20 text-orange-500" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 2C12 2 4 8.5 4 14.5C4 18.0899 6.91015 21 10.5 21C14.0899 21 17 18.0899 17 14.5C17 8.5 12 2 12 2ZM12 18.5C10.067 18.5 8.5 16.933 8.5 15C8.5 13.067 10.067 11.5 12 11.5C13.933 11.5 15.5 13.067 15.5 15C15.5 16.933 13.933 18.5 12 18.5Z" 
      transform="translate(0 -1)" 
    />
  </svg>
);

export default FlameIcon;
    