import Card from '@/components/Card/Card';
import styles from './GameHistory.module.scss';
import { Player } from '@/store/types';
import GameRecord from '../GameRecord/GameRecord';
import { SAVED_GAMES_KEY } from '@/constants/localStorage';

type SavedGame = {
  players: Player[]; 
  time: string; 
  date: string;
}

const getWinnerPlayerId = (players: Player[]) => {
  const maxPoints = Math.max(...players.map((player) => player.points));
  const winnerPlayer = players.find((player) => player.points === maxPoints);
  return winnerPlayer ? winnerPlayer.id : players[0].id;
};

const GameHistory = () => {
  const savedGames = localStorage.getItem(SAVED_GAMES_KEY);
  const historyGames = (savedGames ? JSON.parse(savedGames) : []) as SavedGame[];

  return (
    <Card>
      <h3 className={styles.heading}>Games History</h3>
      {historyGames.length === 0 && (
        <p className={styles.noGamesText}>No games played yet</p>
      )}
      <div className={styles.historyWrapper}>
        {historyGames.map((game, index) => (
          <GameRecord
            key={index}
            dateString={game.date}
            index={index}
            players={game.players}
            time={game.time}
            type={game.players.length === 1 ? "singleplayer" : "multiplayer"}
            winnerPlayerId={getWinnerPlayerId(game.players)}
          />
        ))}
      </div>
    </Card>
  );
};

export default GameHistory;