import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { PlayerStatModel } from "../Models/PlayerModel";
import { getPlayerTotalStatAPI } from "../Service/PlayerService";
import { useAppSelector } from "../Store/config";
import PlayerInfoBox from "./PlayerInfoBox";
import "./PlayerModalBox.scss";
import PlayerStatBox from "./PlayerStatBox";

const PlayerModalBox = () => {
  const { modalShow } = useAppSelector((state) => state.modal);
  const { player } = useAppSelector((state) => state.modal);

  const [selectedBtnNumber, setSelectedBtnNumber] = useState<number>(0);

  const [playerStat, setPlayerStat] = useState<PlayerStatModel>();

  const [contentComponent, setContentComponent] =
    useState<React.ReactElement>();

  const handleOnClickBtn = (btnNumber: number) => {
    setSelectedBtnNumber(btnNumber);
  };

  const getPlayerStat = async (playerId: number) => {
    const res: PlayerStatModel = await getPlayerTotalStatAPI(playerId);
    setPlayerStat(res);
  };

  useEffect(() => {
    if (modalShow) {
      setSelectedBtnNumber(0);
    }
  }, [modalShow]);

  useEffect(() => {
    if (!player) return;

    if (selectedBtnNumber === 0) {
      setContentComponent(<PlayerInfoBox player={player} />);
    } else if (selectedBtnNumber === 1) {
      setContentComponent(<PlayerStatBox playerStat={playerStat} />);
      getPlayerStat(player.id);
    }
  }, [selectedBtnNumber]);

  useEffect(() => {
    if (!player) return;
    getPlayerStat(player.id);
  }, [contentComponent]);

  return (
    <>
      {player && (
        <div className="player_info_header">
          <Button
            style={{
              backgroundColor:
                selectedBtnNumber === 0 ? "rgb(255, 224, 45)" : undefined,
            }}
            variant="contained"
            onClick={() => handleOnClickBtn(0)}
          >
            선수정보
          </Button>
          <Button
            style={{
              backgroundColor:
                selectedBtnNumber === 1 ? "rgb(255, 224, 45)" : undefined,
            }}
            variant="contained"
            onClick={() => handleOnClickBtn(1)}
          >
            스탯
          </Button>
        </div>
      )}
      {contentComponent}
    </>
  );
};
export default PlayerModalBox;
