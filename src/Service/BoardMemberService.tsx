import { BoardMemberModel } from "../Models/BoardMemberModel";
import { getApiCall, GetParameter } from "./ApiCall";

export async function getAllBoardMemberAPI(): Promise<BoardMemberModel[]> {
  const getParameter: GetParameter = {
    url: "board-member",
  };
  const result: BoardMemberModel[] = await getApiCall(getParameter);
  return result;
}
