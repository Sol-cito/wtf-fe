import { useEffect, useRef, useState } from "react";
import CustomizedPopup from "../../Components/CustomizedPopup";
import TeamInfoInputBox from "../../Components/TeamInfoInputBox";
import TeamList from "../../Components/TeamList";
import WaitingBackground from "../../Components/WaitingBackground";
import { TeamModel } from "../../Models/TeamModel";
import { getAllTeamsAPI, modifyTeamAPI } from "../../Service/TeamService";
import "./TeamRegisterFragment.scss"; // check if it needs to be changed

const TeamModificationFragment = () => {
  const [teams, setTeams] = useState<TeamModel[]>();

  const [selectedTeam, setSelectedTeam] = useState<TeamModel>();

  const [popupTitle, setPopupTitle] = useState<string>("");
  const [popupShow, setPopupShow] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAllTeamList = async () => {
    setIsLoading(true);
    const res: TeamModel[] = await getAllTeamsAPI();
    if (res) {
      setTeams(res);
      if (!selectedTeam) {
        setSelectedTeam(res[0]);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllTeamList();
  }, []);

  const handleTeamMultiPart = async (formData: FormData) => {
    const modificationResult: TeamModel = await modifyTeamAPI(formData); // need to be modified
    if (modificationResult) {
      setPopupTitle(
        "[Success] Team Modification Success!! " + modificationResult.name
      );
      getAllTeamList();
    } else {
      setPopupTitle("[ERROR] 요청 실패...개발자에게 문의 ㄱㄱ");
    }
    setPopupShow(true);
  };

  return (
    <>
      {teams && selectedTeam && (
        <TeamInfoInputBox
          title={"팀 정보 수정"}
          teamInfo={selectedTeam}
          handleTeamMultiPart={handleTeamMultiPart}
        />
      )}
      <TeamList
        teams={teams}
        title={"< 현재 등록된 팀 >"}
        isRadioButtonVisible={true}
        initialSelectedRadioId={selectedTeam?.id}
        setSelectedTeam={setSelectedTeam}
      />
      {isLoading && <WaitingBackground />}
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

export default TeamModificationFragment;
