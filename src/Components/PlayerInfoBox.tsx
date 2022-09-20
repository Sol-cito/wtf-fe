import { PlayerModel } from "../Models/PlayerModel";
import "./PlayerInfoBox.scss";

export interface PlayerBoxProps {
  player: PlayerModel;
}

const PlayerInfoBox = (props: PlayerBoxProps) => {
  return (
    <div>
      <div className="intro_title_area">
        <span className="intro_title"> Player 소개 </span>
      </div>
      <div className="player_info_area">
        <div className="player_photho_area">
          {/* <PlayerPhoto src={PlayerTestData1.imgSrc} /> */}
        </div>
        <div className="player_profile_area">
          <p>
            <span> Name : </span>
            {props.player.name}
          </p>
          <p>
            <span> Back No : </span>
            {props.player.backNo}
          </p>
          <p>
            <span> Position : </span>
            {props.player.position}
          </p>
          <p>
            <span> Moto : </span>
            {props.player.moto}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfoBox;
