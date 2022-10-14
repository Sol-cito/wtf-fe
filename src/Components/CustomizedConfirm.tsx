import { Button } from "@material-ui/core";
import "./CustomizedConfirm.scss";
import TransparentBackground from "./TransparentBackground";

export interface CustomizedConfirmProps {
  confirmQuestion: string;
  show: boolean;
  contents?: string;
  onClickConfirm: Function;
  onClickCancel: Function;
}

const CustomizedConfirm = (props: CustomizedConfirmProps) => {
  return (
    <>
      {props.show ? (
        <>
          <TransparentBackground zIndex={9} />
          <div className="confirm_box">
            <div>
              <p>{props.confirmQuestion}</p>
              <div className="contents_area">
                <span>{props.contents}</span>
              </div>
              <div className="btn_area">
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    props.onClickConfirm();
                  }}
                  className="button"
                >
                  확인
                </Button>
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    props.onClickCancel();
                  }}
                  className="button"
                >
                  취소
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default CustomizedConfirm;
