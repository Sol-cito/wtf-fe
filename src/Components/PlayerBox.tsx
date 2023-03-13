import { isMobile } from "react-device-detect";
import {
  PLAYER_MODAL_BACKGROUND_STYLE_BROWSER,
  PLAYER_MODAL_BACKGROUND_STYLE_MOBILE,
} from "../CommonConstant/ImgConstant";
import { PlayerModel } from "../Models/PlayerModel";
import { useAppDispatch } from "../Store/config";
import { ModalState, setModalState } from "../Store/Slices/ModalSlice";
import "./PlayerBox.scss";
import PlayerModalBox from "./PlayerModalBox";
import PlayerPhoto from "./PlayerPhoto";

export interface PlayerBoxProps {
  title?: string;
  players: PlayerModel[];
}

const PlayerBox = (props: PlayerBoxProps) => {
  const dispatch = useAppDispatch();

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
    <div className="player_box">
      <p className="player_box_title">{props.title}</p>
      <div className="player_photos_area">
        {props.players &&
          props.players.length > 0 &&
          props.players.map((ele, idx) => {
            if (ele.curYn === "Y")
              return (
                <PlayerPhoto
                  key={idx}
                  player={ele}
                  onClick={handleOnPlayerPhotoClick}
                  overlayTextOnHovering={!isMobile}
                  alwaysOverlayTextOn={isMobile}
                />
              );
          })}
      </div>
    </div>
  );
};

export default PlayerBox;
