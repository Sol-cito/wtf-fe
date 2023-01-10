import TransparentBackground from "./TransparentBackground";
import CustomizedSpinner from "./CustomizedSpinner";
import "./WaitingBackground.scss";

export interface WaitingBackgroundProps {
  spinnerColor?: string;
  className?: string;
  zIndex?: number;
}

const WaitingBackground = (props?: WaitingBackgroundProps) => {
  return (
    <div className={`${props?.className}`}>
      <TransparentBackground zIndex={props?.zIndex} />
      <CustomizedSpinner color={props?.spinnerColor} zIndex={5} />
    </div>
  );
};

export default WaitingBackground;
