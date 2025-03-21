import { GridSize, Theme } from "@/shared/types";

export type GameState = {
  players: Player[];
  memoryItems: MemoryItem[];
  playerIdTurn: number;
  intervalId: NodeJS.Timer|null;
  time: number;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  increasePlayerPoints: (playerId: number) => void;
  increasePlayerMoves: (playerId: number, playersCount: number) => void;
  markMemoryItemOpened: (itemId: number) => void;
  markMemoryItemDiscovered: (itemId: number) => void;
  closeOpenedItems: () => void;
  resetGame: (theme: Theme, gridSize: GridSize) => void;
  setupPlayers: (playersCount: number) => void;
  setMemoryItems: (memoryItems: MemoryItem[]) => void;
};

export type Player = { 
  id: number;
  points: number;
  moves: number;
}

export type MemoryItem = {
  id: number;
  content: MemoryContent;
  opened: boolean;
  discovered: boolean;
}

export type MemoryContent = number | React.ReactNode;