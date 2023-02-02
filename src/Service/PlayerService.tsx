import { PlayerModel, PlayerStatModel } from "../Models/PlayerModel";
import {
  getApiCall,
  GetParameter,
  postApiCall,
  PostParameter,
  putApiCall,
  PutParameter,
} from "./ApiCall";

export async function getAllPlayersAPI(): Promise<PlayerModel[]> {
  const getParameter: GetParameter = {
    url: "player",
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

export async function getPlayersByPositionAPI(
  position: string
): Promise<PlayerModel[]> {
  const getParameter: GetParameter = {
    url: "player",
    params: {
      position: position,
    },
  };
  const result: PlayerModel[] = await getApiCall(getParameter);
  return result;
}

export async function registerNewPlayerAPI(
  formData: FormData
): Promise<PlayerModel> {
  const postParameter: PostParameter = {
    url: "player",
    data: formData,
    headerData: {
      "Content-Type": "multipart/form-data",
    },
  };
  const result: PlayerModel = await postApiCall(postParameter);
  return result;
}

export async function modifyPlayerAPI(
  formData: FormData
): Promise<PlayerModel> {
  const putParameter: PutParameter = {
    url: "player",
    data: formData,
    headerData: {
      "Content-Type": "multipart/form-data",
    },
  };
  const result: PlayerModel = await putApiCall(putParameter);
  return result;
}

export async function getPlayerStatAPI(
  playerId: number
): Promise<PlayerStatModel> {
  const getParameter: GetParameter = {
    url: "player-stat",
    params: {
      id: playerId,
    },
  };
  const result: PlayerStatModel = await getApiCall(getParameter);
  return result;
}
