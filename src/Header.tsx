import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderButton from "./Components/HeaderButton";
import HeaderLogo from "./Components/HeaderLogo";
import "./Header.scss";
import HEADER_MODEL_DATA from "./Models/HeaderModel";

const Header = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [selectedHeaderBtn, setSelectedHeaderBtn] = useState<string>(
    location.pathname.slice(1)
      ? location.pathname.slice(1)
      : HEADER_MODEL_DATA.headerButton[0].name
  );

  const handleOnClickLogo = () => {
    setSelectedHeaderBtn(HEADER_MODEL_DATA.headerButton[0].name);
  };

  return (
    <div className="header">
      <Link className="logo_area" to={"/"} onClick={handleOnClickLogo}>
        <HeaderLogo
          logoName={HEADER_MODEL_DATA.headerLogo.name}
          srcLink={HEADER_MODEL_DATA.headerLogo.srcLink}
        />
      </Link>
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
