import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  HeaderContentType,
  HttpMethod,
  SuccessOrNot,
} from "../Models/Enum/CommonEnum";

export interface AxiosResponseModel {
  successOrNot: string;
  statusCode: number;
  data: any;
}

export interface BaseApiCallProps {
  url: string;
  method: HttpMethod;
  params?: any;
  data?: any;
  HeaderContentType?: HeaderContentType;
}

async function baseApiCall(props: BaseApiCallProps): Promise<any> {
  const baseUrl: string = process.env.REACT_APP_BASE_URL as string;

  const requestConfig: AxiosRequestConfig = {
    url: props.url,
    method: props.method,
    data: props.data,
    params: props.params,
    headers: {
      Authorization: "test auth", // TO-DO
      "Content-Type":
        props.HeaderContentType || HeaderContentType.APPLICATION_JSON,
    },
  };

  let axiosResponse: AxiosResponseModel = {
    successOrNot: SuccessOrNot.Y,
    statusCode: 200,
    data: null,
  };

  try {
    requestConfig.url = baseUrl + requestConfig.url;
    const response: AxiosResponse<any> = await axios.request(requestConfig);
    if (response.status !== 200) {
      throw new Error("Api request fail");
    }
    axiosResponse.statusCode = response.status;
    axiosResponse.data = response.data || true;
    return axiosResponse;
  } catch (e: any) {
    axiosResponse.successOrNot = SuccessOrNot.N;
    axiosResponse.data = false;
    return axiosResponse;
  }
}

export default baseApiCall;
