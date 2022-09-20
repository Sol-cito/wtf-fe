import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { SuccessOrNot } from "../Models/Enum/EnumAboutHttp";

export interface AxiosResponseModel {
  successOrNot: string;
  statusCode: number;
  data: any;
}

async function baseApiCall(requestConfig: AxiosRequestConfig): Promise<any> {
  const baseUrl: string = process.env.REACT_APP_BASE_URL as string;

  let axiosResponse: AxiosResponseModel = {
    successOrNot: SuccessOrNot.Y,
    statusCode: 200,
    data: {},
  };

  requestConfig.url = baseUrl + requestConfig.url;
  const response: AxiosResponse<any> = await axios.request(requestConfig);
  if (response.status !== 200 || !response.data) {
    axiosResponse.successOrNot = SuccessOrNot.N;
  }
  axiosResponse.statusCode = response.status;
  axiosResponse.data = response.data;
  return axiosResponse;
}

export default baseApiCall;
