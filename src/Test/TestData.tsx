import { Position } from "../Models/Enum/EnumsAboutPlayer";
import { PlayerModel } from "../Models/PlayerModel";

export const PlayerTestData1: PlayerModel = {
  name: "강승우",
  backNo: 15,
  position: Position.DF,
  moto: "모든 공은 내 앞에서 멈춘다.",
  goal: 0,
  assist: 0,
  imgSrc: "img/SeoungWoo.jpg",
};

export const PlayerTestData2: PlayerModel = {
  name: "박원남",
  backNo: 1,
  position: Position.GK,
  moto: "노이어 형은 나가있어. 뒤지기 싫으면.",
  goal: 1,
  assist: 0,
  imgSrc: "img/WonNam.jpg",
};
