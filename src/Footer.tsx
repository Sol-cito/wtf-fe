import "./Footer.scss";
import { FOOTER_COPY_RIGHT } from "./models/TextConstant";

const Footer = () => {
  return (
    <div className="footer">
      <span> {FOOTER_COPY_RIGHT} </span>
    </div>
  );
};
export default Footer;
