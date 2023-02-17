import { PlayerModel } from "./PlayerModel";

export interface BoardMemberModel {
  id: number;
  player: PlayerModel;
  boardName: string;
  assignedDate: string;
}
