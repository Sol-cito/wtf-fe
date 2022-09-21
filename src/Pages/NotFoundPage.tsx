import { Link } from "react-router-dom";
import HEADER_CONSTANT_DATA from "../CommonConstant/HeaderConstant";
import { GO_BACK_HOME, PAGE_NOT_FOUND } from "../CommonConstant/TextConstant";
import { useAppDispatch, useAppSelector } from "../Store/config";
import { setHeaderBtn } from "../Store/Slices/HeaderBtnSlice";
import "./NotFoundPage.scss";

const NotFoundPage = () => {
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    dispatch(setHeaderBtn(HEADER_CONSTANT_DATA.headerButton[0].name));
  };

  return (
    <div className="not_found_container">
      <h1>{PAGE_NOT_FOUND}</h1>
      <div>
        <Link to={"/"} onClick={handleOnClick}>
          {GO_BACK_HOME}
        </Link>
      </div>
    </div>
  );
};
export default NotFoundPage;
