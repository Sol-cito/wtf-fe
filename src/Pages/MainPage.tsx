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
        title="Players"
        boxColor={SALLWOW_BLACK}
        includedComponent={<PlayerSlide />}
      />
      <PageContainer
        title="Recent Match Results"
        boxColor={BLACK}
        includedComponent={<MatchResultBox />}
      />
    </>
  );
};
export default MainPage;
