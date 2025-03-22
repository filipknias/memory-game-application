import { formatDate } from '@/utilities/formatDate';
import Stat from '../Stat/Stat';
import styles from './GameRecord.module.scss';
import { GameRecordProps } from './GameRecord.types';
import { useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'clsx';

const GameRecord = ({ 
  index,
  dateString,
  players,
  time,
  winnerPlayerId,
  type,
}: GameRecordProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <button className={styles.headingWrapper} onClick={() => setOpen(!open)}>
        <h5 className={styles.heading}>
          <span className={styles.boldText}>#{index + 1}</span>
          {formatDate(dateString)} {" "}
          ({type === 'singleplayer' ? "Singleplayer" : "Multiplayer"})
        </h5>
        <div className={cx(styles.accordionIcon, open && styles.active)}>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </button>
      <div className={cx(styles.content, open && styles.opened)}>
        {type === 'multiplayer' && (
          <div className={styles.overviewGrid}>
            <Stat label="Duration" value={time} />
            <Stat label="Winner" value={`Player ${winnerPlayerId}`} />
          </div>
        )}
        {players.map((player) => (
          <div className={styles.statsGrid} key={player.id}>
            {type === 'multiplayer' && (
              <Stat label="Player ID" value={player.id.toString()} />
            )}
            {type === 'singleplayer' && (
              <Stat label="Duration" value={time} />
            )}
            <Stat label="Points" value={player.points.toString()} />
            <Stat label="Moves" value={player.moves.toString()} />
          </div>
        ))}
      </div>
    </div>
  )
};

export default GameRecord;