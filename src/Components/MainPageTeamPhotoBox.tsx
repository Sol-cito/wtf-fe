import { isMobile } from "react-device-detect";
import {
  MAIN_TEAM_PHOTO_AWAY_SRC,
  MAIN_TEAM_PHOTO_HOME_SRC,
  MAIN_TEAM_PHOTO_TRAINING_SRC,
  MAIN_TEAM_PHOTO_TROPHIES_SRC,
} from "../CommonConstant/ImgConstant";
import { MAIN_PAGE_BOX_TYPING } from "../CommonConstant/TextConstant";
import { CarouselSetting } from "../Models/CommonModel";
import CustomizedCarousel from "./CustomizedCarousel";
import "./MainPageTeamPhotoBox.scss";
import TextTypingBox from "./TextTypingBox";

const MainTeamPhotoBox = () => {
  const carouselSetting: CarouselSetting = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
  };

  return (
    <div className="team_photo_container">
      {isMobile ? (
        <CustomizedCarousel
          settings={carouselSetting}
          imageSrcs={[
            MAIN_TEAM_PHOTO_AWAY_SRC,
            MAIN_TEAM_PHOTO_HOME_SRC,
            MAIN_TEAM_PHOTO_TRAINING_SRC,
            MAIN_TEAM_PHOTO_TROPHIES_SRC,
          ]}
        />
      ) : (
        <>
          <img src={MAIN_TEAM_PHOTO_AWAY_SRC} />
          <div className="team_text_typing_container">
            <TextTypingBox text={MAIN_PAGE_BOX_TYPING} />
          </div>
        </>
      )}
    </div>
  );
};
export default MainTeamPhotoBox;
