import { useState } from "react";
import "./PlayerPhoto.scss";

export interface PlayerPhotoProps {
  src: string;
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
    <div className="photo_container">
      {isHovering ? (
        <div className="overlay_text">헤이 맨~~~~~!!!!!!!!!!</div>
      ) : null}
      <img
        src={props.src}
        onMouseOver={handleOnMouseOver}
        onMouseLeave={handleOnMouseLeave}
      />
    </div>
  );
};

export default PlayerPhoto;
