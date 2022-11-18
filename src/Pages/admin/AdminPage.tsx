import { Button } from "@material-ui/core";
import { useState } from "react";
import "./AdminPage.scss";
import MatchResultRegisterFragment from "./MatchResultRegisterFragment";
import PlayerModificationFragment from "./PlayerModificationFragment";
import PlayerRegistrationFragment from "./PlayerRegistrationFragment";
import TeamRegisterFragment from "./TeamRegisterFragment";

const AdminPage = () => {
  const [fragment, setFragment] = useState<React.ReactElement>();

  const handleFragmentButtonClick = (fragment: React.ReactElement) => {
    setFragment(fragment);
  };

  return (
    <div className="admin_background">
      <div className="admin_menu_container">
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() =>
            handleFragmentButtonClick(<PlayerRegistrationFragment />)
          }
          className="player_register"
        >
          선수 등록
        </Button>

        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() =>
            handleFragmentButtonClick(<PlayerModificationFragment />)
          }
          className="player_modification"
        >
          선수 정보 수정
        </Button>

        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() => {
            alert("기능 개발중");
          }}
          className="player_delete"
        >
          등록 선수 삭제
        </Button>

        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() => handleFragmentButtonClick(<TeamRegisterFragment />)}
          className="team_register"
        >
          팀 등록
        </Button>

        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() =>
            handleFragmentButtonClick(<MatchResultRegisterFragment />)
          }
          className="match_result_register"
        >
          매치 결과 등록
        </Button>
      </div>
      <div className="fragment_container">{fragment}</div>
    </div>
  );
};
export default AdminPage;
