import { PlayerModel } from "../Models/PlayerModel";
import "./PlayerSlide.scss";
import { useState, useEffect } from "react";
import { getAllPlayersService } from "../Service/PlayerService";
import PlayerPhoto from "./PlayerPhoto";

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
    if (nextValue >= 10 || nextValue <= -75) return;
    setSlideTranslateXValue(nextValue);
  };

  return (
    <div>
      <div className="intro_title_area">
        <span className="intro_title"> Players </span>
      </div>
      <div className="slide_area">
        <div className="arrow_area">
          <img
            id="arrow_left"
            src="img/etc/arrow_pointing_left.png"
            onClick={() => handleOnSlideBtnClick(-1)}
          />
          <img
            id="arrow_right"
            src="img/etc/arrow_pointing_right.png"
            onClick={() => handleOnSlideBtnClick(1)}
          />
        </div>
        <div
          className="slide_container"
          style={{
            transform: `translateX(${slideTranslateXValue}%)`,
          }}
        >
          {players && players.length > 0
            ? players.map((player, idx) => {
                return (
                  <div key={idx} className="player_info_container">
                    <PlayerPhoto player={player} />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};
export default PlayerSlide;
