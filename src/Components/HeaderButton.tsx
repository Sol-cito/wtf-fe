import React from "react";
import "./HeaderButton.scss";

export interface ButtonProps {
  btnName: string;
  url: string;
}

const HeaderButton = (props: ButtonProps) => {
  return (
    <div className="header_button">
      <div className="button_name">{props.btnName}</div>
    </div>
  );
};
export default HeaderButton;
