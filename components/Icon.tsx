import React from 'react';

type IconProps = {
  name: string;
  className?: string;
};

const Icon: React.FC<IconProps> = ({ name, className }) => {
  const getIconContent = () => {
    switch (name) {
      case 'player': // A simple robot
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="40" width="50" height="40" rx="5" fill="#B0B0B0"/>
            <rect x="35" y="80" width="10" height="15" fill="#707070"/>
            <rect x="55" y="80" width="10" height="15" fill="#707070"/>
            <rect x="15" y="50" width="10" height="20" rx="5" fill="#707070"/>
            <rect x="75" y="50" width="10" height="20" rx="5" fill="#707070"/>
            <circle cx="50" cy="25" r="15" fill="#D0D0D0"/>
            <circle cx="50" cy="25" r="5" fill="#00AEEF"/>
          </svg>
        );
      case 'heart':
        return (
          <svg viewBox="0 0 24 24" fill="red" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        );
       case 'water':
         return <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 3h14v18H5V3zm2 2v14h10V5H7z" fill="#00AEEF"/><path d="M7 5h10v5H7V5z" fill="#87CEEB"/></svg>;
       case 'toy-car':
         return <svg viewBox="0 0 24 24" fill="#FF4136" xmlns="http://www.w3.org/2000/svg"><path d="M21.5,12c-0.276,0-0.5,0.224-0.5,0.5v1c0,0.827-0.673,1.5-1.5,1.5H18v-2h-3v2H9v-2H6v2H4.5C3.673,15,3,14.327,3,13.5 v-1C3,12.224,2.776,12,2.5,12S2,12.224,2,12.5v1C2,14.879,4.121,17,6.5,17h11c2.379,0,4.5-2.121,4.5-4.5v-1 C22,12.224,21.776,12,21.5,12z M7,18c-1.105,0-2,0.895-2,2s0.895,2,2,2s2-0.895,2-2S8.105,18,7,18z M17,18 c-1.105,0-2,0.895-2,2s0.895,2,2,2s2-0.895,2-2S18.105,18,17,18z M19,8H5C4.448,8,4,8.448,4,9v3h16V9C20,8.448,19.552,8,19,8z"/></svg>;
      default:
        return <span>?</span>;
    }
  };

  return <div className={`w-full h-full ${className}`}>{getIconContent()}</div>;
};

export default Icon;
