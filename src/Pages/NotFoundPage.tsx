import { Link } from "react-router-dom";
import "./NotFoundPage.scss";

const NotFoundPage = () => {
  return (
    <div className="not_found_container">
      <h1>Page Not Found</h1>
      <div>
        <Link to={"/"}>홈으로</Link>
      </div>
    </div>
  );
};
export default NotFoundPage;
