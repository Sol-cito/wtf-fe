import moment from "moment";
import { useAppSelector } from "../Store/config";
import "./PlayerModalBox.scss";

const PlayerModalBox = () => {
  const { player } = useAppSelector((state) => state.playerModal);

  return (
    <>
      {player ? (
        <div className="player_info_container">
          <div className="photo_area">
            <img src="img/player/anonymous_profile_no_background.png" />
          </div>
          <div className="info_area">
            <div className="moto_area">"{player.moto}"</div>
            <div className="basic_info_area">
              <span id="back_no">{player.backNo}</span>
              <span id="position">{player.position}</span>
              <span id="name">{player.name}</span>
            </div>
            <div className="eng_name_area">
              <span id="first_name_eng">{player.firstNameEng}</span>
              <span id="family_name_eng">{player.familyNameEng}</span>
            </div>
            <div className="birth_area">
              <span id="birth">생년월일 | </span>{" "}
              {moment(player.birth).format("YYYY-MM-DD")}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default PlayerModalBox;
