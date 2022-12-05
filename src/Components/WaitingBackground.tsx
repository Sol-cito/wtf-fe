import TransparentBackground from "./TransparentBackground";
import CustomizedSpinner from "./CustomizedSpinner";
import "./WaitingBackground.scss";

export interface WaitingBackgroundProps {
  spinnerColor?: string;
}

const WaitingBackground = (props?: WaitingBackgroundProps) => {
  return (
    <>
      <TransparentBackground />
      <CustomizedSpinner color={props?.spinnerColor} zIndex={5} />
    </>
  );
};

export default WaitingBackground;
