import { MatchResultModel } from "../Models/MatchResultModel";
import { useState, useEffect } from "react";
import "./RecentMatchResultBox.scss";
import MatchResult from "./MatchResult";
import CustomizedSpinner from "./CustomizedSpinner";
import { getMatchResultAPI, MatchResultProps } from "../Service/MatchService";
import { OrderSortKeyword } from "../Models/Enum/CommonEnum";

const RecentMatchResultBox = () => {
  const [recentResult, setRecentResult] = useState<MatchResultModel[]>();
  const [isLoading, setIsLoding] = useState<boolean>(true);

  const getRecentResult = async () => {
    const matchResultProps: MatchResultProps = {
      startIdx: 0,
      limit: 3,
      order: {
        entityFieldName: "matchDate",
        orderSortKeyword: OrderSortKeyword.DESC,
      },
    };
    const res = await getMatchResultAPI(matchResultProps);
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
export default RecentMatchResultBox;
