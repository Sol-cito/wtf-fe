export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum SuccessOrNot {
  Y = "Y",
  N = "N",
}

export enum Position {
  FW = "FW",
  MF = "MF",
  DF = "DF",
  GK = "GK",
}

export enum OrderSortKeyword {
  ASC = "ASC",
  DESC = "DESC",
}

export enum YesOrNo {
  YES = "Y",
  NO = "N",
}

export enum WinOrLoseOrDraw {
  WIN = "WIN",
  LOSE = "LOSE",
  DRAW = "DRAW",
}

export enum InquiryCategories {
  MATCH = "시합문의",
  BUG_REPORT = "버그개선",
  ETC = "기타",
}

export enum GoalType {
  FIELD = "Field",
  HEADER = "Header",
  FREEKICK = "FreeKick",
  PK = "PK",
  UNKNOWN = "Unknown",
}

export enum PlayerModalComponentEnum {
  PLAYER_GENERAL_INFO = "선수정보",
  PLAYER_STAT = "스탯",
}

export enum HeaderContentType {
  MULTIPART_FORM = "multipart/form-data",
  APPLICATION_JSON = "application/json;charset=UTF-8",
}
