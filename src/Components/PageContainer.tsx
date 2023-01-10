import "./PageContainer.scss";

export interface PageContainerProps {
  title?: string;
  includedComponent?: React.ReactElement;
  boxColor?: string | "black";
}

const PageContainer = (props: PageContainerProps) => {
  return (
    <div className="page_container" style={{ backgroundColor: props.boxColor }}>
      {props.title ? (
        <div className="page_title_container">
          <p> {props.title} </p>
        </div>
      ) : null}
      {props.includedComponent}
    </div>
  );
};
export default PageContainer;
