import { useGameStore } from '@/store';

export const useTimer = () => {
  // const [minutes, setMinutes] = useState<number>(0);
  // const [seconds, setSeconds] = useState<number>(0);
  const { time } = useGameStore();
  
  // const getNewTimer = () => {
  //   const timer = setInterval(() => {
  //     setSeconds((prevSeconds) => prevSeconds + 1);
  //   }, 1000);
  //   return timer;
  // };

  // useEffect(() => {
  //   const timer = getNewTimer();
  //   setIntervalId(timer);

  //   return () => clearInterval(timer);
  // }, []);

  // useEffect(() => {
  //   if (seconds >= 60) {
  //     setSeconds(0);
  //     setMinutes((prevMinutes) => prevMinutes + 1);
  //   }
  // }, [seconds]);

  // useEffect(() => {
  //   if (intervalId === null) {
  //     clearInterval(Number(intervalId));
  //   }
  //   setSeconds(0);
  //   setMinutes(0);
  // }, [intervalId]);

  // const resetTimer = () => {
  //   if (intervalId === null) return;
  //   clearInterval(Number(intervalId));
  //   const timer = getNewTimer();
  //   setIntervalId(timer);
  // };

  // const stopTimer = () => {
  //   if (!intervalId) return;
  //   clearInterval(Number(intervalId));
  // };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // Format as `mm:ss`
  const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return timeString;

  // return { minutes, seconds, resetTimer, stopTimer };
};