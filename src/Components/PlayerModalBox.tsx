import moment from "moment";
import { ANONYMOUS_PROFILE_IMG_PATH } from "../CommonConstant/ImgConstant";
import { useAppSelector } from "../Store/config";
import CustomizedImage from "./CustomizedImage";
import "./PlayerModalBox.scss";

const PlayerModalBox = () => {
  const { player } = useAppSelector((state) => state.modal);

  return (
    <>
      {player ? (
        <div className="player_info_container">
          <div className="photo_area">
            <CustomizedImage
              src={
                process.env.REACT_APP_IMAGE_SRC_PREFIX
                  ? process.env.REACT_APP_IMAGE_SRC_PREFIX +
                    player.profileTorsoImgSrc
                  : ANONYMOUS_PROFILE_IMG_PATH
              }
              onErrorImgSrc={ANONYMOUS_PROFILE_IMG_PATH}
            />
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
