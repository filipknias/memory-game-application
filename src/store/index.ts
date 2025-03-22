import { create } from 'zustand';
import { GameState, MemoryItem, Player } from './types';
import { GridSize, Theme } from '@/shared/types';
import { generateMemoryItems } from '@/utilities/generateMemoryItems';

export const useGameStore = create<GameState>()((set, get) => ({
  players: [],
  memoryItems: [],
  playerIdTurn: 1,
  time: 0,
  intervalId: null,
  
  increasePlayerPoints: (playerId: number) => {
    set((state) => ({
      players: state.players.map((player) => {
        if (player.id === playerId) {
          return { ...player, points: player.points + 1 };
        } else {
          return player;
        }
      })
    }))
  },

  increasePlayerMoves: (playerId: number, playersCount: number) => {
    set((state) => {
      const currentPlayer = state.players.find((player) => player.id === playerId);
      if (!currentPlayer) {
        return state;
      }
      
      const nextPlayerIndex = (state.players.indexOf(currentPlayer) + 1);
      let playerIdTurn: number = 1;

      if (nextPlayerIndex > playersCount - 1) {
        playerIdTurn = state.players[0].id;
      } else {
        playerIdTurn = state.players[nextPlayerIndex].id;
      }

      return {
        playerIdTurn,
        players: state.players.map((player) => {
          if (player.id === playerId) {
            return { ...player, moves: player.moves + 1 };
          }
          return player;
        }),
      }
    });
  },

  markMemoryItemOpened: (itemId: number) => {
    set((state) => ({
      memoryItems: state.memoryItems.map((memoryItem) => {
        if (memoryItem.id === itemId) {
          return { ...memoryItem, opened: true };
        }
        return memoryItem;
      })
    }))
  },

  markMemoryItemDiscovered: (itemId: number) => {
    set((state) => ({
      memoryItems: state.memoryItems.map((memoryItem) => {
        if (memoryItem.id === itemId) {
          return { ...memoryItem, discovered: true };
        }
        return memoryItem;
      })
    }))
  },

  closeOpenedItems: () => {
    set((state) => ({
      memoryItems: state.memoryItems.map((memoryItem) => {
        return { ...memoryItem, opened: false };
      })
    }))
  },

  resetGame: (theme: Theme, gridSize: GridSize) => {
    set((state) => ({
      memoryItems: generateMemoryItems(theme, gridSize),
      playerIdTurn: 1,
      players: state.players.map((player) => ({ ...player, points: 0, moves: 0 })),
    }));
  },

  setupPlayers: (playersCount: number) => {
    const initialPlayersStatus: Player[] = [];
    for (let i=1; i<=playersCount; i++) {
      initialPlayersStatus.push({ id: i, points: 0, moves: 0 });
    }
    set({
      players: initialPlayersStatus,
      playerIdTurn: initialPlayersStatus[0].id,
    });
  },
  
  setMemoryItems: (memoryItems: MemoryItem[]) => {
    set({ memoryItems });
  }, 

  startTimer: () => {
    if (get().intervalId) return;
    set({ time: 0, intervalId: null });

    const id = setInterval(() => {
      set((state) => ({ time: state.time + 1 }));
    }, 1000);

    set({ intervalId: id });
  },

  stopTimer: () => {
    clearInterval(Number(get().intervalId));
    set({ intervalId: null });
  },

  resetTimer: () => {
    clearInterval(Number(get().intervalId));
    set({ time: 0, intervalId: null });

    const id = setInterval(() => {
      set((state) => ({ time: state.time + 1 }));
    }, 1000);

    set({ intervalId: id });
  }
}))