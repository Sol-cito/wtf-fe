import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { SuccessOrNot } from "../Models/Enum/CommonEnum";

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
    data: null,
  };

  try {
    requestConfig.url = baseUrl + requestConfig.url;
    const response: AxiosResponse<any> = await axios.request(requestConfig);
    if (response.status !== 200 || !response.data) {
      throw new Error("Api request fail");
    }
    axiosResponse.statusCode = response.status;
    axiosResponse.data = response.data;
    return axiosResponse;
  } catch (e: any) {
    axiosResponse.successOrNot = SuccessOrNot.N;
    alert("Error code : " + e.code + "\n" + "Error message : " + e.message);
    return axiosResponse;
  }
}

export default baseApiCall;
