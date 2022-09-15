import MainPageBox from "../Components/MainPageContainer";
import TextTypingBox from "../Components/TextTypingBox";
import { MAIN_PAGE_BOX_TYPING } from "../CommonConstant/TextConstant";
import "./MainPage.scss";
import { SALLOW_GREY_COLOR } from "../CommonConstant/StringColorConstant";

const MainPage = () => {
  return (
    <div className="page_container">
      <MainPageBox
        boxColor="yellow"
        includedComponent={<TextTypingBox text={MAIN_PAGE_BOX_TYPING} />}
      />
      <MainPageBox boxColor={SALLOW_GREY_COLOR} />
    </div>
  );
};
export default MainPage;
