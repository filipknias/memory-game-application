import { useGameStore } from '@/store';
import StatusCard from '../StatusCard/StatusCard';

const MultiPlayerBoardStatus = () => {
  const { players, playerIdTurn } = useGameStore();
  return (
    <> 
      {players.map(({ id, points }) => (
        <StatusCard 
          key={id} 
          label={`P${id}`} 
          status={points.toString()} 
          active={playerIdTurn === id}  
        />
      ))}
    </>
  )
};

export default MultiPlayerBoardStatus;