import { TeamHistoryModel, TeamModel } from "../Models/TeamModel";
import {
  getApiCall,
  GetParameter,
  postApiCall,
  PostParameter,
  putApiCall,
  PutParameter,
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
  };
  const result: TeamModel = await postApiCall(postParameter);
  return result;
}

export async function modifyTeamAPI(formData: FormData): Promise<TeamModel> {
  const putParameter: PutParameter = {
    url: "team",
    data: formData,
  };
  const result: TeamModel = await putApiCall(putParameter);
  return result;
}

export async function getAllTeamHistoryAPI(): Promise<TeamHistoryModel[]> {
  const getParameter: GetParameter = {
    url: "team-history",
  };
  const result: TeamHistoryModel[] = await getApiCall(getParameter);
  return result;
}
