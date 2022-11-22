import { OrderSortKeyword } from "../Models/Enum/CommonEnum";
import { MatchResultModel } from "../Models/MatchResultModel";
import { MatchTypeModel } from "../Models/MatchTypeModel";
import {
  getApiCall,
  GetParameter,
  postApiCall,
  PostParameter,
} from "./ApiCall";

export interface OrderProps {
  entityFieldName: string;
  orderSortKeyword: OrderSortKeyword;
}

export interface MatchResultProps {
  startIdx?: number;
  limit?: number;
  order?: OrderProps;
}

export async function getMatchResultAPI(
  props?: MatchResultProps
): Promise<MatchResultModel[]> {
  const getParameter: GetParameter = {
    url: "match",
    params: {
      startIdx: props?.startIdx || 0,
      limit: props?.limit,
      order: props?.order,
    },
  };
  const result: MatchResultModel[] = await getApiCall(getParameter);
  return result;
}

export async function registerNewMatchResultAPI(
  matchResultModel: MatchResultModel
): Promise<MatchResultModel> {
  const postParameter: PostParameter = {
    url: "match",
    data: matchResultModel,
  };
  const result: MatchResultModel = await postApiCall(postParameter);
  return result;
}

export async function getAllMatchTypeAPI(
  props?: MatchResultProps
): Promise<MatchTypeModel[]> {
  const getParameter: GetParameter = {
    url: "match-types",
  };
  const result: MatchTypeModel[] = await getApiCall(getParameter);
  return result;
}
