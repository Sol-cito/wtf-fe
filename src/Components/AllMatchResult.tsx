import { useEffect, useState } from "react";
import MatchResult from "../Components/MatchResult";
import { QueryOrder } from "../Models/Enum/CommonEnum";
import { MatchResultModel } from "../Models/MatchResultModel";
import { getMatchResultAPI, MatchResultProps } from "../Service/MatchService";
import "./AllMatchResult.scss";
import CustomizedSpinner from "./CustomizedSpinner";

const AllMatchResult = () => {
  const [matchResult, setMatchResult] = useState<MatchResultModel[]>([]);
  const [isLoading, setIsLoding] = useState<boolean>(true);

  const getMatchResult = async () => {
    setIsLoding(true);
    const res = await getMatchResultAPI();
    setMatchResult(res);
    setIsLoding(false);
  };

  useEffect(() => {
    getMatchResult();
  }, []);

  return (
    <>
      {isLoading ? (
        <CustomizedSpinner />
      ) : (
        matchResult.map((ele, idx) => {
          return <MatchResult matchResult={ele} key={idx} />;
        })
      )}
    </>
  );
};
export default AllMatchResult;
