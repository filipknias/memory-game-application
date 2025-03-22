import { useGameStore } from "@/store";
import { MemoryItem } from "@/store/types";
import { useEffect, useState } from "react";
import { useTimer } from "./useTimer";
import { SAVED_GAMES_KEY } from "@/constants/localStorage";

export const useMemoryGame = (playersCount: number) => {
  const [clickDisabled, setClickDisabled] = useState(false);
  const [winnerModalOpen, setWinnerModalOpen] = useState(false);
  const { 
    memoryItems,
    markMemoryItemOpened,
    markMemoryItemDiscovered,
    closeOpenedItems,
    increasePlayerPoints,
    players,
    playerIdTurn,
    increasePlayerMoves,
    stopTimer
  } = useGameStore();
  const timeString = useTimer();

  useEffect(() => {
    if (memoryItems.length === 0) return;

    const openedItems = memoryItems.filter((item) => item.opened);
    if (openedItems.length >= 2) {
      setClickDisabled(true);
    } else {
      setClickDisabled(false);
    }
    
    const discoveredMemoryItems = memoryItems.filter((item) => item.discovered);
    if (discoveredMemoryItems.length === memoryItems.length) {
      stopTimer();
      setWinnerModalOpen(true);

      const gamesHistory = localStorage.getItem(SAVED_GAMES_KEY);
      const pastGames = gamesHistory ? JSON.parse(gamesHistory) : [];
      pastGames.push({
        players,
        time: timeString,
        date: new Date().toISOString(),
      });
      localStorage.setItem(SAVED_GAMES_KEY, JSON.stringify(pastGames));
    }
  }, [memoryItems]);

  const onItemDiscover = () => {
    const currentPlayer = players.find((player) => player.id === playerIdTurn);
    if (currentPlayer) {
      increasePlayerPoints(currentPlayer.id);
    }
  };

  const onMoveFinished = () => {
    increasePlayerMoves(playerIdTurn, playersCount);
    closeOpenedItems();
  };

  const handleMemoryItemClick = (item: MemoryItem) => {
    if (item.discovered || item.opened || clickDisabled) return;

    markMemoryItemOpened(item.id);

    const openedItem = memoryItems.find((item) => item.opened);
    if (!openedItem) return;
    
    let timeoutCallback = null;
    if (openedItem.content === item.content) {
      timeoutCallback = () => {
        onItemDiscover();
        markMemoryItemDiscovered(item.id);
        markMemoryItemDiscovered(openedItem.id);
        onMoveFinished();
      }
    } else {
      timeoutCallback = onMoveFinished;
    }
    setTimeout(timeoutCallback, 1000);
  };  

  return {
    handleMemoryItemClick,
    winnerModalOpen,
    setWinnerModalOpen,
    clickDisabled
  };
};