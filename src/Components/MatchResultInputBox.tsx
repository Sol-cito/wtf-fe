import { Button } from "@material-ui/core";
import moment from "moment";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { DATE_REGAX, NUMBER_REGAX } from "../CommonConstant/CommonConstant";
import { WinOrLoseOrDraw, YesOrNo } from "../Models/Enum/CommonEnum";
import {
  MatchResultModel,
  MatchResultRequestModel,
  ScorerAndAssisterModel,
} from "../Models/MatchResultModel";
import { MatchTypeModel } from "../Models/MatchTypeModel";
import { TeamModel } from "../Models/TeamModel";
import { getAllMatchTypeAPI } from "../Service/MatchService";
import { getAllTeamsAPI } from "../Service/TeamService";
import "./CommonInfoInputBox.scss";
import CustomizedConfirm from "./CustomizedConfirm";
import CustomizedInput from "./CustomizedInput";
import CustomizedPopup from "./CustomizedPopup";
import CustomizedSelectBox, { CustomizedOptions } from "./CustomizedSelectBox";
import GoalAndAssistInput from "./GoalAndAssistInput";
import WaitingBackground from "./WaitingBackground";
import "./MatchResultInputBox.scss";
import { PlayerModel } from "../Models/PlayerModel";
import { getAllPlayersAPI } from "../Service/PlayerService";

export interface MatchResultInputBoxpProps {
  title: string;
  handleMatchResultRegistration: Function;
  handleMatchResultDeletion?: Function;
  matchResult?: MatchResultModel;
}

const MatchResultInputBox = forwardRef(
  (props: MatchResultInputBoxpProps, ref) => {
    const [showRegistrationConfirm, setShowRegistrationConfirm] =
      useState<boolean>(false);
    const [showDeletionConfirm, setShowDeletionConfirm] =
      useState<boolean>(false);
    const [registrationConfirmContents, setRegistrationConfirmContents] =
      useState<string>("");
    const [deletionConfirmContents, setDeletionConfirmContents] =
      useState<string>("");

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

    const [goalAndAssistComponent, setGoalAndAssistComponent] = useState<
      React.ReactElement[]
    >([]);

    const [scorersAndAssisters, setScorersAndAssisters] = useState<
      ScorerAndAssisterModel[]
    >([]);

    const [allPlayers, setAllPlayers] = useState<PlayerModel[]>([]);

    const [allPlayersMap, setAllPlayersMap] = useState<Map<number, string>>();

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
      getAllPlayerAndCreateScoreAndAssist();
    }, []);

    const getAllPlayerAndCreateScoreAndAssist = async () => {
      const allPlayers = await getAllPlayersAPI();
      setAllPlayers(allPlayers);
      const allPlayersTempMap = new Map<number, string>();
      allPlayers.map((ele) => {
        allPlayersTempMap.set(ele.id, ele.name);
      });
      setAllPlayersMap(allPlayersTempMap);
    };

    useEffect(() => {
      if (goalScored < scorersAndAssisters.length) {
        const slicedArray: ScorerAndAssisterModel[] = scorersAndAssisters.slice(
          0,
          goalScored
        );
        setScorersAndAssisters(slicedArray);
      }
    }, [goalScored, props.matchResult?.id]);

    useEffect(() => {
      const res: React.ReactElement[] = [];
      for (let i = 0; i < goalScored; i++) {
        res.push(
          <GoalAndAssistInput
            key={i}
            index={i}
            players={allPlayers}
            handleScorersAndAssisters={handleScorersAndAssisters}
            initValue={props.matchResult?.scorersAndAssisters[i]}
          />
        );
      }
      setGoalAndAssistComponent(res);
    }, [goalScored, scorersAndAssisters]);

    useEffect(() => {
      setGoalAndAssistComponent([]);

      if (!props.matchResult) return;
      setMatchId(props.matchResult.id);
      setOpposingTeamId(props.matchResult.opposingTeam.id);
      setOpposingTeamName(props.matchResult.opposingTeam.name);
      setMatchTypeId(props.matchResult.matchType.id);
      setMatchTypeName(props.matchResult.matchType.matchTypeName);
      setMatchLocation(props.matchResult.matchLocation);
      setGoalScored(props.matchResult.goalsScored);
      setScorersAndAssisters(props.matchResult.scorersAndAssisters);
      setGoalLost(props.matchResult.goalsLost);
      setMatchResultWL(props.matchResult.matchResult);
      setShootoutYn(props.matchResult.shootOutYn);
      setMatchDate(props.matchResult.matchDate);
    }, [props.matchResult]);

    const initState = async () => {
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
      await getAllTeamListAndMatchTypes();
    };

    useImperativeHandle(ref, () => ({
      initState,
    }));

    const handleGoalScoredChange = (input: string) => {
      if (isNaN(Number(input))) {
        return;
      }
      if (NUMBER_REGAX.test(input)) {
        setGoalScored(Number(input));
      }
    };

    const handleGoalLostChange = (input: string) => {
      if (isNaN(Number(input))) {
        return;
      }
      if (NUMBER_REGAX.test(input)) {
        setGoalLost(Number(input));
      }
    };

    const testMatchDateRegax = (input: Date) => {
      if (input && !DATE_REGAX.test(String(input))) {
        setPopupTitle("[Error] ???????????? ????????? ??????");
        setPopupContents("??????????????? 0000-00-00 ????????? ?????? ??????");
        setMatchDate("");
        setPopupShow(true);
        return;
      }
    };

    const validateInputData = (request: MatchResultRequestModel) => {
      for (let res of Object.entries(request)) {
        let key: string = res[0];
        let value: string = res[1];

        if (key === "scorersAndAssisters") continue;

        if (value === undefined || value === null || value.length === 0) {
          setPopupTitle("[Error] ????????? ?????????");
          setPopupContents(key + " ???????????? ??????");
          setPopupShow(true);
          return false;
        }
      }
      return true;
    };

    const handleModificationBtnOnClick = () => {
      const matchRegistrationRequest: MatchResultRequestModel = {
        id: matchId,
        opposingTeamId: opposingTeamId,
        matchTypeId: matchTypeId,
        matchLocation: matchLocation,
        goalsScored: goalScored,
        scorersAndAssisters: scorersAndAssisters,
        goalsLost: goalLost,
        matchResult: matchResultWL,
        shootOutYn: shootoutYn,
        matchDate: matchDate,
      };
      if (!validateInputData(matchRegistrationRequest)) return;

      setMatchRegistrationRequest(matchRegistrationRequest);

      const scorersAndAssistersContent: string = scorersAndAssisters
        .map((ele) => {
          return (
            "??? : " +
            (ele.scorerId === -1 ? "??????" : allPlayersMap?.get(ele.scorerId)) +
            " / ??? ?????? : " +
            ele.goalType +
            " / ???????????? : " +
            (ele.assisterId === -1
              ? "??????"
              : allPlayersMap?.get(ele.assisterId))
          );
        })
        .join("\n");

      setRegistrationConfirmContents(
        "- ????????? : " +
          opposingTeamName +
          "\n- ???????????? : " +
          matchTypeName +
          "\n- ???????????? : " +
          matchRegistrationRequest.matchLocation +
          "\n- ?????? : " +
          matchRegistrationRequest.goalsScored +
          (scorersAndAssistersContent && "\n" + scorersAndAssistersContent) +
          "\n- ?????? : " +
          matchRegistrationRequest.goalsLost +
          "\n- ???????????? ?????? : " +
          matchRegistrationRequest.shootOutYn +
          "\n- ???????????? : " +
          matchRegistrationRequest.matchResult +
          "\n- ???????????? : " +
          matchRegistrationRequest.matchDate
      );
      setShowRegistrationConfirm(true);
    };

    const handleOnConfirmForRegistration = async () => {
      setShowRegistrationConfirm(false);
      setIsLoading(true);
      await props.handleMatchResultRegistration(matchRegistrationRequest);
      setIsLoading(false);
    };

    const handleDeleteBtnOnClick = async () => {
      setDeletionConfirmContents(
        matchDate +
          " ??? ????????? " +
          opposingTeamName +
          "?????? ??????????????? ????????????????????????? \n (??????, ????????????????????? ?????? ???????????????)"
      );
      setShowDeletionConfirm(true);
    };

    const handleOnConfirmForDeletion = async () => {
      setShowDeletionConfirm(false);
      setIsLoading(true);
      await props.handleMatchResultDeletion!(matchId);
      setIsLoading(false);
    };

    const handleScorersAndAssisters = (value: ScorerAndAssisterModel) => {
      const copyArray = scorersAndAssisters;
      copyArray[value.index] = value;
      setScorersAndAssisters(copyArray);
    };

    return (
      <>
        <div className="info_area">
          <p className="title">{props.title}</p>
          <CustomizedSelectBox
            title={"????????? :"}
            defaultValue={opposingTeamName}
            options={opposingTeamOptions}
            useStateFuncForValue={setOpposingTeamName}
            useStateFuncForId={setOpposingTeamId}
          />
          <CustomizedSelectBox
            title={"?????? ?????? :"}
            defaultValue={matchTypeName}
            options={matchTypeOptions}
            useStateFuncForValue={setMatchTypeName}
            useStateFuncForId={setMatchTypeId}
          />
          <CustomizedInput
            title={"?????? ?????? : "}
            value={matchLocation}
            onChange={setMatchLocation}
            maxLength={15}
            placeHolder={"???????????? 15???"}
          />
          <CustomizedInput
            title={"??????(?????????) : "}
            value={String(goalScored)}
            className={"number"}
            onChange={handleGoalScoredChange}
            maxLength={2}
          />
          {goalAndAssistComponent &&
            goalAndAssistComponent.length > 0 &&
            goalAndAssistComponent.map((ele, idx) => {
              return ele;
            })}
          <CustomizedInput
            title={"??????(?????????) : "}
            value={String(goalLost)}
            className={"number"}
            onChange={handleGoalLostChange}
            maxLength={2}
          />
          <CustomizedSelectBox
            title={"???????????? ?????? : "}
            defaultValue={shootoutYn}
            options={shootoutOptions}
            useStateFuncForValue={setShootoutYn}
          />
          <CustomizedSelectBox
            title={"?????? ?????? : "}
            defaultValue={matchResultWL}
            options={matchResultWLOptions}
            useStateFuncForValue={setMatchResultWL}
          />
          <CustomizedInput
            title={"?????? ?????? : "}
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
            onClick={handleModificationBtnOnClick}
            className="btn"
          >
            {props.title}
          </Button>
          {props.handleMatchResultDeletion ? (
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={handleDeleteBtnOnClick}
              className="btn"
            >
              ??????????????????
            </Button>
          ) : null}
          <CustomizedConfirm
            show={showRegistrationConfirm}
            confirmQuestion={"????????? ?????? ????????? ?????? ??? ??????????????????."}
            contents={registrationConfirmContents}
            onClickConfirm={handleOnConfirmForRegistration}
            onClickCancel={() => {
              setShowRegistrationConfirm(false);
            }}
          />
          <CustomizedConfirm
            show={showDeletionConfirm}
            confirmQuestion={"?????? ?????? ??????"}
            contents={deletionConfirmContents}
            onClickConfirm={handleOnConfirmForDeletion}
            onClickCancel={() => {
              setShowDeletionConfirm(false);
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
