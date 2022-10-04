import React from "react";
import "./CustomizedSelectBox.scss";

export interface CustomizedSelectBox {
  title: string;
  value: string[];
  className?: string;
  useStateFunc: Function;
}

const CustomizedSelectBox = (props: CustomizedSelectBox) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.useStateFunc(event.target.value);
  };

  return (
    <div className={"customized_select_box " + props.className}>
      <span>{props.title} </span>
      <select className="select_each" onChange={handleOnChange}>
        {props.value.map((element, idx) => (
          <option className="select_option" key={idx} value={element}>
            {element}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomizedSelectBox;
