import { QueryOrder } from "../Models/Enum/CommonEnum";
import { MatchResultModel } from "../Models/MatchResultModel";
import { getApiCall, GetParameter } from "./ApiCall";

export interface QueryProps {
  entityFieldName: string;
  order: QueryOrder;
}

export interface MatchResultProps {
  startIdx?: number;
  limit?: number;
  queryProps?: QueryProps;
}

export async function getMatchResultAPI(
  props?: MatchResultProps
): Promise<MatchResultModel[]> {
  const getParameter: GetParameter = {
    url: "match",
    params: {
      startIdx: props?.startIdx,
      limit: props?.limit,
      order: props?.queryProps,
    },
  };
  const result: MatchResultModel[] = await getApiCall(getParameter);
  return result;
}
