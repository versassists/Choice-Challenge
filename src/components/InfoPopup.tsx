import React from 'react';
import { GameItem } from '../types';

interface InfoPopupProps {
  item: GameItem;
  onClose: () => void;
}

const InfoPopup: React.FC<InfoPopupProps> = ({ item, onClose }) => {
  const isNeed = item.type === 'need';
  const titleColor = isNeed ? '#32CD32' : '#FF6B6B';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
      }}
    >
      <div
        style={{
          backgroundColor: '#0A2342',
          padding: '2rem',
          borderRadius: '12px',
          border: '3px solid #FFD700',
          textAlign: 'center',
          maxWidth: '400px',
          color: '#FFFFFF'
        }}
      >
        <h2 style={{ color: titleColor, textTransform: 'uppercase', marginTop: 0 }}>
          {item.name} is a {item.type}
        </h2>
        <p style={{ fontSize: '1.1rem' }}>{item.explanation}</p>
        <button
          onClick={onClose}
          style={{
            backgroundColor: '#FFD700',
            color: '#0A2342',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '1rem',
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default InfoPopup;