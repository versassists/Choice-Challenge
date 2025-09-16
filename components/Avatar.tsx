import React from 'react';
import { GridPosition } from '../types';
import { TILE_SIZE } from '../constants';
import Icon from './Icon';

interface AvatarProps {
  position: GridPosition;
}

const Avatar: React.FC<AvatarProps> = ({ position }) => {
  return (
    <div
      className="player-avatar"
      style={{
        position: 'absolute',
        left: position.x * TILE_SIZE,
        top: position.y * TILE_SIZE,
        width: TILE_SIZE,
        height: TILE_SIZE,
        transition: 'left 0.1s linear, top 0.1s linear',
        zIndex: 10,
      }}
    >
      <Icon name="player" />
    </div>
  );
};

export default Avatar;
