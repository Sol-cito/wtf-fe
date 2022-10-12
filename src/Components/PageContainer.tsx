import "./PageContainer.scss";

export interface PageContainerProps {
  includedComponent?: React.ReactElement;
  boxColor?: string | "black";
}

const PageContainer = (props: PageContainerProps) => {
  return (
    <div className="page_container" style={{ backgroundColor: props.boxColor }}>
      {props.includedComponent}
    </div>
  );
};
export default PageContainer;
