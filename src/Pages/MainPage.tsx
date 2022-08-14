import { Container, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import ThumbnailCard from "../Components/ThumbnailCard";
import THUMBNAIL_DATA from "../models/ThumbnailModel";
import "./MainPage.scss";

const MainPage = () => {
  return (
    <div className="grid_container">
      <Grid container spacing={1}>
        {THUMBNAIL_DATA.map((data, idx) => {
          return (
            <Grid item key={idx} xs={12} sm={4}>
              <Link to={data.linkUrl}>
                <ThumbnailCard imgUrl={data.imgUrl} text={data.text} />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
export default MainPage;
