import { useEffect, useState } from "react";
import { MatchResultModel } from "../Models/MatchResultModel";
import { getMatchResultByIdAPI } from "../Service/MatchService";
import { useAppSelector } from "../Store/config";
import WaitingBackground from "./WaitingBackground";
import "./MatchDetailModalBox.scss";

export interface MatchDetailModalBoxProps {
  matchId: number;
}

const MatchDetailModalBox = (props: MatchDetailModalBoxProps) => {
  const { modalShow } = useAppSelector((state) => state.modal);

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
      {isLoading ? (
        <WaitingBackground />
      ) : (
        <div className="result_container">
          <div>{matchResult?.opposingTeam.name}</div>
          {matchResult?.scorersAndAssisters.map((ele, key) => {
            return (
              <div key={key}>
                <a> 득점자 : {ele.scorer?.name || "모름"}</a>
                <a> 어시스트 : {ele.assister?.name || "모름"}</a>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
export default MatchDetailModalBox;
