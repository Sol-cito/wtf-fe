import Modal from "../../Components/Modal";
import { useAppDispatch, useAppSelector } from "../../Store/config";
import { ModalState, setModalState } from "../../Store/Slices/PlayerModalSlice";
import "./AdminPage.scss";
import PlayerRegisterPage from "./PlayerRegisterPage";

const AdminPage = () => {
  const dispatch = useAppDispatch();

  const handleRegisterClick = () => {
    const playerRegisterModalState: ModalState = {
      modalShow: true,
    };
    document.body.style.overflow = "hidden";
    dispatch(setModalState(playerRegisterModalState));
  };
  const { modalShow } = useAppSelector((state) => state.modal);

  return (
    <div className="admin_background">
      <div className="admin_container">
        <button className="player_register" onClick={handleRegisterClick}>
          Player 등록
        </button>
        <button className="player_register">Player 수정</button>
      </div>
      <Modal showModal={modalShow} includedComponent={<PlayerRegisterPage />} />
    </div>
  );
};
export default AdminPage;
