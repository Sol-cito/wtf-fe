import { Link } from "react-router-dom";
import "./HeaderButton.scss";

export interface ButtonProps {
  btnName: string;
  isSelected: boolean;
  url: string;
  setSelectedHeaderBtn: Function;
}

const HeaderButton = (props: ButtonProps) => {
  const handleOnClick = () => {
    props.setSelectedHeaderBtn(props.btnName);
  };

  return (
    <Link to={props.url} onClick={handleOnClick}>
      <div className="header_button">
        <div className={"button_name" + (props.isSelected ? " active" : "")}>
          {props.btnName}
        </div>
      </div>
    </Link>
  );
};
export default HeaderButton;
