import { BLACK, SALLWOW_BLACK } from "../CommonConstant/StringColorConstant";
import PageContainer from "../Components/PageContainer";
import MainTeamPhotoBox from "../Components/MainPageTeamPhotoBox";
import MatchResultBox from "../Components/MatchResultBox";
import PlayerSlide from "../Components/PlayerSlide";
import "./MainPage.scss";

const MainPage = () => {
  return (
    <>
      <PageContainer
        boxColor={BLACK}
        includedComponent={<MainTeamPhotoBox />}
      />
      <PageContainer
        boxColor={SALLWOW_BLACK}
        includedComponent={<PlayerSlide />}
      />
      <PageContainer boxColor={BLACK} includedComponent={<MatchResultBox />} />
    </>
  );
};
export default MainPage;
