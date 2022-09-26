import { useAppSelector } from "../Store/config";
import "./PlayerModalBox.scss";

const PlayerModalBox = () => {
  const { player } = useAppSelector((state) => state.playerModal);

  return (
    <>
      {player ? (
        <div className="player_info_container">
          <div className="photo_area">
            <img src={player.profileImgSrc} />
          </div>
          <div className="info_area">
            <div>{player.name}</div>
            <div>{player.backNo}</div>
            <div>{player.position}</div>
            <div>{player.birth}</div>
            <div>{player.moto}</div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default PlayerModalBox;
