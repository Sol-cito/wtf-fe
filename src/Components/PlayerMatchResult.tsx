import { useEffect, useState } from "react";
import { PlayerMatchStatModel } from "../Models/PlayerModel";
import "./MatchResult.scss";
import StatResultBox from "./StatResultBox";

export interface PlayerMatchResultProps {}

const PlayerMatchResult = (props: PlayerMatchResultProps) => {
  const [scoreStat, setScoreStat] = useState<PlayerMatchStatModel[]>();
  const [assistStat, setAssistStat] = useState<PlayerMatchStatModel[]>();

  useEffect(() => {
    const tempScoreStat: PlayerMatchStatModel[] = [
      {
        matchDate: "2022-01-01",
        matchTypeName: "K7",
        opposingTeamName: "IEMU",
        stat: 3,
      },
      {
        matchDate: "2022-01-02",
        matchTypeName: "Friendly Match",
        opposingTeamName: "WTF YB",
        stat: 2,
      },
      {
        matchDate: "2022-01-02",
        matchTypeName: "Friendly Match",
        opposingTeamName: "WTF YB",
        stat: 5,
      },
    ];
    const tempAssistStat: PlayerMatchStatModel[] = [
      {
        matchDate: "2022-01-01",
        matchTypeName: "K7",
        opposingTeamName: "IEMU",
        stat: 1,
      },
      {
        matchDate: "2022-01-01",
        matchTypeName: "S리그",
        opposingTeamName: "YKFC",
        stat: 3,
      },
      {
        matchDate: "2022-01-01",
        matchTypeName: "K7",
        opposingTeamName: "TEST TEAM",
        stat: 2,
      },
    ];
    setScoreStat(tempScoreStat);
    setAssistStat(tempAssistStat);
  }, []);

  return (
    <>
      {scoreStat && (
        <StatResultBox
          title={"득점한 최근 3경기"}
          statResult={scoreStat}
          statName={"goal"}
        />
      )}
      {assistStat && (
        <StatResultBox
          title={"어시스트한 최근 3경기"}
          statResult={assistStat}
          statName={"assist"}
        />
      )}
    </>
  );
};
export default PlayerMatchResult;
