import { PlayerStatModel } from "../Models/PlayerModel";
import "./PlayerInfoBox.scss";

export interface PlayerStatBoxProps {
  playerStat?: PlayerStatModel;
}

const PlayerStatBox = (props: PlayerStatBoxProps) => {
  return (
    <>
      <div> 득점 : {props.playerStat?.scores || 0}</div>
      <div> 어시스트 : {props.playerStat?.scores || 0}</div>
    </>
  );
};
export default PlayerStatBox;
