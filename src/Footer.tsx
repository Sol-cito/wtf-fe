import "./Footer.scss";
import {
  FOOTER_COPY_RIGHT,
  FOOTER_DEVELOPER_INFO,
} from "./CommonConstant/TextConstant";

const Footer = () => {
  return (
    <div className="footer">
      <span>
        {FOOTER_DEVELOPER_INFO}{" "}
        <a href="https://www.linkedin.com/in/sol-cito" target="_blank">
          Sol
        </a>
      </span>
      <br />
      <span>{FOOTER_COPY_RIGHT}</span>
      <div className="icon_area">
        <a href="https://www.instagram.com/yonsei_wtf/" target="_blank">
          <img src="/img/etc/instagram_icon.png" />
        </a>
        <a href="https://www.facebook.com/yonseisoccerwtf/" target="_blank">
          <img src="/img/etc/facebook_icon.png" />
        </a>
      </div>
    </div>
  );
};
export default Footer;
