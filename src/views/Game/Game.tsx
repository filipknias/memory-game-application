import { DEFAULT_GRID_SIZE, DEFAULT_PLAYERS_COUNT, DEFAULT_THEME } from "@/constants/defaults";
import { GridSize, PlayersCount, Theme } from "@/shared/types";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Game.module.scss";
import GameHeader from "@/components/GameHeader/GameHeader";
import GameBoard from "@/components/GameBoard/GameBoard";
import { useGameStore } from "@/store";
import { generateMemoryItems } from "@/utilities/generateMemoryItems";
import SinglePlayerBoardStatus from "@/components/BoardStatus/SinglePlayerBoardStatus";
import MultiPlayerBoardStatus from "@/components/BoardStatus/MultiPlayerBoardStatus";

const Game = () => {
  const [searchParams] = useSearchParams();
  const { setupPlayers, setMemoryItems, startTimer } = useGameStore();

  const theme = useMemo((): Theme => {
    const theme = searchParams.get('theme');
    if (theme === 'numbers' || theme === 'icons') return theme;
    return DEFAULT_THEME;
  }, [searchParams]);

  const playersCount = useMemo((): PlayersCount => {
    const players: any = Number(searchParams.get('players'));
    if (players >= 1 && players <= 4) return players;
    return DEFAULT_PLAYERS_COUNT;    
  }, [searchParams]);

  const gridSize = useMemo((): GridSize => {
    const gridSize = Number(searchParams.get('gridSize'));
    if (gridSize === 4 || gridSize === 6) return gridSize;
    return DEFAULT_GRID_SIZE;
  }, [searchParams]);

  useEffect(() => {
    setupPlayers(playersCount);
  }, [playersCount]);

  useEffect(() => {
   setMemoryItems(generateMemoryItems(theme, gridSize));
  }, [theme, gridSize]);

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <GameHeader />
        <GameBoard 
          gridSize={gridSize} 
          playersCount={playersCount} 
        />
        <div className={styles.gameStatusContainer}>
          {playersCount === 1 ? <SinglePlayerBoardStatus /> : <MultiPlayerBoardStatus />}
        </div>
      </div>
    </div>
  )
}

export default Game;