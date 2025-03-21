import { useGameStore } from '@/store';

export const useTimer = () => {
  const { time } = useGameStore();
  
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return timeString;
};