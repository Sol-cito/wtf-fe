import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { HttpMethod } from "../Models/Enum/EnumAboutHttp";
import baseApiCall from "./BaseApiCall";

export interface GetParameter {
  url: string;
  params?: any;
}

export interface PostParameter {
  url: string;
  data?: any;
  headerData?: AxiosRequestHeaders;
}

export async function getApiCall(getParameter: GetParameter): Promise<any> {
  const requestConfig: AxiosRequestConfig = {
    url: getParameter.url,
    method: HttpMethod.GET,
    params: getParameter.params,
  };
  const result = await baseApiCall(requestConfig);
  return result.data;
}

export async function postApiCall(postParameter: PostParameter): Promise<any> {
  const requestConfig: AxiosRequestConfig = {
    url: postParameter.url,
    method: HttpMethod.POST,
    data: postParameter.data,
    headers: postParameter.headerData,
  };
  const result = await baseApiCall(requestConfig);
  return result.data;
}
