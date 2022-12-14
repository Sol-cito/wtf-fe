import "./CustomizedSelectBox.scss";

export interface CustomizedOptions {
  id?: number;
  value: string;
}

export interface CustomizedSelectBox {
  title: string;
  useStateFuncForId?: Function;
  defaultValue: string;
  useStateFuncForValue: Function;
  options: CustomizedOptions[];
  className?: string;
}

const CustomizedSelectBox = (props: CustomizedSelectBox) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const idx: number = event.target.selectedIndex;
    props.useStateFuncForValue(event.target[idx].textContent);
    if (props.useStateFuncForId) {
      props.useStateFuncForId(Number(event.target[idx].id));
    }
  };

  return (
    <div className={"customized_select_box " + props.className}>
      <span>{props.title} </span>
      <select
        className="select_each"
        value={props.defaultValue}
        onChange={handleOnChange}
      >
        {props.options &&
          props.options.length > 0 &&
          props.options.map((element, idx) => {
            return (
              <option
                className="select_option"
                key={idx}
                id={String(element.id)}
                value={element.value}
              >
                {element.value}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default CustomizedSelectBox;
