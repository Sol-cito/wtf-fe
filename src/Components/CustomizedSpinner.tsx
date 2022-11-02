import "./CustomizedSpinner.scss";
import { PulseLoader } from "react-spinners";

export interface CustomizedSpinnerProps {
  color?: string;
  zIndex?: number;
}

const CustomizedSpinner = (props: CustomizedSpinnerProps) => {
  return (
    <div className="pulse_loader">
      <PulseLoader
        color={props.color || "yellow"}
        style={{
          zIndex: `${props.zIndex || 2}`,
        }}
      />
    </div>
  );
};

export default CustomizedSpinner;
