import "./MainPageBox.scss";

export interface MainPageContainerProps {
  includedComponent?: React.ReactElement;
  boxColor?: string | "black";
}

const MainPageBox = (props: MainPageContainerProps) => {
  return (
    <div
      className="main_page_container"
      style={{ backgroundColor: props.boxColor }}
    >
      {props.includedComponent}
    </div>
  );
};
export default MainPageBox;
