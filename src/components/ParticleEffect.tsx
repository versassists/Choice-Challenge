import React from 'react';
import { GridPosition } from '../types';
import { TILE_SIZE } from '../constants';

interface ParticleEffectProps {
  position: GridPosition;
}

const PARTICLE_COUNT = 15;

const ParticleEffect: React.FC<ParticleEffectProps> = ({ position }) => {
  const particles = Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
    const angle = (i / PARTICLE_COUNT) * 2 * Math.PI;
    const distance = Math.random() * 40 + 20; // Increased distance
    const style: React.CSSProperties = {
      // @ts-ignore
      '--tx': `${Math.cos(angle) * distance}px`,
      '--ty': `${Math.sin(angle) * distance}px`,
      width: `${Math.random() * 5 + 3}px`,
      height: `${Math.random() * 5 + 3}px`,
      animationDelay: `${Math.random() * 0.1}s`,
    };
    return <div key={i} className="particle" style={style} />;
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x * TILE_SIZE + TILE_SIZE / 2,
        top: position.y * TILE_SIZE + TILE_SIZE / 2,
        width: 1,
        height: 1,
        zIndex: 20,
      }}
    >
      {particles}
    </div>
  );
};

export default ParticleEffect;