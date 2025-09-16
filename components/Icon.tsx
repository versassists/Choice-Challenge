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
      case 'apple':
        return <svg viewBox="0 0 24 24" fill="#32CD32" xmlns="http://www.w3.org/2000/svg"><path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5,1.917,6.8,6.8,0,0,0,0,8.717c0,4.6,4.2,8.2,6.5,8.2s6.5-3.6,6.5-8.2a1,1,0,0,0-.5-.85,1,1,0,0,0-1,.15,4.4,4.4,0,0,1-5,0,4.8,4.8,0,0,1-3-3.5,4.8,4.8,0,0,1,4-5.5,4.8,4.8,0,0,1,5.5,4,1,1,0,0,0,1,.8,1,1,0,0,0,.8-1.2A6.9,6.9,0,0,0,17.5,1.917Z"/><path d="M19.5,1.917a4.4,4.4,0,0,0-4,2.5,1,1,0,0,0,.5,1.3,1,1,0,0,0,1.3-.5,2.4,2.4,0,0,1,4.5,2,2.4,2.4,0,0,1-2,2.5,1,1,0,0,0-.8,1.2,1,1,0,0,0,1.2.8,4.4,4.4,0,0,0,0-8.8Z"/></svg>
      case 'burger':
        return <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.22,6.28A1,1,0,0,0,5,18H19a1,1,0,0,0,.78-.38,9.89,9.89,0,0,0,2.22-6.28A10,10,0,0,0,12,2Z" fill="#D2691E"/><rect x="5" y="14" width="14" height="2" fill="#8B4513"/><rect x="5" y="11" width="14" height="2" fill="#FFD700"/><rect x="5" y="8" width="14" height="2" fill="#228B22"/></svg>;
      case 'game-controller':
        return <svg viewBox="0 0 24 24" fill="#555" xmlns="http://www.w3.org/2000/svg"><path d="M15,7.5V2H9v5.5l3,3,3-3z M7.5,9H2v6h5.5l3-3-3-3z M9,16.5V22h6v-5.5l-3-3-3,3z M16.5,9l-3,3,3,3H22V9h-5.5z"/></svg>;
      case 'book':
        return <svg viewBox="0 0 24 24" fill="#8B4513" xmlns="http://www.w3.org/2000/svg"><path d="M19,2H5A3,3,0,0,0,2,5V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V5A3,3,0,0,0,19,2Zm-7,2h5V19H12Zm-2,0V19H5V5A1,1,0,0,1,6,4H10Z"/><rect x="14" y="6" width="4" height="2" fill="#FFF"/><rect x="14" y="10" width="4" height="2" fill="#FFF"/></svg>;
      default:
        return <span>?</span>;
    }
  };

  return <div className={`w-full h-full ${className}`}>{getIconContent()}</div>;
};

export default Icon;