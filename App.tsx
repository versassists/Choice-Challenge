import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { GameState, GameScreen, GameItem, GridPosition } from './types';
import { MAZE_LAYOUT, PLAYER_LIVES, TILE_SIZE } from './constants';
import IntroScreen from './components/IntroScreen';
import GameScreenComponent from './components/GameScreen';
import EndScreen from './components/EndScreen';
import InfoPopup from './components/InfoPopup';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentScreen: 'intro',
    playerPosition: { x: 1, y: 1 },
    items: [],
    score: 0,
    lives: PLAYER_LIVES,
  });
  const [loading, setLoading] = useState(false);
  const [popupItem, setPopupItem] = useState<GameItem | null>(null);
  const [particleEffect, setParticleEffect] = useState<{position: GridPosition, key: number} | null>(null);

  const getEmptyPositions = useCallback(() => {
    const emptyPositions: GridPosition[] = [];
    MAZE_LAYOUT.forEach((row, y) => {
      row.forEach((tile, x) => {
        if (tile === 0) {
          emptyPositions.push({ x, y });
        }
      });
    });
    return emptyPositions;
  }, []);

  const generateLevel = useCallback(async () => {
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Generate one common 'need' and one common 'want' for a child, with a simple, one-sentence explanation for each. The items should be simple nouns that can be represented by an icon. Examples - Need: Apple, Water, Book. Want: Toy Car, Burger, Game Controller.",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              need: { type: Type.STRING, description: "A single item that is a need." },
              needExplanation: { type: Type.STRING, description: "A simple explanation of why it's a need." },
              want: { type: Type.STRING, description: "A single item that is a want." },
              wantExplanation: { type: Type.STRING, description: "A simple explanation of why it's a want." },
            },
            required: ["need", "needExplanation", "want", "wantExplanation"]
          },
        },
      });

      const jsonText = response.text.trim();
      const parsed = JSON.parse(jsonText);
      const { need, needExplanation, want, wantExplanation } = parsed;

      const emptyPositions = getEmptyPositions();
      const playerPosIndex = emptyPositions.findIndex(p => p.x === gameState.playerPosition.x && p.y === gameState.playerPosition.y);
      if (playerPosIndex !== -1) {
        emptyPositions.splice(playerPosIndex, 1);
      }

      const needPosIndex = Math.floor(Math.random() * emptyPositions.length);
      const needPos = emptyPositions.splice(needPosIndex, 1)[0];
      
      const wantPosIndex = Math.floor(Math.random() * emptyPositions.length);
      const wantPos = emptyPositions.splice(wantPosIndex, 1)[0];

      const newItems: GameItem[] = [
        { id: 1, position: needPos, type: 'need', name: need, explanation: needExplanation },
        { id: 2, position: wantPos, type: 'want', name: want, explanation: wantExplanation },
      ];

      setGameState(prev => ({ ...prev, items: newItems }));

    } catch (e) {
      console.error("Failed to generate items:", e);
      // Fallback items
       const newItems: GameItem[] = [
        { id: 1, position: {x: 18, y: 9}, type: 'need', name: 'Apple', explanation: 'Your body needs healthy food like apples to grow.' },
        { id: 2, position: {x: 1, y: 9}, type: 'want', name: 'Game Controller', explanation: 'Video games are fun, but not essential for your health or survival.' },
      ];
       setGameState(prev => ({ ...prev, items: newItems }));
    } finally {
        setLoading(false);
    }
  }, [getEmptyPositions, gameState.playerPosition]);


  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      currentScreen: 'game',
      score: 0,
      lives: PLAYER_LIVES,
      playerPosition: { x: 1, y: 1 },
    }));
    generateLevel();
  };

  const restartGame = () => {
    setGameState({
      currentScreen: 'intro',
      playerPosition: { x: 1, y: 1 },
      items: [],
      score: 0,
      lives: PLAYER_LIVES,
    });
  };
  
  const handleClosePopup = () => {
    if (!popupItem) return;

    if (popupItem.type === 'need') {
        setGameState(prev => ({
        ...prev,
        score: prev.score + 10,
        }));
        generateLevel();
    } else { // It's a 'want'
        const newLives = gameState.lives - 1;
        if (newLives <= 0) {
        setGameState(prev => ({...prev, lives: 0, currentScreen: 'end'}));
        } else {
            setGameState(prev => ({
            ...prev,
            lives: newLives,
            }));
            generateLevel();
        }
    }
    setPopupItem(null);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (gameState.currentScreen !== 'game' || loading || popupItem) return;

    let { x, y } = gameState.playerPosition;

    switch (e.key) {
      case 'ArrowUp': y -= 1; break;
      case 'ArrowDown': y += 1; break;
      case 'ArrowLeft': x -= 1; break;
      case 'ArrowRight': x += 1; break;
      default: return;
    }
    
    e.preventDefault();

    if (MAZE_LAYOUT[y] && MAZE_LAYOUT[y][x] === 0) {
      const newPosition = { x, y };
      
      const collectedItem = gameState.items.find(item => item.position.x === x && item.position.y === y);
      
      setGameState(prev => ({ ...prev, playerPosition: newPosition }));

      if (collectedItem) {
        if (collectedItem.type === 'need') {
            setParticleEffect({ position: collectedItem.position, key: Date.now() });
            setTimeout(() => setParticleEffect(null), 1000);
        }
        setPopupItem(collectedItem);
      }
    }
  }, [gameState, loading, popupItem, generateLevel]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const renderScreen = () => {
    switch (gameState.currentScreen) {
      case 'intro':
        return <IntroScreen onStart={startGame} />;
      case 'game':
        return (
          <>
            {loading && gameState.items.length === 0 ? <p>Loading level...</p> : 
            <GameScreenComponent 
                playerPosition={gameState.playerPosition} 
                items={gameState.items}
                lives={gameState.lives}
                score={gameState.score}
                particleEffect={particleEffect}
            />}
            {popupItem && <InfoPopup item={popupItem} onClose={handleClosePopup} />}
          </>
        );
      case 'end':
        return <EndScreen score={gameState.score} onRestart={restartGame} />;
      default:
        return <IntroScreen onStart={startGame} />;
    }
  };

  return <div className="app-container">{renderScreen()}</div>;
};

export default App;