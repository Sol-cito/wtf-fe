import moment from "moment";
import { MatchResultModel } from "../Models/MatchResultModel";
import "./MatchResult.scss";

export interface MatchResultProps {
  matchResult: MatchResultModel;
}

const MatchResult = (props: MatchResultProps) => {
  return (
    <div className="match_container">
      <div id="match_type_name">{props.matchResult.matchTypeName}</div>
      <div className="date_and_location">
        <div id="match_date">
          {moment(props.matchResult.matchDate).format("YYYY-MM-DD")}
        </div>
        <div id="match_location">{props.matchResult.matchLocation}</div>
      </div>
      <div className="score_area">
        <div id="wtf_area">WTF</div>
        <img id="wtf_logo" src="/img/logo_yellow.jpg" />
        <div id="goals_scored">{props.matchResult.goalsScored}</div>
        <span> : </span>
        <div id="goals_scored">{props.matchResult.goalsLost}</div>
        <img
          id="opposing_team_logo"
          src={
            props.matchResult.opposingTeamLogoSrc ||
            "/img/otherteam/team_mark_no_logo.jpg"
          }
        />
        <div id="opposing_team_area">{props.matchResult.opposingTeamName}</div>
      </div>
    </div>
  );
};
export default MatchResult;
