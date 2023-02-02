import moment from "moment";
import { ANONYMOUS_PROFILE_IMG_PATH } from "../CommonConstant/ImgConstant";
import { PlayerModel } from "../Models/PlayerModel";
import CustomizedImage from "./CustomizedImage";
import "./PlayerInfoBox.scss";

export interface PlayerInfoBoxProps {
  player: PlayerModel;
}

const PlayerInfoBox = (props: PlayerInfoBoxProps) => {
  return (
    <>
      <div className="player_info_container">
        <div className="photo_area">
          <CustomizedImage
            src={
              process.env.REACT_APP_IMAGE_SRC_PREFIX
                ? process.env.REACT_APP_IMAGE_SRC_PREFIX +
                  props.player.profileTorsoImgSrc
                : ANONYMOUS_PROFILE_IMG_PATH
            }
            onErrorImgSrc={ANONYMOUS_PROFILE_IMG_PATH}
          />
        </div>
        <div className="info_area">
          <div className="moto_area">"{props.player.moto}"</div>
          <div className="basic_info_area">
            <span id="back_no">{props.player.backNo}</span>
            <span id="position">{props.player.position}</span>
            <span id="name">{props.player.name}</span>
          </div>
          <div className="eng_name_area">
            <span id="first_name_eng">{props.player.firstNameEng}</span>
            <span id="family_name_eng">{props.player.familyNameEng}</span>
          </div>
          <div className="birth_area">
            <span id="birth">생년월일 | </span>{" "}
            {moment(props.player.birth).format("YYYY-MM-DD")}
          </div>
        </div>
      </div>
    </>
  );
};
export default PlayerInfoBox;
