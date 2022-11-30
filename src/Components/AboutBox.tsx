import { useEffect, useState } from "react";
import { WTF_ABOUT_UNIFORM_PATH } from "../CommonConstant/ImgConstant";
import { TeamHistoryModel } from "../Models/TeamModel";
import { getAllTeamHistoryAPI } from "../Service/TeamService";
import "./AboutBox.scss";

const AboutBox = () => {
  const [teamHistoryList, setTeamHistoryList] = useState<TeamHistoryModel[]>(
    []
  );

  let curYear: String = "";

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
          ? teamHistoryList.map((ele, idx) => {
              let isNewYear: boolean = curYear !== ele.year;
              curYear = ele.year;
              return (
                <div className="history" key={idx}>
                  <div className="year">
                    {isNewYear ? <span>{ele.year} </span> : <span></span>}
                  </div>
                  <div className="summary">
                    <span>{ele.history}</span>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};
export default AboutBox;
