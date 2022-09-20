import { AxiosRequestConfig } from "axios";
import { HttpMethod } from "../Models/Enum/EnumAboutHttp";
import baseApiCall from "./BaseApiCall";

export interface GetParameter {
  url: string;
  params?: any;
}

export async function getApiCall(getParameter: GetParameter): Promise<any> {
  const requestConfig: AxiosRequestConfig = {
    url: getParameter.url,
    method: HttpMethod.GET,
    params: getParameter.params,
  };
  const result = await baseApiCall(requestConfig); // TO-DO : successYn == n 일때 처리
  return result.data;
}

export const postApiCall = async (url: string) => {};
