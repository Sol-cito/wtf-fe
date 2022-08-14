import "./AboutPage.scss";

const AboutPage = () => {
  return (
    <div className="about_container">
      <div className="about_header">
        <div id="name">Nayoung Lee</div>
        <div id="position">Global Communications Specialist</div>
        <div id="position_detail">(Social Media, Digital & Visual Comms)</div>
        <div id="brief_intro">
          A digital communications professional with 5+ years of experiences
          working in the international organizations within various
          multicultural contexts.
        </div>
      </div>
      <div className="about_photo">
        <img src="img/temp_photo.jpg" />
      </div>
      <div className="professional_experience">
        <div id="company">UN-HABITAT</div>
        <div id="position">Graphic Communications Analyst</div>
        <div id="description">
          Social media management and monitoring, strategy development for each
          platform
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
