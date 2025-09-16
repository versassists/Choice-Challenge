import React from 'react';
import { GameItem } from '../types';
import { TILE_SIZE } from '../constants';
import Icon from './Icon';

interface ChoiceItemProps {
  item: GameItem;
}

const ChoiceItem: React.FC<ChoiceItemProps> = ({ item }) => {
  const isNeed = item.type === 'need';

  return (
    <div
      className="game-item"
      style={{
        position: 'absolute',
        left: item.position.x * TILE_SIZE,
        top: item.position.y * TILE_SIZE,
        width: TILE_SIZE,
        height: TILE_SIZE,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2px',
        backgroundColor: '#fff',
        border: '3px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
        animation: isNeed 
          ? 'pulsing-glow-need 2s infinite ease-in-out' 
          : 'pulsing-glow-want 2s infinite ease-in-out'
      }}
    >
      <div style={{width: '70%', height: '70%'}}>
        <Icon name={item.name.toLowerCase().replace(' ', '-')} />
      </div>
      <span style={{ fontSize: '8px', color: '#000', fontWeight: 'bold', textTransform: 'uppercase' }}>{item.name}</span>
    </div>
  );
};

export default ChoiceItem;