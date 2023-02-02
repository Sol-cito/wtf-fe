export interface PlayerModel {
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
