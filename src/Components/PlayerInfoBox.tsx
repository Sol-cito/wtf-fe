import { PlayerModel } from "../Models/PlayerModel";
import "./PlayerInfoBox.scss";
import PlayerPhoto from "./PlayerPhoto";

export interface PlayerBoxProps {
  player: PlayerModel;
}

const PlayerInfoBox = (props: PlayerBoxProps) => {
  return (
    <>
      <PlayerPhoto player={props.player} />
      <div className="player_profile_area"></div>
    </>
  );
};

export default PlayerInfoBox;
