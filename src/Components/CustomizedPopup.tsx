import { Button } from "@material-ui/core";
import "./CustomizedPopup.scss";
import TransparentBackground from "./TransparentBackground";

export interface CustomizedPopupProps {
  title: string;
  show: boolean;
  contents?: string;
  onClickOk: Function;
}

const CustomizedPopup = (props: CustomizedPopupProps) => {
  return (
    <>
      {props.show ? (
        <>
          <TransparentBackground zIndex={9} />
          <div className="popup_box">
            <div>
              <p>{props.title}</p>
              <div className="contents_area">
                <span>{props.contents}</span>
              </div>
              <div className="btn_area">
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    props.onClickOk();
                  }}
                  className="button"
                >
                  확인
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default CustomizedPopup;
