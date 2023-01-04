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
}

const GoalAndAssistInput = (props: GoalAndAssistInputProps) => {
  const [playerOptions, setPlayerOptions] = useState<CustomizedOptions[]>([
    { id: -1, value: "모름" },
  ]);
  const [goalPlayerValue, setGoalPlayerValue] = useState<string>("");
  const [assistPlayerValue, setAssistPlayerValue] = useState<string>("");
  const [scorerPlayerId, setScorerPlayerId] = useState<number>(-1);
  const [assistPlayerId, setAssistPlayerId] = useState<number>(-1);
  const [goalType, setGoalType] = useState<GoalType>(GoalType.FIELD);

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
      scorerId: scorerPlayerId,
      goalType: goalType,
      assisterId: assistPlayerId,
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
