import { PlayersCount } from "@/shared/types";

export type WinnerModalProps = {
  playersCount: PlayersCount;
  closeModal: () => void;
};