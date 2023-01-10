import { TeamHistoryModel } from "../Models/TeamModel";
import "./TeamHistoryBox.scss";

export interface TeamHistoryBoxProps {
  teamHistoryList: TeamHistoryModel[];
}

const TeamHistoryBox = (props: TeamHistoryBoxProps) => {
  let curYear: String = "";

  return (
    <div className="history_container">
      {props.teamHistoryList.length > 0
        ? props.teamHistoryList.map((ele, idx) => {
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
  );
};
export default TeamHistoryBox;
