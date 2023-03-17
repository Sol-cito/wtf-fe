import { ModalModel } from "./CommonModel";
import { GoalType, WinOrLoseOrDraw, YesOrNo } from "./Enum/CommonEnum";
import { MatchTypeModel } from "./MatchTypeModel";
import { PlayerModel } from "./PlayerModel";
import { TeamModel } from "./TeamModel";

export interface MatchResultModel extends ModalModel {
  id: number;
  opposingTeam: TeamModel;
  matchType: MatchTypeModel;
  matchLocation: string;
  goalsScored: number;
  scorersAndAssisters: ScorerAndAssisterModel[];
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
  scorer?: PlayerModel;
  goalType: GoalType;
  assister?: PlayerModel;
}

export interface MatchScorerAndAssisterNames {
  scorerName: string;
  assisterName: string;
}
