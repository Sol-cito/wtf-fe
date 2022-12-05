import React from "react";
import "./CustomizedInput.scss"; // to-do

export interface CustomizedInputProps {
  title: string;
  value: string;
  className?: string;
  onBlur?: Function;
  onChange?: Function;
  maxLength?: number;
  placeHolder?: string;
}

const CustomizedTextArea = (props: CustomizedInputProps) => {
  const handleOnBlur = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    return props.onBlur ? props.onBlur(e.target.value) : null;
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    return props.onChange ? props.onChange(e.target.value) : null;
  };

  return (
    <div className={"customized_text_area" + (props.className || "")}>
      <span className={"customized_text_area_title"}> {props.title} </span>
      <textarea
        className="customized_text"
        value={props.value}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        maxLength={props.maxLength}
        placeholder={props.placeHolder}
      />
    </div>
  );
};

export default CustomizedTextArea;
