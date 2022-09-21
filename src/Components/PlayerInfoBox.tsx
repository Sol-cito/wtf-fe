import { PlayerModel } from "../Models/PlayerModel";
import "./PlayerInfoBox.scss";
import PlayerPhoto from "./PlayerPhoto";

export interface PlayerBoxProps {
  player: PlayerModel;
}

const PlayerInfoBox = (props: PlayerBoxProps) => {
  return (
    <>
      <PlayerPhoto src={props.player.profileImgSrc} />
      <div className="player_profile_area"></div>
    </>
  );
};

export default PlayerInfoBox;
