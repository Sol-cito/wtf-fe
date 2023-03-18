import { useEffect, useState } from "react";
import { PLAYER_RECENT_MATCH_STAT_LIMIT } from "../CommonConstant/CommonConstant";
import { PlayerMatchStatModel } from "../Models/PlayerModel";
import {
  getPlayerAssistsByMatchResultAPI,
  getPlayerScoresByMatchResultAPI,
} from "../Service/PlayerService";
import CustomizedSpinner from "./CustomizedSpinner";
import "./MatchResult.scss";
import StatResultBox from "./StatResultBox";

export interface PlayerMatchResultProps {
  playerId: number;
}

const PlayerMatchResult = (props: PlayerMatchResultProps) => {
  const [scoreStat, setScoreStat] = useState<PlayerMatchStatModel[]>();
  const [assistStat, setAssistStat] = useState<PlayerMatchStatModel[]>();

  const [isLoading, setIsLoding] = useState<boolean>(true);

  const getPlayerScoresAndAssistsByMatchResult = async () => {
    setIsLoding(true);
    const scoreRes: PlayerMatchStatModel[] =
      await getPlayerScoresByMatchResultAPI(props.playerId);
    setScoreStat(scoreRes);

    const assistRes: PlayerMatchStatModel[] =
      await getPlayerAssistsByMatchResultAPI(props.playerId);
    setAssistStat(assistRes);
    setIsLoding(false);
  };

  useEffect(() => {
    getPlayerScoresAndAssistsByMatchResult();
  }, []);

  return (
    <>
      {isLoading && <CustomizedSpinner />}
      {scoreStat && (
        <StatResultBox
          title={"득점한 최근 " + PLAYER_RECENT_MATCH_STAT_LIMIT + "경기"}
          statResult={scoreStat}
          statName={"goal"}
        />
      )}
      {assistStat && (
        <StatResultBox
          title={"어시스트한 최근 " + PLAYER_RECENT_MATCH_STAT_LIMIT + "경기"}
          statResult={assistStat}
          statName={"assist"}
        />
      )}
    </>
  );
};
export default PlayerMatchResult;
