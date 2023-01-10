import { useState } from "react";
import HEADER_CONSTANT_DATA from "../CommonConstant/HeaderConstant";
import "./HamburgerMenu.scss";
import HeaderButton from "./HeaderButton";

export interface HamburgerMenuProps {
  slideTranslateYValue: number;
  setShowHamburgerMenuBtns: Function;
}

const HamburgerMenu = (props: HamburgerMenuProps) => {
  return (
    <div
      className="hamburger_menu_area"
      style={{
        transform: `translateY(${props.slideTranslateYValue}%)`,
      }}
    >
      {HEADER_CONSTANT_DATA.headerButton.map((data, idx) => {
        return (
          <div className="header_menu_btn_area" key={idx}>
            <HeaderButton
              btnName={data.name}
              url={data.url}
              onClick={() => {
                props.setShowHamburgerMenuBtns(false);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default HamburgerMenu;
