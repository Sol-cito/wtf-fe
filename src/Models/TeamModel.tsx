export interface TeamModel {
  id: number;
  name: string;
  hometown?: string;
  teamLogoSrc?: string;
}

export interface TeamMultipartModel {
  team: TeamModel;
  teamImageFile?: File;
}
