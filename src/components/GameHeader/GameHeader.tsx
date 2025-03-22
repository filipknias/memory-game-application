import { Link } from "react-router-dom";
import styles from "./GameHeader.module.scss";
import cx from "clsx";
import { useGameStore } from "@/store";
import { GameHeaderProps } from "./GameHeader.props";

const GameHeader = ({ theme, gridSize }: GameHeaderProps) => {
  const { resetGame, resetTimer } = useGameStore();

  const handleGameReset = () => {
    resetGame(theme, gridSize);
    resetTimer();
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Memory Game</h1>
      <div className={styles.buttonsGroup}>
        <button 
          className={cx(styles.button, styles.resetButton)} 
          role="reset-button" 
          onClick={handleGameReset}
        >
          Reset
        </button>
        <Link 
          to="/" 
          className={cx(styles.button, styles.newGameButton)}
          role="new-game-button"
        >
          New Game
        </Link>
      </div>
    </div>
  )
};

export default GameHeader;