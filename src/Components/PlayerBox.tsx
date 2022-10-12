import { PlayerModel } from "../Models/PlayerModel";
import "./PlayerBox.scss";
import PlayerPhoto from "./PlayerPhoto";

export interface PlayerBoxProps {
  title?: string;
  players: PlayerModel[];
}

const PlayerBox = (props: PlayerBoxProps) => {
  return (
    <div className="player_box">
      <p className="player_box_title">{props.title}</p>
      <div className="player_photos_area">
        {props.players.map((ele, idx) => {
          return <PlayerPhoto key={idx} player={ele} />;
        })}
      </div>
    </div>
  );
};

export default PlayerBox;
