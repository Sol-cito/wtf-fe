import { useEffect, useRef, useState } from "react";
import CustomizedPopup from "../../Components/CustomizedPopup";
import TeamInfoInputBox from "../../Components/TeamInfoInputBox";
import TeamList from "../../Components/TeamList";
import WaitingBackground from "../../Components/WaitingBackground";
import { TeamModel } from "../../Models/TeamModel";
import { getAllTeamsAPI, registerNewTeamAPI } from "../../Service/TeamService";
import "./TeamRegisterFragment.scss";

const TeamRegisterFragment = () => {
  const initStateRef: React.Ref<any> = useRef({});

  const [teams, setTeams] = useState<TeamModel[]>();

  const [popupTitle, setPopupTitle] = useState<string>("");
  const [popupShow, setPopupShow] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAllTeamList = async () => {
    setIsLoading(true);
    const res: TeamModel[] = await getAllTeamsAPI();
    if (res) {
      setTeams(res);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllTeamList();
  }, []);

  const handleTeamMultiPart = async (formData: FormData) => {
    const registrationResult: TeamModel = await registerNewTeamAPI(formData);
    if (registrationResult) {
      setPopupTitle(
        "[Success] Team Registration Success!! " + registrationResult.name
      );
      initStateRef.current.initState();
    } else {
      setPopupTitle("[ERROR] 요청 실패...개발자에게 문의 ㄱㄱ");
    }
    getAllTeamList();
    setPopupShow(true);
  };

  return (
    <>
      <TeamInfoInputBox
        title={"팀 등록"}
        handleTeamMultiPart={handleTeamMultiPart}
        ref={initStateRef}
      />
      <TeamList
        teams={teams}
        title={"< 현재 등록된 팀 >"}
        isRadioButtonVisible={false}
      />
      {isLoading ? <WaitingBackground /> : null}
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
