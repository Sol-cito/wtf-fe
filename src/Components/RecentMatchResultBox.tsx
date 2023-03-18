import { useEffect, useState } from "react";
import { RECENT_MATCH_RESULT_LIMIT } from "../CommonConstant/CommonConstant";
import { OrderSortKeyword } from "../Models/Enum/CommonEnum";
import { MatchResultModel } from "../Models/MatchResultModel";
import { getMatchResultAPI, MatchResultProps } from "../Service/MatchService";
import CustomizedSpinner from "./CustomizedSpinner";
import MatchResult from "./MatchResult";
import "./RecentMatchResultBox.scss";

const RecentMatchResultBox = () => {
  const [recentResult, setRecentResult] = useState<MatchResultModel[]>();
  const [isLoading, setIsLoding] = useState<boolean>(true);

  const getRecentResult = async () => {
    const matchResultProps: MatchResultProps = {
      startIdx: 0,
      limit: RECENT_MATCH_RESULT_LIMIT,
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
