import MainPageBox from "../Components/MainPageContainer";
import TextTypingBox from "../Components/TextTypingBox";
import { MAIN_PAGE_BOX_TYPING } from "../Models/TextConstant";
import "./MainPage.scss";

const MainPage = () => {
  return (
    <div className="page_container">
      <MainPageBox
        boxColor="yellow"
        includedComponent={<TextTypingBox text={MAIN_PAGE_BOX_TYPING} />}
      />
      <MainPageBox />
    </div>
  );
};
export default MainPage;
