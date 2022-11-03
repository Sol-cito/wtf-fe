import { MAIN_TEAM_PHOTO_SRC } from "../CommonConstant/ImgConstant";
import { MAIN_PAGE_BOX_TYPING } from "../CommonConstant/TextConstant";
import TextTypingBox from "./TextTypingBox";
import "./MainPageTeamPhotoBox.scss";

const MainTeamPhotoBox = () => {
  return (
    <div className="team_photo_container">
      <img src={MAIN_TEAM_PHOTO_SRC} />
      <div className="team_text_typing_container">
        <TextTypingBox text={MAIN_PAGE_BOX_TYPING} />
      </div>
    </div>
  );
};
export default MainTeamPhotoBox;
