import { PlayerModel } from "../Models/PlayerModel";
import "./PlayerSlide.scss";
import { useState, useEffect } from "react";
import { getAllPlayersAPI } from "../Service/PlayerService";
import PlayerPhoto from "./PlayerPhoto";
import { useAppDispatch, useAppSelector } from "../Store/config";
import { ModalState, setModalState } from "../Store/Slices/PlayerModalSlice";
import PlayerModalBox from "./PlayerModalBox";
import { isMobile } from "react-device-detect";
import {
  PLAYER_MODAL_BACKGROUND_STYLE_BROWSER,
  PLAYER_MODAL_BACKGROUND_STYLE_MOBILE,
} from "../CommonConstant/ImgConstant";
import CustomizedModal from "./CustomizedModal";
import CustomizedSpinner from "./CustomizedSpinner";

const PlayerSlide = () => {
  const [players, setPlayers] = useState<PlayerModel[]>();
  const [slideTranslateXValue, setSlideTranslateXValue] = useState<number>(0);
  const { modalShow } = useAppSelector((state) => state.modal);
  const [isLoading, setIsLoding] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  const getPlayers = async () => {
    const res = await getAllPlayersAPI();
    setPlayers(res);
    setSlideTranslateXValue(-20);
    if (res) setIsLoding(false);
  };

  useEffect(() => {
    getPlayers();
  }, []);

  const handleOnSlideBtnClick = (cnt: number) => {
    let nextValue =
      slideTranslateXValue + Math.round(75 / players!.length) * cnt;
    if (nextValue >= 10 || nextValue <= -100) return;
    setSlideTranslateXValue(nextValue);
  };

  const handleOnPlayerPhotoClick = (inputPlayer: PlayerModel) => {
    const playerModalState: ModalState = {
      modalShow: true,
      player: inputPlayer,
    };
    document.body.style.overflow = "hidden";
    dispatch(setModalState(playerModalState));
  };

  return (
    <>
      {isLoading ? (
        <>
          <CustomizedSpinner />
        </>
      ) : (
        <>
          <div className="slide_area">
            <div className="arrow_area">
              <img
                id="arrow_left"
                src="/img/etc/arrow_pointing_left.png"
                onClick={() => handleOnSlideBtnClick(1)}
              />
              <img
                id="arrow_right"
                src="/img/etc/arrow_pointing_right.png"
                onClick={() => handleOnSlideBtnClick(-1)}
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
                    if (player.curYn === "Y") {
                      return (
                        <PlayerPhoto
                          key={idx}
                          player={player}
                          onClick={handleOnPlayerPhotoClick}
                        />
                      );
                    }
                  })
                : null}
            </div>
          </div>
          <CustomizedModal
            showModal={modalShow}
            includedComponent={<PlayerModalBox />}
            backgroundStyle={
              isMobile
                ? PLAYER_MODAL_BACKGROUND_STYLE_MOBILE
                : PLAYER_MODAL_BACKGROUND_STYLE_BROWSER
            }
          />
        </>
      )}
    </>
  );
};
export default PlayerSlide;
