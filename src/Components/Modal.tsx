import { url } from "inspector";
import { useAppDispatch, useAppSelector } from "../Store/config";
import {
  PlayerModalState,
  setPlayerModalState,
} from "../Store/Slices/PlayerModalSlice";
import "./Modal.scss";

export interface ModalProps {
  showModal: boolean;
  includedComponent?: React.ReactElement;
  backgroundStyle?: {};
}

const Modal = (props: ModalProps) => {
  const dispatch = useAppDispatch();

  const onClickModalClose = () => {
    const playerModalState: PlayerModalState = {
      modalShow: false,
    };
    document.body.style.overflow = "unset";
    dispatch(setPlayerModalState(playerModalState));
  };

  return (
    <>
      {props.showModal ? (
        <>
          <div className="modal_back_shadow" onClick={onClickModalClose} />
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
