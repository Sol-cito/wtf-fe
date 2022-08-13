import React from "react";
import HeaderButton, { ButtonProps } from "./Components/HeaderButton";
import HeaderLogo from "./Components/HeaderLogo";
import "./Header.scss";

const Header = () => {
  const homeBtnProps: ButtonProps = {
    btnName: "Home",
    url: "",
  };

  const contactBtnProps: ButtonProps = {
    btnName: "Contact",
    url: "",
  };

  const headerLogoName: string = "LesleyDesign";

  return (
    <div className="header">
      <div className="logo_area">
        <HeaderLogo logoName={headerLogoName} />
      </div>
      <div className="button_area">
        <HeaderButton btnName={homeBtnProps.btnName} url={homeBtnProps.url} />
        <HeaderButton
          btnName={contactBtnProps.btnName}
          url={contactBtnProps.url}
        />
      </div>
    </div>
  );
};
export default Header;
