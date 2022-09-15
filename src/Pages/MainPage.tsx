import MainPageBox from "../Components/MainPageBox";
import "./MainPage.scss";

const MainPage = () => {
  return (
    <div className="page_container">
      <MainPageBox boxColor="yellow" />
      <MainPageBox />
    </div>
  );
};
export default MainPage;
