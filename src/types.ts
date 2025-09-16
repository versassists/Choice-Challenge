export type GameScreen = 'intro' | 'game' | 'end';

export interface GridPosition {
  x: number;
  y: number;
}

export type ItemType = 'need' | 'want';

export interface GameItem {
  id: number;
  position: GridPosition;
  type: ItemType;
  name: string;
  explanation: string;
}

export interface GameState {
  currentScreen: GameScreen;
  playerPosition: GridPosition;
  items: GameItem[];
  score: number;
  lives: number;
}