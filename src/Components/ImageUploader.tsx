import { Button } from "@material-ui/core";
import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { getImageFileNameWithExtension } from "../Service/UtilityService";
import CustomizedImage from "./CustomizedImage";
import "./ImageUploader.scss";

export interface ImageUploaderProps {
  title?: string;
  initialImageSrc?: string;
  setInitialImageSrc?: Function;
  imageFile?: File;
  setImgFile: Function;
}

const ImageUploader = forwardRef((props: ImageUploaderProps, ref) => {
  const [previewImageSrc, setPreviewImage] = useState<string>();
  const [imagePlaceholder, setImagePlaceholder] = useState<string>();

  useImperativeHandle(ref, () => ({
    handleDeleteImage,
  }));

  useEffect(() => {
    if (!props.initialImageSrc) {
      handleDeleteImage();
      return;
    }
    setPreviewImage(
      process.env.REACT_APP_IMAGE_SRC_PREFIX + props.initialImageSrc
    );
    setImagePlaceholder(getImageFileNameWithExtension(props.initialImageSrc));
  }, [props.initialImageSrc]);

  useEffect(() => {
    setImagePlaceholder(props.imageFile?.name);
  }, [props.imageFile]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) return;
    props.setImgFile(event.target.files[0]);
    let profileImage: File = event.target.files[0];
    let fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(profileImage);
    fileReader.onloadend = () => {
      setPreviewImage(fileReader.result as string);
      event.target.value = "";
    };
    setImagePlaceholder(profileImage.name);
  };

  const handleDeleteImage = () => {
    setImagePlaceholder("");
    setPreviewImage("");
    props.setImgFile();
    if (props.setInitialImageSrc) props.setInitialImageSrc();
  };

  return (
    <div className="profile_image_area">
      <p>{props.title}</p>
      <div className="file_box">
        <input
          id="actual_upload_input"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          multiple={false}
        />
        <div>
          <input
            id="fake_upload_input"
            disabled={true}
            placeholder={imagePlaceholder || "Upload your profile image"}
          />
        </div>
        <label
          id="input_label"
          onClick={handleDeleteImage}
          htmlFor="actual_upload_input"
        >
          이미지 올리기
        </label>
        {previewImageSrc ? (
          <>
            <Button
              id="delete_btn"
              size="large"
              variant="contained"
              color="primary"
              onClick={handleDeleteImage}
            >
              지우기
            </Button>
            <p> * 이미지 미리보기 * </p>
            <CustomizedImage src={previewImageSrc} />
          </>
        ) : null}
      </div>
    </div>
  );
});

export default ImageUploader;
