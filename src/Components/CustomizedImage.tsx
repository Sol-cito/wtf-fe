import { useState, useEffect } from "react";
import { NOT_FOUND_IMG_PATH } from "../CommonConstant/ImgSrcConstant";
import "./CustomizedImage.scss";

export interface CustomizedImageProps {
  id?: string;
  src: string | undefined | null;
  onErrorImgSrc?: string;
}

const CustomizedImage = (props: CustomizedImageProps) => {
  const [imageSrc, setImageSrc] = useState<string>(
    props.src || NOT_FOUND_IMG_PATH
  );

  useEffect(() => {
    setImageSrc(props.src || NOT_FOUND_IMG_PATH);
  }, [props.src]);

  const handleImgOnError = () => {
    setImageSrc(props.onErrorImgSrc || NOT_FOUND_IMG_PATH);
  };

  return (
    <>
      <img id={props.id || ""} src={imageSrc} onError={handleImgOnError} />
    </>
  );
};

export default CustomizedImage;
