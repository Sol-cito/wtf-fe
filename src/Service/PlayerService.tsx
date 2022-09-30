import { PlayerModel } from "../Models/PlayerModel";
import {
  getApiCall,
  GetParameter,
  postApiCall,
  PostParameter,
} from "./ApiCall";

export async function getAllPlayersAPI(): Promise<PlayerModel[]> {
  const getParameter: GetParameter = {
    url: "player/all",
  };
  const result: PlayerModel[] = await getApiCall(getParameter);
  return result;
}

export async function getPlayersByNameAPI(
  inputName: string
): Promise<PlayerModel[]> {
  const getParameter: GetParameter = {
    url: "player",
    params: {
      name: inputName,
    },
  };
  const result: PlayerModel[] = await getApiCall(getParameter);
  return result;
}

export async function registerNewPlayerAPI(
  player: PlayerModel
): Promise<PlayerModel> {
  const postParameter: PostParameter = {
    url: "player/register",
    data: player,
  };
  const result: PlayerModel = await postApiCall(postParameter);
  return result;
}
