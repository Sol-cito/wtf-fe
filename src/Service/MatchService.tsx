import { MatchResultModel } from "../Models/MatchResultModel";
import { getApiCall, GetParameter } from "./ApiCall";

export async function getRecentMatchAPI(): Promise<MatchResultModel[]> {
  const getParameter: GetParameter = {
    url: "match/latest",
  };
  const result: MatchResultModel[] = await getApiCall(getParameter);
  return result;
}
