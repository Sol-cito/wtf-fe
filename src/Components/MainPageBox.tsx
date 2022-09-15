import "./MainPageBox.scss";

export interface MainPageBoxProps {
  includedComponent?: React.ReactElement;
  boxColor?: string | "black";
}

const MainPageBox = (props: MainPageBoxProps) => {
  return (
    <div className="main_page_box" style={{ backgroundColor: props.boxColor }}>
      <div className="box_inside">메인 페이지 박스</div>
    </div>
  );
};
export default MainPageBox;
