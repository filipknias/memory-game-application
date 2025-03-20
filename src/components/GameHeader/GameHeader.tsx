import { Link } from "react-router-dom";
import styles from "./GameHeader.module.scss";
import cx from "clsx";

const GameHeader = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Memory Game</h1>
      <div className={styles.buttonsGroup}>
        <button 
          className={cx(styles.button, styles.resetButton)} 
          role="reset-button" 
          onClick={() => {}}
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