import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Store/config";
import { setHeaderBtn } from "../Store/Slices/HeaderBtnSlice";
import "./HeaderButton.scss";

export interface ButtonProps {
  btnName: string;
  url: string;
}

const HeaderButton = (props: ButtonProps) => {
  const { value } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    dispatch(setHeaderBtn(props.btnName));
  };

  const changeFirstLetterUpperCase = (target: string) => {
    return target.charAt(0).toUpperCase() + target.slice(1);
  };

  return (
    <Link to={props.url} onClick={handleOnClick}>
      <div className="header_button">
        <div
          className={"button_name" + (props.btnName === value ? " active" : "")}
        >
          {changeFirstLetterUpperCase(props.btnName)}
        </div>
      </div>
    </Link>
  );
};
export default HeaderButton;
