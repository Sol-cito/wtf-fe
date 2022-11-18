import { TeamModel } from "../Models/TeamModel";
import {
  getApiCall,
  GetParameter,
  postApiCall,
  PostParameter,
} from "./ApiCall";

export async function getAllTeamsAPI(): Promise<TeamModel[]> {
  const getParameter: GetParameter = {
    url: "team",
  };
  const result: TeamModel[] = await getApiCall(getParameter);
  return result;
}

export async function registerNewTeamAPI(
  formData: FormData
): Promise<TeamModel> {
  const postParameter: PostParameter = {
    url: "team",
    data: formData,
    headerData: {
      "Content-Type": "multipart/form-data",
    },
  };
  const result: TeamModel = await postApiCall(postParameter);
  return result;
}
