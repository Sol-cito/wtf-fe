import { WTF_ABOUT_UNIFORM_PATH } from "../CommonConstant/ImgConstant";
import { useEffect, useState } from "react";
import BoardMemberBox from "../Components/BoardMemberBox";
import PageContainer from "../Components/PageContainer";
import { BoardMemberModel } from "../Models/BoardMemberModel";
import { TeamHistoryModel } from "../Models/TeamModel";
import "./AboutPage.scss";
import { getAllBoardMemberAPI } from "../Service/BoardMemberService";
import { getAllTeamHistoryAPI } from "../Service/TeamService";
import CustomizedSpinner from "../Components/CustomizedSpinner";
import { SALLWOW_BLACK } from "../CommonConstant/StringColorConstant";
import CustomizedImage from "../Components/CustomizedImage";
import TeamHistoryBox from "../Components/TeamHistoryBox";

const AboutPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [boardMemberList, setBoardMemberList] = useState<BoardMemberModel[]>(
    []
  );
  const [teamHistoryList, setTeamHistoryList] = useState<TeamHistoryModel[]>(
    []
  );

  const getInitData = async () => {
    setIsLoading(true);
    const boardMemberRes: BoardMemberModel[] = await getAllBoardMemberAPI();
    setBoardMemberList(boardMemberRes);
    const res: TeamHistoryModel[] = await getAllTeamHistoryAPI();
    setTeamHistoryList(res);
    setIsLoading(false);
  };

  useEffect(() => {
    getInitData();
  }, []);

  return (
    <div className="about_page_container">
      <PageContainer
        title="Who are we ?"
        includedComponent={
          <CustomizedImage
            id="about_uniform_img"
            src={WTF_ABOUT_UNIFORM_PATH}
          />
        }
      />
      {isLoading ? (
        <CustomizedSpinner color="yellow" />
      ) : (
        <>
          <PageContainer
            title="Board Member"
            boxColor={SALLWOW_BLACK}
            includedComponent={
              <BoardMemberBox boardMemberList={boardMemberList} />
            }
          />
          <PageContainer
            title="Team History"
            includedComponent={
              <TeamHistoryBox teamHistoryList={teamHistoryList} />
            }
          />
        </>
      )}
    </div>
  );
};
export default AboutPage;
