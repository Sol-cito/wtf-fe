import React from "react";
import "./SelectBox.scss";

export interface SelectBoxProps {
  value: string[];
  useStateFunc: Function;
}

const SelectBox = (props: SelectBoxProps) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.useStateFunc(event.target.value);
  };

  return (
    <select className="select_box" onChange={handleOnChange}>
      {props.value.map((element, idx) => (
        <option className="select_option" key={idx} value={element}>
          {element}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
