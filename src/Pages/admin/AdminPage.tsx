import { useState } from "react";
import PlayerRegisterBox from "../../Components/PlayerRegisterBox";
import "./AdminPage.scss";

const AdminPage = () => {
  const [fragment, setFragment] = useState<React.ReactElement>();

  const handleRegisterClick = () => {
    setFragment(<PlayerRegisterBox />);
  };

  return (
    <div className="admin_background">
      <div className="admin_menu_container">
        <button className="player_register" onClick={handleRegisterClick}>
          Player 등록 및 수정
        </button>
      </div>
      <div className="fragment_container">{fragment}</div>
    </div>
  );
};
export default AdminPage;
