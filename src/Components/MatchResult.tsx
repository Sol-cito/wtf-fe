import moment from "moment";
import {
  MATCH_RESULT_BACKGROUND_STYLE_MOBILE,
  TEAM_MARK_NO_LOGO_IMG_PATH,
  WTF_LOGO_IMG_PATH,
} from "../CommonConstant/ImgConstant";
import { MatchResultModel } from "../Models/MatchResultModel";
import { useAppDispatch } from "../Store/config";
import { ModalState, setModalState } from "../Store/Slices/ModalSlice";
import CustomizedImage from "./CustomizedImage";
import MatchDetailModalBox from "./MatchDetailModalBox";
import "./MatchResult.scss";

export interface MatchResultProps {
  matchResult: MatchResultModel;
}

const MatchResult = (props: MatchResultProps) => {
  const dispatch = useAppDispatch();

  const handleOnClick = (matchResultModel: MatchResultModel) => {
    const modalState: ModalState = {
      modalShow: true,
      model: matchResultModel,
      includedComponent: <MatchDetailModalBox matchId={matchResultModel.id} />,
      backgroundStyle: MATCH_RESULT_BACKGROUND_STYLE_MOBILE,
    };
    document.body.style.overflow = "hidden";
    dispatch(setModalState(modalState));
  };

  return (
    <>
      <div
        className="match_container"
        onClick={() => handleOnClick(props.matchResult)}
      >
        <div id="match_type_name">
          {props.matchResult.matchType.matchTypeName}
        </div>
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
              props.matchResult.opposingTeam.teamLogoSrc
                ? process.env.REACT_APP_IMAGE_SRC_PREFIX +
                  props.matchResult.opposingTeam.teamLogoSrc
                : TEAM_MARK_NO_LOGO_IMG_PATH
            }
            onErrorImgSrc={TEAM_MARK_NO_LOGO_IMG_PATH}
          />
          <div id="opposing_team">{props.matchResult.opposingTeam.name}</div>
        </div>
      </div>
    </>
  );
};
export default MatchResult;
