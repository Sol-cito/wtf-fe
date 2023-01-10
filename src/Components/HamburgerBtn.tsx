import "./HamburgerBtn.scss";

export interface HamburgerBtnProps {
  handleOnClickHamburger: Function;
}

const HamburgerBtn = (props: HamburgerBtnProps) => {
  return (
    <div className="hamburger_area">
      <img
        src="/img/etc/hamburger_btn.jpg"
        onClick={() => {
          props.handleOnClickHamburger();
        }}
      />
    </div>
  );
};

export default HamburgerBtn;
