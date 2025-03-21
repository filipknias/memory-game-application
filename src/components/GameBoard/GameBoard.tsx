import { useGameStore } from '@/store';
import styles from './GameBoard.module.scss';
import { GameBoardProps } from './GameBoard.types';
import cx from "clsx";
import WinnerModal from '../WinnerModal/WinnerModal';
import { useMemoryGame } from '@/hooks/useMemoryGame';

const GameBoard = ({ gridSize, playersCount }: GameBoardProps) => {
  const { memoryItems } = useGameStore();
  const { 
    handleMemoryItemClick, 
    winnerModalOpen, 
    setWinnerModalOpen 
  } = useMemoryGame(playersCount);
  
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
      {winnerModalOpen && (
        <WinnerModal 
          playersCount={playersCount} 
          closeModal={() => setWinnerModalOpen(false)} 
        />
      )}
    </div>
  )
};

export default GameBoard;