import { Link } from 'react-router-dom';
import styles from './WinnerModal.module.scss';
import { useGameStore } from '@/store';
import { useTimer } from '@/hooks/useTimer';
import { WinnerModalProps } from './WinnerModal.props';
import cx from 'clsx';
import { DEFAULT_GRID_SIZE, DEFAULT_THEME } from '@/constants/defaults';

const WinnerModal = ({ playersCount, closeModal }: WinnerModalProps) => {
  const { players, resetTimer, resetGame } = useGameStore();
  const timeString = useTimer();

  const playersScoreboard = players.sort((p1, p2) => {
    return p2.points - p1.points;
  }); 

  const handleGameRestart = () => {
    resetGame(DEFAULT_THEME, DEFAULT_GRID_SIZE);
    resetTimer();
    closeModal();
  };

  const SinglePlayerModalContent = (
    <>
      <div>
        <h1 className={styles.heading}>You did it!</h1>
        <p className={styles.subheading}>Game over! Here's how you got on...</p>
      </div>
      <div className={styles.summaryContainer}>
        <div className={styles.summaryItem}>
          <h2 className={styles.label}>Time Elapsed</h2>
          {/* <h2 className={styles.info}>{timer.minutes}:{timer.seconds}</h2> */}
          <h2 className={styles.info}>{timeString}</h2>
        </div>
        <div className={styles.summaryItem}>
          <h2 className={styles.label}>Moves</h2>
          <h2 className={styles.info}>{players[0].moves} Moves Taken</h2>
        </div>
      </div>
    </>
  );

  const MultiPlayerModalContent = (
    <>
      <div>
        <h1 className={styles.heading}>Player {playersScoreboard[0].id} Wins!</h1>
        <p className={styles.subheading}>Game over! Here's how you got on...</p>
      </div>
      <div className={styles.summaryContainer}>
        {playersScoreboard.map((player, index) => (
          <div key={player.id} className={cx(styles.summaryItem, index === 0 && styles.active)}>
            <h2 className={styles.label}>
              Player {player.id} {index === 0 && '(Winner!)'}
            </h2>
            <h2 className={styles.info}>{player.points} Pairs</h2>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        {playersCount === 1 ? SinglePlayerModalContent : MultiPlayerModalContent}
        <div className={styles.buttonsGroup}>
          <button 
            className={styles.restartButton} 
            onClick={handleGameRestart}
          >
            Restart
          </button>
          <Link to="/" className={styles.newGameButton}>Setup New Game</Link>
        </div>
      </div>
    </div>
  )
};

export default WinnerModal;