import { Player } from "@/store/types";

export type GameRecordProps = {
  index: number;
  dateString: string;
  type: 'singleplayer' | 'multiplayer';
  time: string;
  winnerPlayerId: number;
  players: Player[];
}