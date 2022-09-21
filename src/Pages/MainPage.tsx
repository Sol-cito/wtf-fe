import { BLACK, SALLWOW_BLACK } from "../CommonConstant/StringColorConstant";
import MainPageBox from "../Components/MainPageContainer";
import MainTeamPhotoBox from "../Components/MainPageTeamPhotoBox";
import PlayerSlide from "../Components/PlayerSlide";
import "./MainPage.scss";

const MainPage = () => {
  return (
    <div className="page_container">
      <MainPageBox boxColor={BLACK} includedComponent={<MainTeamPhotoBox />} />
      <MainPageBox
        boxColor={SALLWOW_BLACK}
        includedComponent={<PlayerSlide />}
      />
    </div>
  );
};
export default MainPage;
