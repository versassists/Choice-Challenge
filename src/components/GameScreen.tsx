import React, { useState, useEffect } from 'react';
import { MAZE_LAYOUT, TILE_SIZE, PLAYER_LIVES } from '../constants';
import { GameItem, GridPosition } from '../types';
import Avatar from './Avatar';
import ChoiceItem from './ChoiceItem';
import Icon from './Icon';
import ParticleEffect from './ParticleEffect';

interface GameScreenProps {
  playerPosition: GridPosition;
  items: GameItem[];
  lives: number;
  score: number;
  particleEffect: { position: GridPosition; key: number } | null;
}

const GameScreen: React.FC<GameScreenProps> = ({ playerPosition, items, lives, score, particleEffect }) => {
  const mazeWidth = MAZE_LAYOUT[0].length * TILE_SIZE;
  const mazeHeight = MAZE_LAYOUT.length * TILE_SIZE;

  const [stars, setStars] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 40 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 3 + 2}s`
    }));
    setStars(newStars);
  }, []);

  return (
    <div 
      className="game-container" 
      style={{ 
        position: 'relative', 
        width: mazeWidth, 
        height: mazeHeight, 
        backgroundColor: '#1a1a2e',
        backgroundImage: 'radial-gradient(circle, #4a4e69 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        overflow: 'hidden',
        border: '4px solid #FFD700'
      }}
    >
      {/* Background Stars */}
      {stars.map((style, i) => (
        <div key={i} className="star" style={style} />
      ))}

      {/* Maze Walls */}
      {MAZE_LAYOUT.map((row, y) =>
        row.map((tile, x) => {
          if (tile === 1) {
            return (
              <div
                key={`${x}-${y}`}
                style={{
                  position: 'absolute',
                  left: x * TILE_SIZE,
                  top: y * TILE_SIZE,
                  width: TILE_SIZE,
                  height: TILE_SIZE,
                  backgroundColor: '#4a4e69',
                  border: '2px solid #FFD700',
                  boxSizing: 'border-box',
                  zIndex: 1
                }}
              />
            );
          }
          return null;
        })
      )}

      {/* Items */}
      {items.map(item => (
        <ChoiceItem key={item.id} item={item} />
      ))}
      
      {/* Particle Effect */}
      {particleEffect && <ParticleEffect key={particleEffect.key} position={particleEffect.position} />}

      {/* Player */}
      <Avatar position={playerPosition} />

      {/* UI Elements */}
      <div className="game-ui top" style={{position: 'absolute', top: 10, right: 10, display: 'flex', gap: '5px', zIndex: 20}}>
        {Array.from({ length: PLAYER_LIVES }).map((_, i) => (
          <div key={i} style={{ width: '30px', height: '30px', opacity: i < lives ? 1 : 0.3 }}>
            <Icon name="heart" />
          </div>
        ))}
      </div>

       <div className="game-ui bottom" style={{position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: 'rgba(0,0,0,0.7)', padding: '10px', boxSizing: 'border-box', zIndex: 20}}>
        <h2 style={{margin: 0, color: '#FFFFFF', fontSize: '1.2rem'}}>Choose the thing you need</h2>
      </div>
       <div className="game-ui top-left" style={{position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(0,0,0,0.7)', padding: '5px 10px', borderRadius: '5px', zIndex: 20}}>
        <h2 style={{margin: 0, color: '#FFD700', fontSize: '1rem'}}>Score: {score}</h2>
      </div>
    </div>
  );
};

export default GameScreen;