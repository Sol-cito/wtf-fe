import "./TransparentBackground.scss";

export interface TransparentBackgroundProps {
  zIndex?: number;
  onClick?: Function;
}

const TransparentBackground = (props: TransparentBackgroundProps) => {
  const handleOnClick = () => {
    if (props.onClick) props.onClick();
  };

  return (
    <>
      <div
        className="background_shadow"
        style={{
          zIndex: `${props.zIndex || 3}`,
        }}
        onClick={handleOnClick}
      />
    </>
  );
};
export default TransparentBackground;
