import { QueryOrder } from "../Models/Enum/CommonEnum";
import { MatchResultModel } from "../Models/MatchResultModel";
import { getApiCall, GetParameter } from "./ApiCall";

export interface MatchResultProps {
  startIdx: number;
  limit?: number;
  order?: QueryOrder;
}

export async function getMatchResultAPI(
  props: MatchResultProps
): Promise<MatchResultModel[]> {
  const getParameter: GetParameter = {
    url: "match",
    params: {
      startIdx: props.startIdx,
      limit: props.limit,
      order: props.order,
    },
  };
  const result: MatchResultModel[] = await getApiCall(getParameter);
  return result;
}
