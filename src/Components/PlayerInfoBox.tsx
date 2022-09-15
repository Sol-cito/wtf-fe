import { PlayerModel } from "../Models/PlayerModel";
import { PlayerTestData1, PlayerTestData2 } from "../Test/TestData";
import "./PlayerInfoBox.scss";
import PlayerPhoto from "./PlayerPhoto";

export interface PlayerBoxProps {}

const PlayerBox = (props: PlayerBoxProps) => {
  const playerTestData1: PlayerModel = PlayerTestData1;
  const playerTestData2: PlayerModel = PlayerTestData2;

  return (
    <div>
      <div className="intro_title_area">
        <span className="intro_title"> Player 소개 </span>
      </div>
      <div className="player_info_area">
        <div className="player_photho_area">
          <PlayerPhoto src={PlayerTestData1.imgSrc} />
        </div>
        <div className="player_profile_area">
          <p>
            <span> Name : </span>
            {PlayerTestData1.name}
          </p>
          <p>
            <span> Back No : </span>
            {PlayerTestData1.backNo}
          </p>
          <p>
            <span> Position : </span>
            {PlayerTestData1.position}
          </p>
          <p>
            <span> Moto : </span>
            {PlayerTestData1.moto}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerBox;
