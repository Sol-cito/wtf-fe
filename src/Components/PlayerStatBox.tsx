import { useEffect, useState } from "react";
import { PLAYER_RECENT_STAT_LIMIT } from "../CommonConstant/CommonConstant";
import {
  PlayerModel,
  PlayerRecentStatModel,
  PlayerStatModel,
} from "../Models/PlayerModel";
import {
  getPlayerRecentAssistAPI,
  getPlayerRecentScoreAPI,
  getPlayerTotalStatAPI,
} from "../Service/PlayerService";
import CustomizedSpinner from "./CustomizedSpinner";
import PlayerMatchResult from "./PlayerMatchResult";
import "./PlayerStatBox.scss";

export interface PlayerStatBoxProps {
  player: PlayerModel;
}

const PlayerStatBox = (props: PlayerStatBoxProps) => {
  const [playerStat, setPlayerStat] = useState<PlayerStatModel>();
  const [playerRecentScore, setPlayerRecentScore] =
    useState<PlayerRecentStatModel>();
  const [playerRecentAssist, setPlayerRecentAssist] =
    useState<PlayerRecentStatModel>();
  const [isLoading, setIsLoding] = useState<boolean>(true);

  const getPlayerStat = async () => {
    setIsLoding(true);
    const totalStatRes: PlayerStatModel = await getPlayerTotalStatAPI(
      props.player.id
    );
    const recentScoreRes: PlayerRecentStatModel = await getPlayerRecentScoreAPI(
      props.player.id,
      PLAYER_RECENT_STAT_LIMIT
    );
    const recentAssistRes: PlayerRecentStatModel =
      await getPlayerRecentAssistAPI(props.player.id, PLAYER_RECENT_STAT_LIMIT);

    setPlayerStat(totalStatRes);
    setPlayerRecentScore(recentScoreRes);
    setPlayerRecentAssist(recentAssistRes);

    setIsLoding(false);
  };

  useEffect(() => {
    getPlayerStat();
  }, []);

  return (
    <>
      {isLoading && <CustomizedSpinner />}
      {playerStat && (
        <>
          <div className="statbox_container">
            <span>
              Goals : <span>{playerStat?.scores || 0}</span>
            </span>
            <span>
              Assists : <span>{playerStat?.assists || 0} </span>
            </span>
          </div>
          <div>
            <PlayerMatchResult playerId={props.player.id} />
          </div>
        </>
      )}
    </>
  );
};
export default PlayerStatBox;
