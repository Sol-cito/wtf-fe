import { useEffect, useState } from "react";
import CustomizedSelectBox, { CustomizedOptions } from "./CustomizedSelectBox";
import { PlayerModel } from "../Models/PlayerModel";
import "./GoalAndAssistInput.scss";
import { ScorerAndAssisterModel } from "../Models/MatchResultModel";

export interface GoalAndAssistInputProps {
  index: number;
  players: PlayerModel[];
  handleGoalAndAssistPlayer: Function;
}

const GoalAndAssistInput = (props: GoalAndAssistInputProps) => {
  const [playerOptions, setPlayerOptions] = useState<CustomizedOptions[]>([
    { id: -1, value: "모름" },
  ]);
  const [goalPlayerValue, setGoalPlayerValue] = useState<string>("");
  const [assistPlayerValue, setAssistPlayerValue] = useState<string>("");
  const [goalPlayerId, setGoalPlayerId] = useState<number>(-1);
  const [assistPlayerId, setAssistPlayerId] = useState<number>(-1);

  useEffect(() => {
    const options: CustomizedOptions[] = [{ id: -1, value: "모름" }];
    props.players.forEach((ele) => {
      options.push({ id: ele.id, value: ele.name });
    });
    setPlayerOptions(options);
  }, [props.players]);

  const handleGoalPlayerOnChange = () => {
    const model: ScorerAndAssisterModel = {
      scorerId: goalPlayerId,
      assisterId: assistPlayerId,
    };
    props.handleGoalAndAssistPlayer(model);
  };

  useEffect(() => {
    handleGoalPlayerOnChange();
  }, [goalPlayerId, assistPlayerId]);

  return (
    <div className="goal_and_assist_container">
      <CustomizedSelectBox
        title={"골"}
        defaultValue={goalPlayerValue || playerOptions[0].value}
        useStateFuncForValue={setGoalPlayerValue}
        useStateFuncForId={setGoalPlayerId}
        options={playerOptions}
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
