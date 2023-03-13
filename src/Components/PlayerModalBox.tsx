import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { PlayerModel } from "../Models/PlayerModel";
import { useAppSelector } from "../Store/config";
import PlayerInfoBox from "./PlayerInfoBox";
import "./PlayerModalBox.scss";
import PlayerStatBox from "./PlayerStatBox";

const PlayerModalBox = () => {
  const { modalShow } = useAppSelector((state) => state.modal);
  const { model } = useAppSelector((state) => state.modal);

  const [selectedBtnNumber, setSelectedBtnNumber] = useState<number>(0);

  const [contentComponent, setContentComponent] =
    useState<React.ReactElement>();

  const handleOnClickBtn = (btnNumber: number) => {
    setSelectedBtnNumber(btnNumber);
  };

  useEffect(() => {
    if (modalShow) {
      setSelectedBtnNumber(0);
    }
  }, [modalShow]);

  useEffect(() => {
    if (!model) return;
    if (selectedBtnNumber === 0) {
      setContentComponent(<PlayerInfoBox player={model as PlayerModel} />);
    } else if (selectedBtnNumber === 1) {
      setContentComponent(<PlayerStatBox player={model as PlayerModel} />);
    }
  }, [selectedBtnNumber]);

  return (
    <>
      {model && (
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
