import { useEffect, useState } from "react";
import { PlayerModel, PlayerStatModel } from "../Models/PlayerModel";
import { getPlayerTotalStatAPI } from "../Service/PlayerService";
import CustomizedSpinner from "./CustomizedSpinner";
import PlayerMatchResult from "./PlayerMatchResult";
import "./PlayerStatBox.scss";

export interface PlayerStatBoxProps {
  player: PlayerModel;
}

const PlayerStatBox = (props: PlayerStatBoxProps) => {
  const [playerStat, setPlayerStat] = useState<PlayerStatModel>();
  const [isLoading, setIsLoding] = useState<boolean>(true);

  const getPlayerStat = async () => {
    setIsLoding(true);
    const res: PlayerStatModel = await getPlayerTotalStatAPI(props.player.id);
    setPlayerStat(res);
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
