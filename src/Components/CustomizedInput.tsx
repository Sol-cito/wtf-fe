import React from "react";
import "./CustomizedInput.scss";

export interface CustomizedInputProps {
  title: string;
  value: string;
  className?: string;
  onBlur?: Function;
  onChange?: Function;
  maxLength?: number;
  placeHolder?: string;
}

const CustomizedInput = (props: CustomizedInputProps) => {
  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    return props.onBlur ? props.onBlur(e.target.value) : null;
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return props.onChange ? props.onChange(e.target.value) : null;
  };

  return (
    <div className={"customized_input " + (props.className || "")}>
      <span className={"customized_input_title"}> {props.title} </span>
      <input
        className="customized_input_input"
        value={props.value}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        maxLength={props.maxLength}
        placeholder={props.placeHolder}
      />
    </div>
  );
};

export default CustomizedInput;
