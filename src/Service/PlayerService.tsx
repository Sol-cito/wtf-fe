import { PlayerModel } from "../Models/PlayerModel";
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
  playerModel: PlayerModel
): Promise<PlayerModel> {
  const putParameter: PutParameter = {
    url: "player",
    data: playerModel,
    headerData: {
      "Content-Type": "multipart/form-data",
    },
  };
  const result: PlayerModel = await putApiCall(putParameter);
  return result;
}
