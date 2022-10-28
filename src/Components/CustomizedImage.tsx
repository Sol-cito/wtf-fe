import { useState } from "react";
import "./CustomizedImage.scss";

export interface CustomizedImageProps {
  src: string;
  onErrorImgSrc: string;
}

const CustomizedImage = (props: CustomizedImageProps) => {
  const [imageSrc, setImageSrc] = useState<string>(
    process.env.REACT_APP_IMAGE_SRC_PREFIX + props.src
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
