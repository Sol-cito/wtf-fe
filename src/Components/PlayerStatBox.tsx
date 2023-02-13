import { PlayerStatModel } from "../Models/PlayerModel";
import PlayerMatchResult from "./PlayerMatchResult";
import "./PlayerStatBox.scss";

export interface PlayerStatBoxProps {
  playerStat?: PlayerStatModel;
}

const PlayerStatBox = (props: PlayerStatBoxProps) => {
  return (
    <>
      <div className="statbox_container">
        <span>
          Goals :<span>{props.playerStat?.scores || 0}</span>
        </span>
        <span>
          Assists :<span>{props.playerStat?.scores || 0} </span>
        </span>
      </div>
      <div>
        <PlayerMatchResult />
      </div>
    </>
  );
};
export default PlayerStatBox;
