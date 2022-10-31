import moment from "moment";
import { useState } from "react";
import { TEAM_MARK_NO_LOGO_IMG_PATH, WTF_LOGO_IMG_PATH } from "../CommonConstant/ImgSrcConstant";
import { MatchResultModel } from "../Models/MatchResultModel";
import CustomizedImage from "./CustomizedImage";
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
        <CustomizedImage
          id="wtf_logo"
          src={WTF_LOGO_IMG_PATH}
          onErrorImgSrc={TEAM_MARK_NO_LOGO_IMG_PATH}
        />
        <div id="goals_scored">{props.matchResult.goalsScored}</div>
        <span> : </span>
        <div id="goals_scored">{props.matchResult.goalsLost}</div>
        <CustomizedImage
          id="opposing_team_logo"
          src={
            props.matchResult.opposingTeamLogoSrc || TEAM_MARK_NO_LOGO_IMG_PATH
          }
          onErrorImgSrc={TEAM_MARK_NO_LOGO_IMG_PATH}
        />
        <div id="opposing_team_area">{props.matchResult.opposingTeamName}</div>
      </div>
    </div>
  );
};
export default MatchResult;
