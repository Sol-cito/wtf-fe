import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import {
  PLAYER_MODAL_BACKGROUND_STYLE_BROWSER,
  PLAYER_MODAL_BACKGROUND_STYLE_MOBILE,
} from "../CommonConstant/ImgConstant";
import { SortModel } from "../Models/CommonModel";
import { OrderSortKeyword } from "../Models/Enum/CommonEnum";
import { PlayerModel } from "../Models/PlayerModel";
import { getAllPlayersAPI } from "../Service/PlayerService";
import { useAppDispatch } from "../Store/config";
import { ModalState, setModalState } from "../Store/Slices/ModalSlice";
import CustomizedSpinner from "./CustomizedSpinner";
import PlayerModalBox from "./PlayerModalBox";
import PlayerPhoto from "./PlayerPhoto";
import "./PlayerSlide.scss";

const PlayerSlide = () => {
  const [players, setPlayers] = useState<PlayerModel[]>();
  const [slideTranslateXValue, setSlideTranslateXValue] = useState<number>(0);
  const [isLoading, setIsLoding] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  const getPlayers = async () => {
    const sortParam: SortModel = {
      columnName: "backNo",
      sortDirection: OrderSortKeyword.ASC,
    };
    const res = await getAllPlayersAPI(sortParam);
    setPlayers(res);
    setSlideTranslateXValue(isMobile ? 0 : -20);
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
    const modalState: ModalState = {
      modalShow: true,
      model: inputPlayer,
      includedComponent: <PlayerModalBox />,
      backgroundStyle: isMobile
        ? PLAYER_MODAL_BACKGROUND_STYLE_MOBILE
        : PLAYER_MODAL_BACKGROUND_STYLE_BROWSER,
    };
    document.body.style.overflow = "hidden";
    dispatch(setModalState(modalState));
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
                          overlayTextOnHovering={!isMobile}
                        />
                      );
                    }
                  })
                : null}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default PlayerSlide;
