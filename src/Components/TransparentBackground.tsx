import "./TransparentBackground.scss";

export interface TransparentBackgroundProps {
  zIndex?: number;
  height?: string;
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
          height: `${props.height}`,
        }}
        onClick={handleOnClick}
      />
    </>
  );
};
export default TransparentBackground;
