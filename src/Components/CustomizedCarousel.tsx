import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { NOT_FOUND_IMG_PATH } from "../CommonConstant/ImgConstant";
import { CarouselSetting } from "../Models/CommonModel";
import "./CustomizedCarousel.scss";

export interface CarouselProps {
  settings: CarouselSetting;
  imageSrcs: Array<string>;
}

const CustomizedCarousel = (props: CarouselProps) => {
  return (
    <div className="carousel_container">
      <Slider {...props.settings}>
        {props.imageSrcs.map((ele, idx) => {
          return (
            <div>
              <img src={ele} alt={NOT_FOUND_IMG_PATH} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
export default CustomizedCarousel;
