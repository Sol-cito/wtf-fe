import { useState } from "react";
import { ANONYMOUS_PROFILE_IMG_PATH } from "../CommonConstant/ImgSrcConstant";
import { PlayerModel } from "../Models/PlayerModel";
import "./PlayerPhoto.scss";

export interface PlayerPhotoProps {
  id?: number;
  player: PlayerModel;
}

const PlayerPhoto = (props: PlayerPhotoProps) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [profileImgSrc, setProfileImgSrc] = useState<string>(
    props.player.profileImgSrc || ANONYMOUS_PROFILE_IMG_PATH
  );

  const handleOnMouseOver = () => {
    setIsHovering(true);
  };

  const handleOnMouseLeave = () => {
    setIsHovering(false);
  };

  const handleImgOnError = () => {
    setProfileImgSrc(ANONYMOUS_PROFILE_IMG_PATH);
  };

  return (
    <div
      className="photo_container"
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
      <img src={profileImgSrc} onError={handleImgOnError} />
    </div>
  );
};

export default PlayerPhoto;
