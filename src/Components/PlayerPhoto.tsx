import { useState } from "react";
import { isMobile } from "react-device-detect";
import { ANONYMOUS_PROFILE_IMG_PATH } from "../CommonConstant/ImgConstant";
import { PlayerModel } from "../Models/PlayerModel";
import CustomizedImage from "./CustomizedImage";
import "./PlayerPhoto.scss";

export interface PlayerPhotoProps {
  player: PlayerModel;
  onClick?: Function;
}

const PlayerPhoto = (props: PlayerPhotoProps) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const handleOnClick = () => {
    if (props.onClick) {
      props.onClick(props.player);
    }
  };

  const handleOnMouseOver = () => {
    setIsHovering(true);
  };

  const handleOnMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className="photo_container" onClick={handleOnClick}>
      {(isMobile || isHovering) && (
        <div className="overlay_text">
          <p>No. {props.player.backNo}</p>
          <p>{props.player.position}</p>
          <p>{props.player.firstNameEng}</p>
        </div>
      )}
      <div
        className="photo_wrapper"
        onMouseOver={handleOnMouseOver}
        onMouseLeave={handleOnMouseLeave}
      >
        <CustomizedImage
          src={
            props.player.profileImgSrc
              ? process.env.REACT_APP_IMAGE_SRC_PREFIX +
                props.player.profileImgSrc
              : ANONYMOUS_PROFILE_IMG_PATH
          }
          onErrorImgSrc={ANONYMOUS_PROFILE_IMG_PATH}
        />
      </div>
    </div>
  );
};

export default PlayerPhoto;
