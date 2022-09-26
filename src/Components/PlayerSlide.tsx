import { PlayerModel } from "../Models/PlayerModel";
import "./PlayerSlide.scss";
import { useState, useEffect } from "react";
import { getAllPlayersService } from "../Service/PlayerService";
import PlayerPhoto from "./PlayerPhoto";
import { useAppDispatch, useAppSelector } from "../Store/config";
import {
  PlayerModalState,
  setPlayerModalState,
} from "../Store/Slices/PlayerModalSlice";
import Modal from "./Modal";
import PlayerModalBox from "./PlayerModalBox";

const PlayerSlide = () => {
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [slideTranslateXValue, setSlideTranslateXValue] = useState<number>(0);
  const { modalShow } = useAppSelector((state) => state.playerModal);
  const dispatch = useAppDispatch();

  const getAllPlayers = async () => {
    const res = await getAllPlayersService();
    setPlayers(res);
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

  const handleOnPlayerPhotoClick = (inputPlayer: PlayerModel) => {
    const playerModalState: PlayerModalState = {
      modalShow: true,
      player: inputPlayer,
    };
    dispatch(setPlayerModalState(playerModalState));
  };

  return (
    <>
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
                  <div
                    key={idx}
                    className="player_info_container"
                    onClick={() => handleOnPlayerPhotoClick(player)}
                  >
                    <PlayerPhoto player={player} />
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <Modal showModal={modalShow} includedComponent={<PlayerModalBox />} />
    </>
  );
};
export default PlayerSlide;
