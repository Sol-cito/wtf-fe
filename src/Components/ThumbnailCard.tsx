import { useState } from "react";
import "./ThumbnailCard.scss";

export interface ThumbnailCardProps {
  url: string;
  text: string;
}

const ThumbnailCard = (props: ThumbnailCardProps) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleOnMouseOver = () => {
    setIsHovering(true);
  };

  const handleOnMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      className="thumbnail_card"
      onMouseOver={handleOnMouseOver}
      onMouseLeave={handleOnMouseLeave}
    >
      {isHovering ? <div className="overlay_text">{props.text}</div> : null}
      <img className={isHovering ? "hover" : ""} src={props.url} />
    </div>
  );
};
export default ThumbnailCard;
