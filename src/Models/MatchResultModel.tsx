import { WinOrLoseOrDraw, YesOrNo } from "./Enum/CommonEnum";

export interface MatchResultModel {
  id: number;
  opposingTeamName: string;
  opposingTeamLogoSrc?: string;
  matchTypeName: string;
  matchLocation: string;
  goalsScored: number;
  goalsLost: number;
  matchResult: WinOrLoseOrDraw;
  shootOutYn: YesOrNo;
  matchDate: Date;
}
