import AboutBox from "../Components/AboutBox";
import PageContainer from "../Components/PageContainer";
import "./AboutPage.scss";

const AboutPage = () => {
  return (
    <PageContainer title="Who are we ?" includedComponent={<AboutBox />} />
  );
};
export default AboutPage;
