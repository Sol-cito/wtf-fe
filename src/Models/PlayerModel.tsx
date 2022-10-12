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
  curYn: string;
}

export interface PlayerMultipartModel {
  player: PlayerModel;
  profileImageFile?: File;
}
