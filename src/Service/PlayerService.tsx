import { PlayerModel } from "../Models/PlayerModel";
import { getApiCall, GetParameter } from "./ApiCall";

export async function getAllPlayersService(): Promise<Array<PlayerModel>> {
  const getParameter: GetParameter = {
    url: "player/all",
  };
  const result: Array<PlayerModel> = await getApiCall(getParameter);
  return result;
}
