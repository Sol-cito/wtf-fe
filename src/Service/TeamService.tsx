import { TeamModel } from "../Models/TeamModel";
import { getApiCall, GetParameter } from "./ApiCall";

export async function getAllTeams(): Promise<TeamModel[]> {
  const getParameter: GetParameter = {
    url: "team",
  };
  const result: TeamModel[] = await getApiCall(getParameter);
  return result;
}
