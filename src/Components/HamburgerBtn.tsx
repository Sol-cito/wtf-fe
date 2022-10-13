import { useState } from "react";
import HEADER_CONSTANT_DATA from "../CommonConstant/HeaderConstant";
import "./HamburgerBtn.scss";
import HeaderButton from "./HeaderButton";

export interface HamburgerBtnProps {}

const HamburgerBtn = (props: HamburgerBtnProps) => {
  const [showButtons, setShowButtons] = useState<boolean>(false);

  return (
    <div className="hamburger_area">
      <img
        src="/img/etc/hamburger_btn.jpg"
        onClick={() => {
          setShowButtons(!showButtons);
        }}
      />
      {showButtons
        ? HEADER_CONSTANT_DATA.headerButton.map((data, idx) => {
            return (
              <div>
                <HeaderButton key={idx} btnName={data.name} url={data.url} />
              </div>
            );
          })
        : null}
    </div>
  );
};

export default HamburgerBtn;
