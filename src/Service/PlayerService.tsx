import { PlayerModel } from "../Models/PlayerModel";
import { getApiCall, GetParameter } from "./ApiCall";

export async function getAllPlayersService(): Promise<PlayerModel[]> {
  const getParameter: GetParameter = {
    url: "player/all",
  };
  const result: PlayerModel[] = await getApiCall(getParameter);
  return result;
}
