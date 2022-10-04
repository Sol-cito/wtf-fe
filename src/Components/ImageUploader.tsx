import { useEffect, useState } from "react";
import "./ImageUploader.scss";

export interface ImageUploaderProps {
  title?: string;
  imageFile?: File;
  setImgFile: Function;
}

const ImageUploader = (props: ImageUploaderProps) => {
  const [profileImgBase64, setProfileImgBase64] = useState<string>();

  useEffect(() => {
    setProfileImgBase64(undefined);
  }, [props.imageFile]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) return;
    props.setImgFile(event.target.files[0]);
    let profileImage: File = event.target.files[0];
    let fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(profileImage);
    fileReader.onloadend = () => {
      setProfileImgBase64(fileReader.result as string);
    };
  };

  return (
    <div className="profile_image_area">
      <p>{props.title}</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        multiple={false}
      />
      {profileImgBase64 ? (
        <>
          <p> * 이미지 미리보기 * </p>
          <img src={profileImgBase64} />
        </>
      ) : null}
    </div>
  );
};

export default ImageUploader;
