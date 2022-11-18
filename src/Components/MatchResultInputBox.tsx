import { Button } from "@material-ui/core";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { WinOrLoseOrDraw, YesOrNo } from "../Models/Enum/CommonEnum";
import { MatchResultModel } from "../Models/MatchResultModel";
import { MatchTypeModel } from "../Models/MatchTypeModel";
import { TeamModel, TeamMultipartModel } from "../Models/TeamModel";
import { getImageFileNameWithExtension } from "../Service/UtilityService";
import CustomizedConfirm from "./CustomizedConfirm";
import CustomizedInput from "./CustomizedInput";
import CustomizedPopup from "./CustomizedPopup";
import ImageUploader from "./ImageUploader";
import "./PlayerInfoInputBox.scss";
import WaitingBackground from "./WaitingBackground";

export interface MatchResultInputBoxpProps {
  title: string;
  matchResult?: MatchResultModel;
  handleMatchResultRegistration: Function;
}

const MatchResultInputBox = forwardRef(
  (props: MatchResultInputBoxpProps, ref) => {
    const deleteImageRef: React.Ref<any> = useRef({});

    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [confirmContents, setConfirmContents] = useState<string>("");

    const [matchId, setMatchId] = useState<number>(-1);
    const [opposingTeam, setOpposingTeam] = useState<string>("");
    const [matchTypeName, setMatchTypeName] = useState<string>("");
    const [matchLocation, setMatchLocation] = useState<string>("");
    const [goalScored, setGoalScored] = useState<number>(-1);
    const [goalLost, setGoalLost] = useState<number>(-1);
    const [matchResultWL, setMatchResultWL] = useState<WinOrLoseOrDraw>(
      WinOrLoseOrDraw.WIN
    );
    const [shootoutYn, setShootoutYn] = useState<YesOrNo>(YesOrNo.YES);
    const [matchDate, setMatchDate] = useState<Date>();

    const [matchResult, setMatchResult] = useState<MatchResultModel>();

    const [popupTitle, setPopupTitle] = useState<string>("");
    const [popupContents, setPopupContents] = useState<string>("");
    const [popupShow, setPopupShow] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
      if (!props.matchResult) return;
      setMatchId(props.matchResult.id);
      setOpposingTeam(props.matchResult.opposingTeamName);
      setMatchTypeName(props.matchResult.matchTypeName);
      setMatchLocation(props.matchResult.matchLocation);
      setGoalScored(props.matchResult.goalsScored);
      setGoalLost(props.matchResult.goalsLost);
      setMatchResultWL(props.matchResult.matchResult);
      setShootoutYn(props.matchResult.shootOutYn);
      setMatchDate(props.matchResult.matchDate);
    }, [props.matchResult]);

    const initState = () => {
      setMatchId(-1);
      setOpposingTeam("");
      setMatchTypeName("");
      setMatchLocation("");
      setGoalScored(-1);
      setGoalLost(-1);
      setMatchResultWL(WinOrLoseOrDraw.WIN);
      setShootoutYn(YesOrNo.YES);
      setMatchDate(undefined);
    };

    useImperativeHandle(ref, () => ({
      initState,
    }));

    const validateTeamInputData = (matchResult: MatchResultModel) => {
      for (let res of Object.entries(matchResult)) {
        let key: string = res[0];
        let value: string = res[1];

        if (!value || value.length == 0) {
          setPopupTitle("[Error] 필수값 미입력");
          setPopupContents(key + " 입력되지 않음");
          setPopupShow(true);
          return false;
        }
      }
      return true;
    };

    const handleBtnOnClick = () => {
      const matchResult: MatchResultModel = {
        id: matchId,
        opposingTeamName: opposingTeam || "",
        matchTypeName: matchTypeName || "",
        matchLocation: matchLocation || "",
        goalsScored: goalScored,
        goalsLost: goalLost,
        matchResult: matchResultWL,
        shootOutYn: shootoutYn,
        matchDate: matchDate || new Date(),
      };
      if (!validateTeamInputData(matchResult)) return;

      setMatchResult(matchResult);

      setConfirmContents(
        "- 팀명 : " +
          matchResult.opposingTeamName +
          "\n- 연고지 : " +
          matchResult.matchTypeName
      );
      setShowConfirm(true);
    };

    const handleOnConfirm = async () => {
      setShowConfirm(false);
      setIsLoading(true);
      await props.handleMatchResultRegistration(matchResult);
      setIsLoading(false);
    };

    return (
      <>
        <div className="register_info_area">
          <p className="register_title">{props.title}</p>
          <CustomizedInput
            title={"경기 장소 : "}
            value={matchLocation}
            className={"name"}
            onChange={setMatchLocation}
            maxLength={15}
            placeHolder={"최대길이 15자"}
          />
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleBtnOnClick}
            className="register_btn"
          >
            {props.title}
          </Button>
          <CustomizedConfirm
            show={showConfirm}
            confirmQuestion={"입력한 매치 정보를 한번 더 확인해주세용."}
            contents={confirmContents}
            onClickConfirm={handleOnConfirm}
            onClickCancel={() => {
              setShowConfirm(false);
            }}
          />
          <CustomizedPopup
            title={popupTitle}
            show={popupShow}
            contents={popupContents}
            onClickOk={() => {
              setPopupShow(false);
            }}
          />
        </div>
        {isLoading ? <WaitingBackground /> : null}
      </>
    );
  }
);
export default MatchResultInputBox;
