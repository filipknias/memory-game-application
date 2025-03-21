import { useMemo } from 'react';
import StatusCard from '../StatusCard/StatusCard';
import { useGameStore } from '@/store';
import { useTimer } from '@/hooks/useTimer';

const SinglePlayerBoardStatus = () => {
  const { playerIdTurn, players } = useGameStore();
  const timeString = useTimer();
 
  // const timeString = useMemo(() => {
  //   let secondsString = `${timer.seconds}`;
  //   if (timer.seconds < 10) secondsString = '0' + secondsString;
  //   return `${timer.minutes}:${secondsString}`;
  // }, [timer.seconds, timer.minutes]);

  const moves = useMemo(() => {
    const currentPlayer = players.find((player) => player.id === playerIdTurn);
    if (!currentPlayer) {
      return 0;
    }
    return currentPlayer.moves;
  }, [players, playerIdTurn]);

  return (
    <> 
      <StatusCard label='Time' status={timeString} active={false} />
      <StatusCard label='Moves' status={moves.toString()} active={false} />
    </>
  )
};

export default SinglePlayerBoardStatus;