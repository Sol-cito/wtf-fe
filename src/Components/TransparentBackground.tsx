import "./TransparentBackground.scss";

export interface TransparentBackgroundProps {
  onClick?: Function;
}

const TransparentBackground = (props: TransparentBackgroundProps) => {
  const handleOnClick = () => {
    if (props.onClick) props.onClick();
  };

  return (
    <>
      <div className="background_shadow" onClick={handleOnClick} />
    </>
  );
};
export default TransparentBackground;
