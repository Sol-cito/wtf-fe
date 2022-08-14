import { useLocation, useParams } from "react-router-dom";
import "./ProjectPage.scss";

const ProjectPage = () => {
  const { projectName } = useParams();

  const location = useLocation();

  return (
    <div className="projectPage_container">
      <img src="img/thumbnail_1.jpg" />
    </div>
  );
};
export default ProjectPage;
