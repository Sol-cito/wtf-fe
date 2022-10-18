import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { HttpMethod } from "../Models/Enum/CommonEnum";
import BaseApiCall, { AxiosResponseModel } from "./BaseApiCall";

export interface GetParameter {
  url: string;
  params?: any;
}

export interface PostParameter {
  url: string;
  data?: any;
  headerData?: AxiosRequestHeaders;
}

export interface PutParameter {
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
  const result = await BaseApiCall(requestConfig);
  return result.data;
}

export async function postApiCall(postParameter: PostParameter): Promise<any> {
  const requestConfig: AxiosRequestConfig = {
    url: postParameter.url,
    method: HttpMethod.POST,
    data: postParameter.data,
    headers: postParameter.headerData,
  };
  const result: AxiosResponseModel = await BaseApiCall(requestConfig);
  return result.data;
}

export async function putApiCall(putParameter: PutParameter): Promise<any> {
  const requestConfig: AxiosRequestConfig = {
    url: putParameter.url,
    method: HttpMethod.PUT,
    data: putParameter.data,
    headers: putParameter.headerData,
  };
  const result = await BaseApiCall(requestConfig);
  return result.data;
}
