import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Store/config";
import { setHeaderBtn } from "../Store/Slices/HeaderBtnSlice";
import "./HeaderButton.scss";

export interface ButtonProps {
  btnName: string;
  url: string;
  onClick?: Function;
}

const HeaderButton = (props: ButtonProps) => {
  const { headerBtnValue } = useAppSelector((state) => state.headerBtn);
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    dispatch(setHeaderBtn(props.btnName));
    if (props.onClick) props.onClick();
  };

  const changeFirstLetterUpperCase = (target: string) => {
    return target.charAt(0).toUpperCase() + target.slice(1);
  };

  return (
    <Link to={props.url} onClick={handleOnClick} className="header_button">
      <span
        className={
          "button_name" + (props.btnName === headerBtnValue ? " active" : "")
        }
      >
        {changeFirstLetterUpperCase(props.btnName)}
      </span>
    </Link>
  );
};
export default HeaderButton;
