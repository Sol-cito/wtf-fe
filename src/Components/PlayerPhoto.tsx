import { useState } from "react";
import { isMobile } from "react-device-detect";
import { ANONYMOUS_PROFILE_IMG_PATH } from "../CommonConstant/ImgConstant";
import { PlayerModel } from "../Models/PlayerModel";
import CustomizedImage from "./CustomizedImage";
import "./PlayerPhoto.scss";

export interface PlayerPhotoProps {
  player: PlayerModel;
  onClick?: Function;
  alwaysOverlayTextOn?: boolean;
  overlayTextOnHovering?: boolean;
}

const PlayerPhoto = (props: PlayerPhotoProps) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const handleOnClick = () => {
    if (props.onClick) {
      props.onClick(props.player);
    }
  };

  const handleOnMouseOver = () => {
    if (!props.overlayTextOnHovering) return;
    setIsHovering(true);
  };

  const handleOnMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className="photo_container">
      {(props.alwaysOverlayTextOn ||
        (props.overlayTextOnHovering && isHovering)) && (
        <div className="overlay_text" onClick={handleOnClick}>
          <p>No. {props.player.backNo}</p>
          <p>{props.player.position}</p>
          <p>{props.player.firstNameEng}</p>
        </div>
      )}
      <div
        className="photo_wrapper"
        onClick={handleOnClick}
        onMouseOver={handleOnMouseOver}
        onMouseLeave={handleOnMouseLeave}
      >
        <CustomizedImage
          className={
            props.alwaysOverlayTextOn
              ? "img_with_overlay"
              : "img_without_overlay"
          }
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
