import { SortModel } from "../Models/CommonModel";
import { HeaderContentType, OrderSortKeyword } from "../Models/Enum/CommonEnum";
import {
  PlayerMatchStatModel,
  PlayerModel,
  PlayerStatModel,
} from "../Models/PlayerModel";
import {
  getApiCall,
  GetParameter,
  postApiCall,
  PostParameter,
  putApiCall,
  PutParameter,
} from "./ApiCall";

export async function getAllPlayersAPI(
  sortParam?: SortModel
): Promise<PlayerModel[]> {
  const getParameter: GetParameter = {
    url: "player",
    params: {
      columnName: sortParam?.columnName || "id",
      sortDirection: sortParam?.sortDirection || OrderSortKeyword.ASC,
    },
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
    headerContentType: HeaderContentType.MULTIPART_FORM,
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
    headerContentType: HeaderContentType.MULTIPART_FORM,
  };
  const result: PlayerModel = await putApiCall(putParameter);
  return result;
}

export async function getPlayerTotalStatAPI(
  playerId: number
): Promise<PlayerStatModel> {
  const getParameter: GetParameter = {
    url: "player/total-stat",
    params: {
      id: playerId,
    },
  };
  const result: PlayerStatModel = await getApiCall(getParameter);
  return result;
}

export async function getPlayerScoresByMatchResultAPI(
  playerId: number
): Promise<PlayerMatchStatModel[]> {
  const getParameter: GetParameter = {
    url: "player/match-score",
    params: {
      playerId: playerId,
      limit: 3,
    },
  };
  const result: PlayerMatchStatModel[] = await getApiCall(getParameter);
  return result;
}

export async function getPlayerAssistsByMatchResultAPI(
  playerId: number
): Promise<PlayerMatchStatModel[]> {
  const getParameter: GetParameter = {
    url: "player/match-assist",
    params: {
      playerId: playerId,
      limit: 3,
    },
  };
  const result: PlayerMatchStatModel[] = await getApiCall(getParameter);
  return result;
}
