import { useEffect, useState } from "react";
import CustomizedSelectBox, { CustomizedOptions } from "./CustomizedSelectBox";
import { PlayerModel } from "../Models/PlayerModel";
import "./GoalAndAssistInput.scss";
import { ScorerAndAssisterModel } from "../Models/MatchResultModel";
import { GoalType } from "../Models/Enum/CommonEnum";

export interface GoalAndAssistInputProps {
  index: number;
  players: PlayerModel[];
  handleScorersAndAssisters: Function;
  initValue?: ScorerAndAssisterModel;
}

const GoalAndAssistInput = (props: GoalAndAssistInputProps) => {
  const getInitIdValue = (targetId: number) => {
    let arr: Array<PlayerModel> = props.players.filter((ele) => {
      return ele.id === targetId;
    });
    if (!arr || arr.length === 0) return "";
    return arr[0].name;
  };

  const [playerOptions, setPlayerOptions] = useState<CustomizedOptions[]>([
    { id: -1, value: "모름" },
  ]);
  const [goalPlayerValue, setGoalPlayerValue] = useState<string>(
    props.initValue?.scorer ? getInitIdValue(props.initValue?.scorer.id) : ""
  );
  const [assistPlayerValue, setAssistPlayerValue] = useState<string>(
    props.initValue?.assister
      ? getInitIdValue(props.initValue?.assister.id)
      : ""
  );
  const [scorerPlayerId, setScorerPlayerId] = useState<number>(
    props.initValue?.scorer?.id || -1
  );
  const [assistPlayerId, setAssistPlayerId] = useState<number>(
    props.initValue?.assister?.id || -1
  );
  const [goalType, setGoalType] = useState<GoalType>(
    props.initValue?.goalType || GoalType.FIELD
  );

  const goalTypeOptions: CustomizedOptions[] = Object.values(GoalType).map(
    (ele) => {
      return { value: ele };
    }
  );

  useEffect(() => {
    const options: CustomizedOptions[] = [{ id: -1, value: "모름" }];
    props.players.forEach((ele) => {
      options.push({ id: ele.id, value: ele.name });
    });
    setPlayerOptions(options);
  }, [props.players]);

  const handleGoalPlayerOnChange = () => {
    const model: ScorerAndAssisterModel = {
      index: props.index,
      scorer: props.players.filter((ele) => {
        return ele.id === scorerPlayerId;
      })[0],
      goalType: goalType,
      assister: props.players.filter((ele) => {
        return ele.id === assistPlayerId;
      })[0],
    };
    props.handleScorersAndAssisters(model);
  };

  useEffect(() => {
    handleGoalPlayerOnChange();
  }, [scorerPlayerId, goalType, assistPlayerId]);

  return (
    <div className="goal_and_assist_container">
      <CustomizedSelectBox
        title={"골"}
        defaultValue={goalPlayerValue || playerOptions[0].value}
        useStateFuncForValue={setGoalPlayerValue}
        useStateFuncForId={setScorerPlayerId}
        options={playerOptions}
      />
      <CustomizedSelectBox
        title={"골 타입"}
        defaultValue={goalType}
        useStateFuncForValue={setGoalType}
        options={goalTypeOptions}
      />
      <CustomizedSelectBox
        title={"어시스트"}
        defaultValue={assistPlayerValue || playerOptions[0].value}
        useStateFuncForValue={setAssistPlayerValue}
        useStateFuncForId={setAssistPlayerId}
        options={playerOptions}
      />
    </div>
  );
};

export default GoalAndAssistInput;
