import { useState } from "react";
import HeaderButton from "./Components/HeaderButton";
import HeaderLogo from "./Components/HeaderLogo";
import "./Header.scss";
import HEADER_MODEL_DATA from "./models/HeaderModel";

const Header = () => {
  const [selectedHeaderBtn, setSelectedHeaderBtn] = useState<string>(
    HEADER_MODEL_DATA.headerButton[0].name
  );

  return (
    <div className="header">
      <div className="logo_area">
        <HeaderLogo logoName={HEADER_MODEL_DATA.headerLogoName} />
      </div>
      <div className="button_area">
        {HEADER_MODEL_DATA.headerButton.map((data, idx) => {
          return (
            <HeaderButton
              key={idx}
              btnName={data.name}
              isSelected={data.name === selectedHeaderBtn}
              url={data.url}
              setSelectedHeaderBtn={setSelectedHeaderBtn}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Header;
