import { MatchResultModel } from "../Models/MatchResultModel";
import { useState, useEffect } from "react";
import "./MatchResultBox.scss";
import MatchResult from "./MatchResult";
import { getRecentMatchAPI } from "../Service/MatchService";

const MatchResultBox = () => {
  const [recentResult, setRecentResult] = useState<MatchResultModel[]>();

  const getRecentResult = async () => {
    const res = await getRecentMatchAPI();
    setRecentResult(res);
  };

  useEffect(() => {
    getRecentResult();
  }, []);

  return (
    <div>
      <div className="match_box_title_area">
        <span className="match_box_title"> Recent Match Results </span>
      </div>
      {recentResult
        ? recentResult.map((matchResult, idx) => {
            return <MatchResult key={idx} matchResult={matchResult} />;
          })
        : null}
    </div>
  );
};
export default MatchResultBox;
