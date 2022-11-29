import { Button } from "@material-ui/core";
import moment from "moment";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { DATE_REGAX, NUMBER_REGAX } from "../CommonConstant/CommonConstant";
import { WinOrLoseOrDraw, YesOrNo } from "../Models/Enum/CommonEnum";
import {
  MatchResultRequestModel,
  MatchResultModel,
} from "../Models/MatchResultModel";
import { MatchTypeModel } from "../Models/MatchTypeModel";
import { TeamModel } from "../Models/TeamModel";
import { getAllMatchTypeAPI } from "../Service/MatchService";
import { getAllTeamsAPI } from "../Service/TeamService";
import CustomizedConfirm from "./CustomizedConfirm";
import CustomizedInput from "./CustomizedInput";
import CustomizedPopup from "./CustomizedPopup";
import CustomizedSelectBox, { CustomizedOptions } from "./CustomizedSelectBox";
import "./PlayerInfoInputBox.scss";
import WaitingBackground from "./WaitingBackground";

export interface MatchResultInputBoxpProps {
  title: string;
  handleMatchResultRegistration: Function;
  matchResult?: MatchResultModel;
}

const MatchResultInputBox = forwardRef(
  (props: MatchResultInputBoxpProps, ref) => {
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [confirmContents, setConfirmContents] = useState<string>("");

    const [matchId, setMatchId] = useState<number>(-1);

    const [opposingTeamName, setOpposingTeamName] = useState<string>("");
    const [opposingTeamId, setOpposingTeamId] = useState<number>(-1);

    const [matchTypeName, setMatchTypeName] = useState<string>("");
    const [matchTypeId, setMatchTypeId] = useState<number>(-1);

    const [matchLocation, setMatchLocation] = useState<string>("");
    const [goalScored, setGoalScored] = useState<number>(0);
    const [goalLost, setGoalLost] = useState<number>(0);
    const [matchResultWL, setMatchResultWL] = useState<WinOrLoseOrDraw>(
      WinOrLoseOrDraw.WIN
    );
    const [shootoutYn, setShootoutYn] = useState<YesOrNo>(YesOrNo.NO);

    const [matchDate, setMatchDate] = useState<string>(
      String(moment(new Date()).format("YYYY-MM-DD"))
    );

    const [matchRegistrationRequest, setMatchRegistrationRequest] =
      useState<MatchResultRequestModel>();

    const [popupTitle, setPopupTitle] = useState<string>("");
    const [popupContents, setPopupContents] = useState<string>("");
    const [popupShow, setPopupShow] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [opposingTeamOptions, setOpposingTeamOptions] = useState<
      CustomizedOptions[]
    >([]);
    const [matchTypeOptions, setMatchTypeOptions] = useState<
      CustomizedOptions[]
    >([]);

    const shootoutOptions: CustomizedOptions[] = [
      { value: "Y" },
      { value: "N" },
    ];

    const matchResultWLOptions: CustomizedOptions[] = [
      { value: "WIN" },
      { value: "LOSE" },
      { value: "DRAW" },
    ];

    const getAllTeamListAndMatchTypes = async () => {
      setIsLoading(true);
      const res: TeamModel[] = await getAllTeamsAPI();
      if (res) {
        let teamNameOptions: CustomizedOptions[] = res
          .map((ele) => {
            return {
              id: ele.id,
              value: ele.name,
            };
          })
          .filter((ele) => {
            return ele.value !== "WTF";
          });
        setOpposingTeamOptions(teamNameOptions);
        setOpposingTeamId(teamNameOptions[0].id || -1);
        setOpposingTeamName(teamNameOptions[0].value);
      }

      const matchTypes: MatchTypeModel[] = await getAllMatchTypeAPI();
      if (matchTypes) {
        let matchTypeOptions: CustomizedOptions[] = matchTypes.map((ele) => {
          return {
            id: ele.id,
            value: ele.matchTypeName,
          };
        });
        setMatchTypeOptions(matchTypeOptions);
        setMatchTypeId(matchTypeOptions[0].id || -1);
        setMatchTypeName(matchTypeOptions[0].value);
      }
      setIsLoading(false);
    };

    useEffect(() => {
      getAllTeamListAndMatchTypes();
    }, []);

    useEffect(() => {
      if (!props.matchResult) return;
      setMatchId(props.matchResult.id);
      setOpposingTeamId(props.matchResult.opposingTeam.id);
      setOpposingTeamName(props.matchResult.opposingTeam.name);
      setMatchTypeId(props.matchResult.matchType.id);
      setMatchTypeName(props.matchResult.matchType.matchTypeName);
      setMatchLocation(props.matchResult.matchLocation);
      setGoalScored(props.matchResult.goalsScored);
      setGoalLost(props.matchResult.goalsLost);
      setMatchResultWL(props.matchResult.matchResult);
      setShootoutYn(props.matchResult.shootOutYn);
      setMatchDate(props.matchResult.matchDate);
    }, [props.matchResult]);

    const initState = () => {
      setMatchId(-1);
      setOpposingTeamName("");
      setOpposingTeamId(-1);
      setMatchTypeName("");
      setMatchTypeId(-1);
      setMatchLocation("");
      setGoalScored(0);
      setGoalLost(0);
      setMatchResultWL(WinOrLoseOrDraw.WIN);
      setShootoutYn(YesOrNo.NO);
      setMatchDate(String(moment(new Date()).format("YYYY-MM-DD")));
    };

    useImperativeHandle(ref, () => ({
      initState,
    }));

    const handleGoalScoredChange = (input: string) => {
      if (NUMBER_REGAX.test(input)) {
        setGoalScored(Number(input));
      }
    };

    const handleGoalLostChange = (input: string) => {
      if (NUMBER_REGAX.test(input)) {
        setGoalLost(Number(input));
      }
    };

    const testMatchDateRegax = (input: Date) => {
      if (input && !DATE_REGAX.test(String(input))) {
        setPopupTitle("[Error] 시합날짜 입력값 확인");
        setPopupContents("시합날짜가 0000-00-00 형식에 맞지 않음");
        setMatchDate("");
        setPopupShow(true);
        return;
      }
    };

    const validateInputData = (request: MatchResultRequestModel) => {
      for (let res of Object.entries(request)) {
        let key: string = res[0];
        let value: string = res[1];

        if (value === undefined || value === null || value.length === 0) {
          setPopupTitle("[Error] 필수값 미입력");
          setPopupContents(key + " 입력되지 않음");
          setPopupShow(true);
          return false;
        }
      }
      return true;
    };

    const handleBtnOnClick = () => {
      const matchRegistrationRequest: MatchResultRequestModel = {
        id: matchId,
        opposingTeamId: opposingTeamId,
        matchTypeId: matchTypeId,
        matchLocation: matchLocation,
        goalsScored: goalScored,
        goalsLost: goalLost,
        matchResult: matchResultWL,
        shootOutYn: shootoutYn,
        matchDate: matchDate,
      };
      if (!validateInputData(matchRegistrationRequest)) return;

      setMatchRegistrationRequest(matchRegistrationRequest);

      setConfirmContents(
        "- 상대팀 : " +
          opposingTeamName +
          "\n- 매치종류 : " +
          matchTypeName +
          "\n- 경기장소 : " +
          matchRegistrationRequest.matchLocation +
          "\n- 득점 : " +
          matchRegistrationRequest.goalsScored +
          "\n- 실점 : " +
          matchRegistrationRequest.goalsLost +
          "\n- 승부차기 여부 : " +
          matchRegistrationRequest.shootOutYn +
          "\n- 경기결과 : " +
          matchRegistrationRequest.matchResult +
          "\n- 시합날짜 : " +
          matchRegistrationRequest.matchDate
      );
      setShowConfirm(true);
    };

    const handleOnConfirm = async () => {
      setShowConfirm(false);
      setIsLoading(true);
      await props.handleMatchResultRegistration(matchRegistrationRequest);
      setIsLoading(false);
    };

    return (
      <>
        <div className="register_info_area">
          <p className="register_title">{props.title}</p>
          <CustomizedSelectBox
            title={"상대팀 :"}
            defaultValue={opposingTeamName}
            options={opposingTeamOptions}
            useStateFuncForValue={setOpposingTeamName}
            useStateFuncForId={setOpposingTeamId}
          />
          <CustomizedSelectBox
            title={"매치 종류 :"}
            defaultValue={matchTypeName}
            options={matchTypeOptions}
            useStateFuncForValue={setMatchTypeName}
            useStateFuncForId={setMatchTypeId}
          />
          <CustomizedInput
            title={"경기 장소 : "}
            value={matchLocation}
            onChange={setMatchLocation}
            maxLength={15}
            placeHolder={"최대길이 15자"}
          />
          <CustomizedInput
            title={"득점(숫자만) : "}
            value={String(goalScored)}
            className={"number"}
            onChange={handleGoalScoredChange}
            maxLength={2}
          />
          <CustomizedInput
            title={"실점(숫자만) : "}
            value={String(goalLost)}
            className={"number"}
            onChange={handleGoalLostChange}
            maxLength={2}
          />
          <CustomizedSelectBox
            title={"승부차기 여부 : "}
            defaultValue={shootoutYn}
            options={shootoutOptions}
            useStateFuncForValue={setShootoutYn}
          />
          <CustomizedSelectBox
            title={"경기 결과 : "}
            defaultValue={matchResultWL}
            options={matchResultWLOptions}
            useStateFuncForValue={setMatchResultWL}
          />
          <CustomizedInput
            title={"시합 날짜 : "}
            value={matchDate}
            className={"number"}
            onChange={setMatchDate}
            onBlur={testMatchDateRegax}
            placeHolder={"0000-00-00"}
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
