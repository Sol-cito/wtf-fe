import { isMobile } from "react-device-detect";
import { TEAM_MARK_NO_LOGO_IMG_PATH } from "../CommonConstant/ImgConstant";
import { PlayerMatchStatModel } from "../Models/PlayerModel";
import "./StatResultBox.scss";

export interface StatResultBoxProps {
  title: string;
  statResult: PlayerMatchStatModel[];
  statName?: string;
}

const StatResultBox = (props: StatResultBoxProps) => {
  return (
    <>
      <span className="stat_title">{props.title}</span>
      <div className="stat_container">
        {props.statResult.map((ele, key) => {
          return (
            <div key={key} className="stat_detail">
              {isMobile ? (
                <div className="date_and_type">
                  <div>{ele.matchDate}</div>
                  <div>{ele.matchTypeName}</div>
                </div>
              ) : (
                <>
                  <span>{ele.matchDate}</span>
                  <span>{ele.matchTypeName}</span>
                </>
              )}
              <div className="opposing_team_detail">
                <span>VS</span>
                <div className="opposing_team_img">
                  <img src={TEAM_MARK_NO_LOGO_IMG_PATH} />
                  <div>{ele.opposingTeamName}</div>
                </div>
              </div>
              <span className="stat_number">
                {ele.stat} {props.statName}
                {ele.stat > 1 && "s"}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default StatResultBox;
