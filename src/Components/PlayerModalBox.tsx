import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { PlayerModalComponentEnum } from "../Models/Enum/CommonEnum";
import { PlayerModel } from "../Models/PlayerModel";
import { useAppSelector } from "../Store/config";
import PlayerInfoBox from "./PlayerInfoBox";
import "./PlayerModalBox.scss";
import PlayerStatBox from "./PlayerStatBox";

const PlayerModalBox = () => {
  const { modalShow } = useAppSelector((state) => state.modal);
  const { model } = useAppSelector((state) => state.modal);

  const [selectedModalComponent, setSelectedModalComponent] =
    useState<PlayerModalComponentEnum>(
      PlayerModalComponentEnum.PLAYER_GENERAL_INFO
    );

  const [contentComponent, setContentComponent] =
    useState<React.ReactElement>();

  const handleOnClickBtn = (playerModalComponent: PlayerModalComponentEnum) => {
    setSelectedModalComponent(playerModalComponent);
  };

  useEffect(() => {
    if (modalShow) {
      setSelectedModalComponent(PlayerModalComponentEnum.PLAYER_GENERAL_INFO);
    }
  }, [modalShow]);

  useEffect(() => {
    if (!model) return;
    if (
      selectedModalComponent === PlayerModalComponentEnum.PLAYER_GENERAL_INFO
    ) {
      setContentComponent(<PlayerInfoBox player={model as PlayerModel} />);
    } else if (
      selectedModalComponent === PlayerModalComponentEnum.PLAYER_STAT
    ) {
      setContentComponent(<PlayerStatBox player={model as PlayerModel} />);
    }
  }, [selectedModalComponent]);

  return (
    <>
      {model && (
        <div className="player_info_header">
          <Button
            style={{
              backgroundColor:
                selectedModalComponent ===
                PlayerModalComponentEnum.PLAYER_GENERAL_INFO
                  ? "rgb(255, 224, 45)"
                  : undefined,
            }}
            variant="contained"
            onClick={() =>
              handleOnClickBtn(PlayerModalComponentEnum.PLAYER_GENERAL_INFO)
            }
          >
            선수정보
          </Button>
          <Button
            style={{
              backgroundColor:
                selectedModalComponent === PlayerModalComponentEnum.PLAYER_STAT
                  ? "rgb(255, 224, 45)"
                  : undefined,
            }}
            variant="contained"
            onClick={() =>
              handleOnClickBtn(PlayerModalComponentEnum.PLAYER_STAT)
            }
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
