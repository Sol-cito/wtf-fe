import { useEffect, useState } from "react";
import { WTF_ABOUT_UNIFORM_PATH } from "../CommonConstant/ImgConstant";
import { TeamHistoryModel } from "../Models/TeamModel";
import { getAllTeamHistoryAPI } from "../Service/TeamService";
import "./AboutBox.scss";

const AboutBox = () => {
  const [teamHistoryList, setTeamHistoryList] = useState<TeamHistoryModel[]>(
    []
  );

  const getAllTeamHistory = async () => {
    const res: TeamHistoryModel[] = await getAllTeamHistoryAPI();
    setTeamHistoryList(res);
  };

  useEffect(() => {
    getAllTeamHistory();
  }, []);

  return (
    <div className="about_container">
      <img src={WTF_ABOUT_UNIFORM_PATH} />
      <div className="history_contaier">
        {teamHistoryList.length > 0
          ? teamHistoryList.map((ele) => {
              return (
                <p>
                  <span id="year">{ele.year}</span>
                  <span id="history">{ele.history}</span>
                </p>
              );
            })
          : null}
      </div>
    </div>
  );
};
export default AboutBox;
