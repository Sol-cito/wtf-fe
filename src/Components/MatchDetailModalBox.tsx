import { useEffect, useState } from "react";
import {
  TEAM_MARK_NO_LOGO_IMG_PATH,
  WTF_LOGO_IMG_PATH,
} from "../CommonConstant/ImgConstant";
import { MatchResultModel } from "../Models/MatchResultModel";
import { getMatchResultByIdAPI } from "../Service/MatchService";
import CustomizedImage from "./CustomizedImage";
import "./MatchDetailModalBox.scss";
import WaitingBackground from "./WaitingBackground";

export interface MatchDetailModalBoxProps {
  matchId: number;
}

const MatchDetailModalBox = (props: MatchDetailModalBoxProps) => {
  const [matchResult, setMatchResult] = useState<MatchResultModel>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getMatchDetail = async () => {
    setIsLoading(true);
    const matchResult = await getMatchResultByIdAPI(props.matchId);
    setMatchResult(matchResult);
    setIsLoading(false);
  };

  useEffect(() => {
    getMatchDetail();
  }, []);

  return (
    <>
      {isLoading && <WaitingBackground />}
      {matchResult && (
        <div className="result_container">
          <div className="team_area">
            <div id="wtf">W T F</div>
            <CustomizedImage
              id="wtf_logo"
              src={WTF_LOGO_IMG_PATH}
              onErrorImgSrc={TEAM_MARK_NO_LOGO_IMG_PATH}
            />
            <div className="score_and_type">
              <div className="score_area">
                <div>{matchResult.goalsScored}</div>
                <span>:</span>
                <div>{matchResult.goalsLost}</div>
              </div>
              <div className="match_type">
                {matchResult.matchType.matchTypeName}
              </div>
            </div>
            <CustomizedImage
              id="opposing_team_logo"
              src={
                matchResult.opposingTeam.teamLogoSrc
                  ? process.env.REACT_APP_IMAGE_SRC_PREFIX +
                    matchResult.opposingTeam.teamLogoSrc
                  : TEAM_MARK_NO_LOGO_IMG_PATH
              }
              onErrorImgSrc={TEAM_MARK_NO_LOGO_IMG_PATH}
            />
            <div id="opposing_team">{matchResult.opposingTeam.name}</div>
          </div>
          {matchResult?.scorersAndAssisters.map((ele, key) => {
            return (
              <div key={key} className="score_and_assist">
                <a className="score">
                  <span className="score_prefix">Goal </span>{" "}
                  {ele.scorer?.name || <span className="unknown">?</span>}
                </a>
                <span className="slash"> / </span>
                <a className="assist">
                  <span className="assist_prefix">Assist</span>{" "}
                  {ele.assister?.name || <span className="unknown">?</span>}
                </a>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
export default MatchDetailModalBox;
