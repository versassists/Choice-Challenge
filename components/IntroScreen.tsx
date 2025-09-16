import React from 'react';

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <div className="screen intro-screen" style={{padding: '2rem', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '12px'}}>
      <h1 style={{color: '#FFD700'}}>Choice Challenge™</h1>
      <p>Navigate the maze with your arrow keys.</p>
      <p>Find the item you <strong style={{color: '#32CD32'}}>NEED</strong> and avoid the one you <strong style={{color: '#FF6B6B'}}>WANT</strong>.</p>
      <button 
        onClick={onStart}
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
      >
        Start Challenge
      </button>
    </div>
  );
};

export default IntroScreen;
