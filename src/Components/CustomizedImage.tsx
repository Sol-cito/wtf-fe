import { useState } from "react";
import "./CustomizedImage.scss";

export interface CustomizedImageProps {
  src: string | undefined | null;
  onErrorImgSrc: string;
}

const CustomizedImage = (props: CustomizedImageProps) => {
  const [imageSrc, setImageSrc] = useState<string>(
    props.src
      ? process.env.REACT_APP_IMAGE_SRC_PREFIX + props.src
      : props.onErrorImgSrc
  );

  const handleImgOnError = () => {
    setImageSrc(props.onErrorImgSrc);
  };

  return (
    <>
      <img src={imageSrc} onError={handleImgOnError} />
    </>
  );
};

export default CustomizedImage;
