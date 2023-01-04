import { WinOrLoseOrDraw, YesOrNo } from "./Enum/CommonEnum";
import { MatchTypeModel } from "./MatchTypeModel";
import { TeamModel } from "./TeamModel";

export interface MatchResultModel {
  id: number;
  opposingTeam: TeamModel;
  matchType: MatchTypeModel;
  matchLocation: string;
  goalsScored: number;
  goalsLost: number;
  matchResult: WinOrLoseOrDraw;
  shootOutYn: YesOrNo;
  matchDate: string;
}

export interface MatchResultRequestModel {
  id: number;
  opposingTeamId: number;
  matchTypeId: number;
  matchLocation: string;
  goalsScored: number;
  scorersAndAssisters: ScorerAndAssisterModel[];
  goalsLost: number;
  matchResult: WinOrLoseOrDraw;
  shootOutYn: YesOrNo;
  matchDate: string;
}

export interface ScorerAndAssisterModel {
  index: number;
  scorerId: number;
  assisterId: number;
}
