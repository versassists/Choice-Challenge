import React from 'react';

interface EndScreenProps {
  score: number;
  onRestart: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ score, onRestart }) => {
  return (
    <div className="screen end-screen" style={{padding: '2rem', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '12px'}}>
      <h1 style={{color: '#FFD700'}}>Game Over!</h1>
      <h2>Your Final Score: {score}</h2>
      <button 
        onClick={onRestart}
         style={{
          backgroundColor: '#FFD700',
          color: '#0A2342',
          border: 'none',
          padding: '1rem 2rem',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginTop: '1rem'
        }}
      >Play Again</button>
    </div>
  );
};

export default EndScreen;