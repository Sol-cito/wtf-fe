import React from "react";
import ThumbnailCard from "../Components/ThumbnailCard";
import "./MainPage.scss";

const MainPage = () => {
  return (
    <div className="body">
      <div className="thumbnail">
        <ThumbnailCard url={"img/thumbnail_1.jpg"} />
      </div>
    </div>
  );
};
export default MainPage;
