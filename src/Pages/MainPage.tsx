import { BLACK, SALLWOW_BLACK } from "../CommonConstant/StringColorConstant";
import MainPageBox from "../Components/MainPageBox";
import MainTeamPhotoBox from "../Components/MainPageTeamPhotoBox";
import MatchResultBox from "../Components/MatchResultBox";
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
      <MainPageBox boxColor={BLACK} includedComponent={<MatchResultBox />} />
    </div>
  );
};
export default MainPage;
