import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderButton from "./Components/HeaderButton";
import HeaderLogo from "./Components/HeaderLogo";
import "./Header.scss";
import HEADER_MODEL_DATA from "./Models/HeaderModel";
import { useAppDispatch, useAppSelector } from "./Store/config";
import { setHeaderBtn } from "./Store/Slices/HeaderBtnSlice";

const Header = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleOnClickLogo = () => {
    dispatch(setHeaderBtn(HEADER_MODEL_DATA.headerButton[0].name));
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
          return <HeaderButton key={idx} btnName={data.name} url={data.url} />;
        })}
      </div>
    </div>
  );
};
export default Header;
