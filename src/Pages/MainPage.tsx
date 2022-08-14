import { Container, Grid } from "@material-ui/core";
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
              <ThumbnailCard url={data.url} text={data.text} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
export default MainPage;
