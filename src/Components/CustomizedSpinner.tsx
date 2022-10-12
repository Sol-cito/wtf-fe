import "./CustomizedSpinner.scss";
import { PulseLoader } from "react-spinners";

export interface CustomizedSpinnerProps {
  color?: string;
}

const CustomizedSpinner = (props: CustomizedSpinnerProps) => {
  return (
    <div className="pulse_loader">
      <PulseLoader color={props.color || "yellow"} />
    </div>
  );
};

export default CustomizedSpinner;
