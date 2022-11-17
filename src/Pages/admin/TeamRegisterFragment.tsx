import { useEffect, useState } from "react";
import CustomizedPopup from "../../Components/CustomizedPopup";
import TeamInfoInputBox from "../../Components/TeamInfoInputBox";
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

  const getAllTeamList = async () => {
    const res: TeamModel[] = await getAllTeams();
    if (res) {
      setTeams(res);
      if (!selectedTeam) {
        setSelectedTeam(res[0]);
      }
    }
  };

  useEffect(() => {
    getAllTeamList();
  }, []);

  const handleTeamMultiPart = async (team: TeamModel, formData: FormData) => {
    // const registrationResult: TeamModel = await modifyPlayerAPI(formData);
    const registrationResult = null;
    if (registrationResult) {
      // setPopupTitle(
      //   "[Success] Team Registration Success!! " + registrationResult.name
      // );
      getAllTeams();
    } else {
      setPopupTitle("[ERROR] 요청 실패...개발자에게 문의 ㄱㄱ");
    }
    setPopupShow(true);
  };

  return (
    <>
      <TeamInfoInputBox
        title={"팀 등록"}
        handleTeamMultiPart={handleTeamMultiPart}
        // playerInfo={selectedPlayer}
      />
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
