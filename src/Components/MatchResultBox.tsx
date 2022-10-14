import { MatchResultModel } from "../Models/MatchResultModel";
import { useState, useEffect } from "react";
import "./MatchResultBox.scss";
import MatchResult from "./MatchResult";
import { getRecentMatchAPI } from "../Service/MatchService";
import CustomizedSpinner from "./CustomizedSpinner";

const MatchResultBox = () => {
  const [recentResult, setRecentResult] = useState<MatchResultModel[]>();
  const [isLoading, setIsLoding] = useState<boolean>(true);

  const getRecentResult = async () => {
    const res = await getRecentMatchAPI();
    setRecentResult(res);
    if (res) setIsLoding(false);
  };

  useEffect(() => {
    getRecentResult();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <CustomizedSpinner />
        </>
      ) : (
        recentResult!.map((matchResult, idx) => {
          return <MatchResult key={idx} matchResult={matchResult} />;
        })
      )}
    </>
  );
};
export default MatchResultBox;
