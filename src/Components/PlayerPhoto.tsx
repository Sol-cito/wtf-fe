import { useState } from "react";
import { ANONYMOUS_PROFILE_IMG_PATH } from "../CommonConstant/ImgSrcConstant";
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
    <div
      className="photo_container"
      onClick={handleOnClick}
      onMouseOver={handleOnMouseOver}
      onMouseLeave={handleOnMouseLeave}
    >
      {isHovering ? (
        <div className="overlay_text">
          <p>No. {props.player.backNo}</p>
          <p>{props.player.position}</p>
          <p>{props.player.firstNameEng}</p>
        </div>
      ) : null}
      <CustomizedImage
        src={
          props.player.profileImgSrc
            ? process.env.REACT_APP_IMAGE_SRC_PREFIX +
              props.player.profileImgSrc
            : null
        }
        onErrorImgSrc={ANONYMOUS_PROFILE_IMG_PATH}
      />
    </div>
  );
};

export default PlayerPhoto;
