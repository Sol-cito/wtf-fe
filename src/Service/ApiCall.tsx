import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { HttpMethod } from "../Models/Enum/CommonEnum";
import BaseApiCall, {
  AxiosResponseModel,
  BaseApiCallProps,
} from "./BaseApiCall";

export interface GetParameter {
  url: string;
  params?: any;
}

export interface PostParameter {
  url: string;
  data?: any;
  isMultipartData?: boolean;
}

export interface PutParameter {
  url: string;
  data?: any;
  isMultipartData?: boolean;
}

export interface DeleteParameter {
  url: string;
  params?: any;
}

export async function getApiCall(getParameter: GetParameter): Promise<any> {
  const baseApiCallProps: BaseApiCallProps = {
    url: getParameter.url,
    method: HttpMethod.GET,
    params: getParameter.params,
  };
  const result = await BaseApiCall(baseApiCallProps);
  return result.data;
}

export async function postApiCall(postParameter: PostParameter): Promise<any> {
  const baseApiCallProps: BaseApiCallProps = {
    url: postParameter.url,
    method: HttpMethod.POST,
    data: postParameter.data,
  };
  const result: AxiosResponseModel = await BaseApiCall(baseApiCallProps);
  return result.data;
}

export async function putApiCall(putParameter: PutParameter): Promise<any> {
  const baseApiCallProps: BaseApiCallProps = {
    url: putParameter.url,
    method: HttpMethod.PUT,
    data: putParameter.data,
  };
  const result = await BaseApiCall(baseApiCallProps);
  return result.data;
}

export async function deleteApiCall(
  deleteParameter: DeleteParameter
): Promise<any> {
  const baseApiCallProps: BaseApiCallProps = {
    url: deleteParameter.url,
    method: HttpMethod.DELETE,
    params: deleteParameter.params,
  };
  const result = await BaseApiCall(baseApiCallProps);
  return result.successOrNot === "Y";
}
