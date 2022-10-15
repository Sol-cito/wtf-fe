import { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { Link, useLocation } from "react-router-dom";
import HEADER_CONSTANT_DATA from "./CommonConstant/HeaderConstant";
import HamburgerBtn from "./Components/HamburgerBtn";
import HamburgerMenu from "./Components/HamburgerMenu";
import HeaderButton from "./Components/HeaderButton";
import HeaderLogo from "./Components/HeaderLogo";
import TransparentBackground from "./Components/TransparentBackground";
import "./Header.scss";
import { useAppDispatch } from "./Store/config";
import { setHeaderBtn } from "./Store/Slices/HeaderBtnSlice";

const Header = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [hamburgerTranslateYValue, setHamburgerTranslateYValue] =
    useState<number>(-100);

  const [showHamburgerMenuBtns, setShowHamburgerMenuBtns] =
    useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (showHamburgerMenuBtns) {
      setHamburgerTranslateYValue(0);
    } else {
      setHamburgerTranslateYValue(-100);
    }
  }, [showHamburgerMenuBtns]);

  const handleOnClickLogo = () => {
    dispatch(setHeaderBtn(HEADER_CONSTANT_DATA.headerButton[0].name));
  };

  const handleOnClickHamburger = () => {
    setShowHamburgerMenuBtns(!showHamburgerMenuBtns);
  };

  const handleOnClickShadowBackground = () => {
    handleOnClickHamburger();
  };

  return (
    <>
      <div className="header">
        <Link className="logo_area" to={"/"} onClick={handleOnClickLogo}>
          <HeaderLogo
            logoName={HEADER_CONSTANT_DATA.headerLogo.name}
            srcLink={HEADER_CONSTANT_DATA.headerLogo.srcLink}
          />
        </Link>
        <BrowserView>
          <div className="button_area">
            {HEADER_CONSTANT_DATA.headerButton.map((data, idx) => {
              return (
                <HeaderButton key={idx} btnName={data.name} url={data.url} />
              );
            })}
          </div>
        </BrowserView>
        <MobileView className="mobile_header">
          <HamburgerBtn handleOnClickHamburger={handleOnClickHamburger} />
        </MobileView>
      </div>
      <MobileView>
        {showHamburgerMenuBtns ? (
          <>
            <TransparentBackground
              zIndex={3}
              onClick={handleOnClickShadowBackground}
            />
          </>
        ) : null}
        <HamburgerMenu
          setShowHamburgerMenuBtns={setShowHamburgerMenuBtns}
          slideTranslateYValue={hamburgerTranslateYValue}
        />
      </MobileView>
    </>
  );
};
export default Header;
