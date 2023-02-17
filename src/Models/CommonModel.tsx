import { OrderSortKeyword } from "./Enum/CommonEnum";

export interface CarouselSetting {
  dots: boolean;
  arrows: boolean;
  infinite: boolean;
  autoplay: boolean;
  autoplaySpeed: number;
  slidesToShow: number;
}

export interface SortModel {
  columnName: string;
  sortDirection: OrderSortKeyword;
}
