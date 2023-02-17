import { PlayerStatModel } from "../Models/PlayerModel";
import { useAppSelector } from "../Store/config";
import PlayerMatchResult from "./PlayerMatchResult";
import "./PlayerStatBox.scss";

export interface PlayerStatBoxProps {
  playerStat?: PlayerStatModel;
}

const PlayerStatBox = (props: PlayerStatBoxProps) => {
  const { player } = useAppSelector((state) => state.modal);

  return (
    <>
      <div className="statbox_container">
        <span>
          Goals :<span>{props.playerStat?.scores || 0}</span>
        </span>
        <span>
          Assists :<span>{props.playerStat?.assists || 0} </span>
        </span>
      </div>
      <div>{player && <PlayerMatchResult playerId={player.id} />}</div>
    </>
  );
};
export default PlayerStatBox;
