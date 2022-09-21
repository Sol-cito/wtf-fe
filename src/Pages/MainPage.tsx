import { BLACK } from "../CommonConstant/StringColorConstant";
import { MAIN_PAGE_BOX_TYPING } from "../CommonConstant/TextConstant";
import MainPageBox from "../Components/MainPageContainer";
import PlayerCarousel from "../Components/PlayerSlide";
import TextTypingBox from "../Components/TextTypingBox";
import "./MainPage.scss";

const MainPage = () => {
  return (
    <div className="page_container">
      <MainPageBox
        boxColor={BLACK}
        includedComponent={<TextTypingBox text={MAIN_PAGE_BOX_TYPING} />}
      />
      <MainPageBox boxColor={BLACK} includedComponent={<PlayerCarousel />} />
    </div>
  );
};
export default MainPage;
