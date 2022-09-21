import { PlayerModel } from "../Models/PlayerModel";
import "./PlayerSlide.scss";
import { useState, useEffect } from "react";
import { getAllPlayersService } from "../Service/PlayerService";
import PlayerInfoBox from "./PlayerInfoBox";

const PlayerSlide = () => {
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [slideTranslateXValue, setSlideTranslateXValue] = useState<number>(0);

  const getAllPlayers = async () => {
    const res = await getAllPlayersService();
    // test
    let temp: PlayerModel[] = new Array<PlayerModel>();
    temp.push(...res);
    temp.push(...res);
    temp.push(...res);
    temp.push(...res);
    temp.push(...res);

    setPlayers(temp);
    setSlideTranslateXValue(-20);
  };

  useEffect(() => {
    getAllPlayers();
  }, []);

  const handleOnSlideBtnClick = (cnt: number) => {
    let nextValue =
      slideTranslateXValue + Math.round(75 / players.length) * cnt;
    if (nextValue >= 0 || nextValue <= -75) return;
    setSlideTranslateXValue(nextValue);
  };

  return (
    <div>
      <div className="intro_title_area">
        <span className="intro_title"> Players </span>
      </div>
      <p onClick={() => handleOnSlideBtnClick(-1)}> 왼쪽 </p>
      <div
        className="slide_container"
        style={{
          transform: `translateX(${slideTranslateXValue}%)`,
        }}
      >
        {players && players.length > 0
          ? players.map((player, idx) => {
              return (
                <div className="player_info_container">
                  <PlayerInfoBox key={idx} player={player} />
                </div>
              );
            })
          : null}
      </div>
      <p onClick={() => handleOnSlideBtnClick(1)}> 오른쪽 </p>
    </div>
  );
};
export default PlayerSlide;
