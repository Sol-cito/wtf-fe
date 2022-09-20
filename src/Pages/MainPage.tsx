import { SALLOW_GREY_COLOR } from "../CommonConstant/StringColorConstant";
import { MAIN_PAGE_BOX_TYPING } from "../CommonConstant/TextConstant";
import MainPageBox from "../Components/MainPageContainer";
import PlayerCarousel from "../Components/PlayerCarousel";
import TextTypingBox from "../Components/TextTypingBox";
import "./MainPage.scss";

const MainPage = () => {
  return (
    <div className="page_container">
      <MainPageBox
        boxColor="yellow"
        includedComponent={<TextTypingBox text={MAIN_PAGE_BOX_TYPING} />}
      />
      <MainPageBox
        boxColor={SALLOW_GREY_COLOR}
        includedComponent={<PlayerCarousel />}
      />
    </div>
  );
};
export default MainPage;
