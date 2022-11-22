import React from "react";
import "./CustomizedSelectBox.scss";

export interface CustomizedOptions {
  id?: number;
  value: string;
}

export interface CustomizedSelectBox {
  title: string;
  useStateFuncForId?: Function;
  value: string;
  useStateFuncForValue: Function;
  options: CustomizedOptions[];
  className?: string;
}

const CustomizedSelectBox = (props: CustomizedSelectBox) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.useStateFuncForValue(event.target.value);
    if (props.useStateFuncForId)
      props.useStateFuncForId(Number(event.target.id));
  };

  return (
    <div className={"customized_select_box " + props.className}>
      <span>{props.title} </span>
      <select
        className="select_each"
        onChange={handleOnChange}
        value={props.value}
      >
        {props.options &&
          props.options.length > 0 &&
          props.options.map((element, idx) => (
            <option
              className="select_option"
              key={idx}
              id={element.id ? String(element.id) : ""}
              value={element.value}
            >
              {element.value}
            </option>
          ))}
      </select>
    </div>
  );
};

export default CustomizedSelectBox;
