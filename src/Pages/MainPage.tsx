import ThumbnailCard from "../Components/ThumbnailCard";
import "./MainPage.scss";

const MainPage = () => {
  const urlArr = [
    "img/thumbnail_1.jpg",
    "img/thumbnail_2.jpg",
    "img/thumbnail_3.jpg",
    "img/thumbnail_4.jpg",
    "img/thumbnail_5.jpg",
  ];

  return (
    <div className="grid_container">
      {urlArr.map((url, idx) => {
        return <ThumbnailCard key={idx} url={url} />;
      })}
    </div>
  );
};
export default MainPage;
