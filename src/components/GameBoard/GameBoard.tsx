import { useGameStore } from '@/store';
import styles from './GameBoard.module.scss';
import { GameBoardProps } from './GameBoard.types';
import cx from "clsx";
import { useEffect, useState } from 'react';
import { MemoryItem } from '@/store/types';
import { useTimer } from '@/hooks/useTimer';

const GameBoard = ({ gridSize, playersCount }: GameBoardProps) => {
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
  } = useGameStore();
  const timer = useTimer();

  useEffect(() => {
    const openedItems = memoryItems.filter((item) => item.opened);
    if (openedItems.length >= 2) {
      setClickDisabled(true);
    } else {
      setClickDisabled(false);
    }
    
    const discoveredMemoryItems = memoryItems.filter((item) => item.discovered);
    if (discoveredMemoryItems.length === memoryItems.length) {
      timer.stopTimer();
      setWinnerModalOpen(true);
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
    if (openedItem && openedItem.content === item.content) {
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
  
  return (
    <div className={cx(styles.wrapper, gridSize === 4 ? styles.gridSize4 : styles.gridSize6)}>
      {memoryItems.map((item) => (
        <div 
          key={item.id} 
          role={`memory-item-${item.id}`}
          className={cx(styles.memoryTile, item.opened && styles.opened, item.discovered && styles.discovered)}
          onClick={() => handleMemoryItemClick(item)}
        >
          {item.opened || item.discovered ? item.content : null}
        </div>
      ))}
      {/* {winnerModalOpen && <WinnerModal playersCount={playersCount} closeModal={() => setWinnerModalOpen(false)} />} */}
    </div>
  )
};

export default GameBoard;