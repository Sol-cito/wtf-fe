import { useParams } from "react-router-dom";
import "./MainPage.scss";

const ProjectPage = () => {
  const { projectName } = useParams();

  return <>프로젝트 페이지 {projectName}</>;
};
export default ProjectPage;
