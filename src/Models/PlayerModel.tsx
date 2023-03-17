import { ModalModel } from "./CommonModel";

export interface PlayerModel extends ModalModel {
  id: number;
  name: string;
  firstNameEng: string;
  familyNameEng: string;
  birth: string;
  position: string;
  backNo: number;
  moto: string;
  profileImgSrc?: string;
  profileTorsoImgSrc?: string;
  curYn: string;
}

export interface PlayerMultipartModel {
  player: PlayerModel;
  profileImgFile?: File;
  profileTorsoImgFile?: File;
}

export interface PlayerStatModel {
  scores: number;
  assists: number;
}

export interface PlayerMatchStatModel {
  matchDate: string;
  matchTypeName: string;
  opposingTeamName: string;
  teamLogoSrc: string;
  stat: number;
}
