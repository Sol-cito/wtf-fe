import TransparentBackground from "./TransparentBackground";
import CustomizedSpinner from "./CustomizedSpinner";

const WaitingBackground = () => {
  return (
    <>
      <TransparentBackground />
      <CustomizedSpinner zIndex={5} />
    </>
  );
};

export default WaitingBackground;
