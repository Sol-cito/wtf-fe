import { Button } from "@material-ui/core";
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
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={handleRegisterClick}
          className="player_register"
        >
          선수 등록
        </Button>

        <Button
          size="large"
          variant="contained"
          color="primary"
          // onClick={}
          className="player_register"
        >
          선수 정보 수정
        </Button>

        <Button
          size="large"
          variant="contained"
          color="primary"
          // onClick={}
          className="player_register"
        >
          등록 선수 삭제
        </Button>

        <Button
          size="large"
          variant="contained"
          color="primary"
          // onClick={}
          className="player_register"
        >
          매치 결과 등록
        </Button>
      </div>
      <div className="fragment_container">{fragment}</div>
    </div>
  );
};
export default AdminPage;
