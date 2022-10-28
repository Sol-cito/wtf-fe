import { useEffect, useState } from "react";
import CustomizedPopup from "../../Components/CustomizedPopup";
import TeamList from "../../Components/TeamList";
import { PlayerModel } from "../../Models/PlayerModel";
import { TeamModel } from "../../Models/TeamModel";
import { modifyPlayerAPI } from "../../Service/PlayerService";
import { getAllTeams } from "../../Service/TeamService";
import "./TeamRegisterFragment.scss";

const TeamRegisterFragment = () => {
  const [teams, setTeams] = useState<TeamModel[]>();
  const [selectedTeam, setSelectedTeam] = useState<TeamModel>();

  const [popupTitle, setPopupTitle] = useState<string>("");
  const [popupShow, setPopupShow] = useState<boolean>(false);

  const getAllRegisteredPlayers = async () => {
    const res: TeamModel[] = await getAllTeams();
    if (res) {
      setTeams(res);
      if (!selectedTeam) {
        setSelectedTeam(res[0]);
      }
    }
  };

  useEffect(() => {
    getAllRegisteredPlayers();
  }, []);

  const handlePlayerMultiPart = async (
    palyer: PlayerModel,
    formData: FormData
  ) => {
    const modificationResult: PlayerModel = await modifyPlayerAPI(formData);
    if (modificationResult) {
      setPopupTitle(
        "[Success] Player Info Modification Success!! " +
          modificationResult.name
      );
      getAllRegisteredPlayers();
    } else {
      setPopupTitle("[ERROR] 요청 실패...개발자에게 문의 ㄱㄱ");
    }
    setPopupShow(true);
  };

  return (
    <>
      {/* <PlayerInfoInputBox
        title={"선수 정보 수정"}
        handlePlayerMultiPart={handlePlayerMultiPart}
        playerInfo={selectedPlayer}
      /> */}
      <TeamList
        teams={teams}
        title={"< 현재 등록된 팀 >"}
        isRadioButtonVisible={false}
      />
      <CustomizedPopup
        title={popupTitle}
        show={popupShow}
        onClickOk={() => {
          setPopupShow(false);
        }}
      />
    </>
  );
};

export default TeamRegisterFragment;
