import { OrderSortKeyword } from "../Models/Enum/CommonEnum";
import {
  MatchResultRequestModel,
  MatchResultModel,
} from "../Models/MatchResultModel";
import { MatchTypeModel } from "../Models/MatchTypeModel";
import {
  deleteApiCall,
  DeleteParameter,
  getApiCall,
  GetParameter,
  postApiCall,
  PostParameter,
  putApiCall,
  PutParameter,
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

export async function getAllMatchTypeAPI(): Promise<MatchTypeModel[]> {
  const getParameter: GetParameter = {
    url: "match-types",
  };
  const result: MatchTypeModel[] = await getApiCall(getParameter);
  return result;
}

export async function registerNewMatchResultAPI(
  request: MatchResultRequestModel
): Promise<MatchResultModel> {
  const postParameter: PostParameter = {
    url: "match",
    data: request,
  };
  const result: MatchResultModel = await postApiCall(postParameter);
  return result;
}

export async function modifyMatchResultAPI(
  request: MatchResultRequestModel
): Promise<MatchResultModel> {
  const putParameter: PutParameter = {
    url: "match",
    data: request,
  };
  const result: MatchResultModel = await putApiCall(putParameter);
  return result;
}

export async function deleteMatchResultAPI(
  matchResultId: number
): Promise<MatchResultModel> {
  const deleteParameter: DeleteParameter = {
    url: "match",
    params: {
      matchResultId: matchResultId,
    },
  };
  const result: MatchResultModel = await deleteApiCall(deleteParameter);
  return result;
}
