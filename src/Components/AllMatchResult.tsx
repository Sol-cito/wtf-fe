import { useEffect, useState } from "react";
import MatchResult from "../Components/MatchResult";
import { OrderSortKeyword } from "../Models/Enum/CommonEnum";
import { MatchResultModel } from "../Models/MatchResultModel";
import { getMatchResultAPI, MatchResultProps } from "../Service/MatchService";
import "./AllMatchResult.scss";
import CustomizedSpinner from "./CustomizedSpinner";
import { useInView } from "react-intersection-observer";

const AllMatchResult = () => {
  const MATCH_RESULTLIMIT: number = 5;
  const ORDER_ENTITY_FIELD_NAME = "matchDate";

  const [inViewRef, inView] = useInView();

  const [matchResult, setMatchResult] = useState<MatchResultModel[]>([]);
  const [isLoading, setIsLoding] = useState<boolean>(true);

  const [numberOfLastResultData, setNumberOfLastResultData] =
    useState<number>();

  const [resultStartIdx, setResultStartIdx] = useState<number>(0);

  useEffect(() => {
    if (inView && !isLoading && numberOfLastResultData === MATCH_RESULTLIMIT) {
      setResultStartIdx(resultStartIdx + MATCH_RESULTLIMIT);
    }
  }, [inView]);

  useEffect(() => {
    getMatchResult();
  }, [resultStartIdx]);

  const getMatchResult = async () => {
    setIsLoding(true);
    const matchResultProps: MatchResultProps = {
      startIdx: resultStartIdx,
      limit: MATCH_RESULTLIMIT,
      order: {
        entityFieldName: ORDER_ENTITY_FIELD_NAME,
        orderSortKeyword: OrderSortKeyword.DESC,
      },
    };
    const res: MatchResultModel[] = await getMatchResultAPI(matchResultProps);
    if (res) {
      setMatchResult([...matchResult, ...res]);
      setNumberOfLastResultData(res.length);
      setIsLoding(false);
    }
  };

  return (
    <>
      {matchResult.map((ele, idx) => {
        return <MatchResult matchResult={ele} key={idx} />;
      })}
      {isLoading ? <CustomizedSpinner /> : null}
      <div className="show_more" ref={inViewRef} />
    </>
  );
};
export default AllMatchResult;
