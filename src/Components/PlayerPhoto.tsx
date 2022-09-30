import { useState } from "react";
import { PlayerModel } from "../Models/PlayerModel";
import "./PlayerPhoto.scss";

export interface PlayerPhotoProps {
  player: PlayerModel;
}

const PlayerPhoto = (props: PlayerPhotoProps) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleOnMouseOver = () => {
    setIsHovering(true);
  };

  const handleOnMouseLeave = () => {
    setIsHovering(false);
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
      <img
        src={
          props.player.profileImgSrc ||
          "/img/player/anonymous_profile_no_background.png"
        }
      />
    </div>
  );
};

export default PlayerPhoto;
