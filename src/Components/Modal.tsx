import { useAppDispatch } from "../Store/config";
import { ModalState, setModalState } from "../Store/Slices/PlayerModalSlice";
import "./Modal.scss";
import TransparentBackground from "./TransparentBackground";

export interface ModalProps {
  showModal: boolean;
  includedComponent?: React.ReactElement;
  backgroundStyle?: {};
}

const Modal = (props: ModalProps) => {
  const dispatch = useAppDispatch();

  const onClickModalClose = () => {
    const modalState: ModalState = {
      modalShow: false,
    };
    document.body.style.overflow = "unset";
    dispatch(setModalState(modalState));
  };

  return (
    <>
      {props.showModal ? (
        <>
          <TransparentBackground onClick={onClickModalClose} />
          <div className="modal_background" style={props.backgroundStyle}>
            <p className="modal_header" onClick={onClickModalClose}>
              X
            </p>
            <div className="modal_container">{props.includedComponent}</div>
          </div>
        </>
      ) : null}
    </>
  );
};
export default Modal;
