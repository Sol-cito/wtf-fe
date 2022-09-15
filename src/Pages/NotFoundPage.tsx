import { Link } from "react-router-dom";
import { GO_BACK_HOME, PAGE_NOT_FOUND } from "../models/TextConstant";
import "./NotFoundPage.scss";

const NotFoundPage = () => {
  return (
    <div className="not_found_container">
      <h1>{PAGE_NOT_FOUND}</h1>
      <div>
        <Link to={"/"}>{GO_BACK_HOME}</Link>
      </div>
    </div>
  );
};
export default NotFoundPage;
