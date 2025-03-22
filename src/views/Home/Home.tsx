import { Link } from "react-router-dom";
import styles from "./Home.module.scss";
import cx from 'clsx';
import { useState } from "react";
import { GridSize, PlayersCount, Theme } from "@/shared/types";
import { DEFAULT_GRID_SIZE, DEFAULT_PLAYERS_COUNT, DEFAULT_THEME } from "@/constants/defaults";
import Card from "@/components/Card/Card";
import GameHistory from "@/components/GameHistory/GameHistory";

const Home = () => {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const [players, setPlayers] = useState<PlayersCount>(DEFAULT_PLAYERS_COUNT);
  const [gridSize, setGridSize] = useState<GridSize>(DEFAULT_GRID_SIZE);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.header}>Memory Game</h1>
        <Card>
          <div className={styles.innerWrapper}>
            <div className={styles.settingGroup}>
              <h2 className={styles.settingLabel}>Select Theme</h2>
              <div className={styles.buttonGroup}>
                <button 
                  className={cx(styles.settingButton, theme === 'numbers' && styles.active)} 
                  onClick={() => setTheme('numbers')}
                  role="theme-button"
                >
                  Numbers
                </button>
                <button 
                  className={cx(styles.settingButton, theme === 'icons' && styles.active)} 
                  onClick={() => setTheme('icons')}
                  role="theme-button"
                >
                  Icons
                </button>
              </div>
            </div>
            <div className={styles.settingGroup}>
              <h2 className={styles.settingLabel}>Numbers of Players</h2>
              <div className={styles.buttonGroup}>
                <button 
                  className={cx(styles.settingButton, players === 1 && styles.active)} 
                  onClick={() => setPlayers(1)}
                  role="player-button"
                >
                  1
                </button>
                <button 
                  className={cx(styles.settingButton, players === 2 && styles.active)} 
                  onClick={() => setPlayers(2)}
                  role="player-button"
                >
                  2
                </button>
                <button 
                  className={cx(styles.settingButton, players === 3 && styles.active)} 
                  onClick={() => setPlayers(3)}
                  role="player-button"
                >
                  3
                </button>
                <button 
                  className={cx(styles.settingButton, players === 4 && styles.active)} 
                  onClick={() => setPlayers(4)}
                  role="player-button"
                >
                  4
                </button>
              </div>
            </div>
            <div className={styles.settingGroup}>
              <h2 className={styles.settingLabel}>Grid Size</h2>
              <div className={styles.buttonGroup}>
                <button 
                  className={cx(styles.settingButton, gridSize === 4 && styles.active)} 
                  onClick={() => setGridSize(4)}
                  role="grid-size-button"
                >
                  4x4
                </button>
                <button 
                  className={cx(styles.settingButton, gridSize === 6 && styles.active)}
                  onClick={() => setGridSize(6)}
                  role="grid-size-button"
                >
                  6x6
                </button>
              </div>
            </div>
            <Link to={`/game?theme=${theme}&players=${players}&gridSize=${gridSize}`} className={styles.startButton}>
              Start game
            </Link>
          </div>
        </Card>
        <GameHistory />
      </div>
    </div>
  )
};

export default Home;