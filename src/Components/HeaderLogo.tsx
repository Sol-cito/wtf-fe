import { WTF_LOGO_IMG_PATH } from "../CommonConstant/ImgConstant";
import CustomizedImage from "./CustomizedImage";
import "./HeaderLogo.scss";

export interface HeaderLogoProps {
  logoName: string;
  srcLink: string;
}

const HeaderLogo = (props: HeaderLogoProps) => {
  return (
    <div className="header_logo">
      <CustomizedImage
        id="logo_image"
        src={props.srcLink}
        onErrorImgSrc={WTF_LOGO_IMG_PATH}
      />
      <div id="logo_name">{props.logoName}</div>
    </div>
  );
};
export default HeaderLogo;
