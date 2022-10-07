import { useEffect, useState } from "react";
import CustomizedConfirm from "../../Components/CustomizedConfirm";
import PlayerInfoInputBox from "../../Components/PlayerInfoInputBox";
import PlayerList from "../../Components/PlayerList";
import { PlayerModel, PlayerMultipartModel } from "../../Models/PlayerModel";
import { getAllPlayersAPI, modifyPlayerAPI } from "../../Service/PlayerService";
import { validatePlayerInputData } from "../../Service/UtilityService";
import "./PlayerRegistrationFragment.scss";

const PlayerModificationFragment = () => {
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [playerMultipartModel, setPlayerMultipartModel] =
    useState<PlayerMultipartModel>();

  const [selectedPlayer, setSelectedPlayer] = useState<PlayerModel>();

  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [confirmContents, setConfirmContents] = useState<string>("");

  const getAllRegisteredPlayers = async () => {
    const res = await getAllPlayersAPI();
    setPlayers(res);
  };

  useEffect(() => {
    getAllRegisteredPlayers();
  }, []);

  const handleModificationOnClick = async (
    playerMultipartModel: PlayerMultipartModel
  ) => {
    if (!validatePlayerInputData(playerMultipartModel.player)) return;
    setShowConfirm(true);
  };

  const handleOnConfirm = () => {};

  return (
    <>
      <PlayerList
        players={players}
        title={"< 현재 등록된 선수 명단 >"}
        isRadioButtonVisible={true}
        setSelectedPlayer={setSelectedPlayer}
      />
      <PlayerInfoInputBox
        title={"선수 수정"}
        handleOnClick={handleModificationOnClick}
        playerInfo={selectedPlayer}
      />
      <CustomizedConfirm
        show={showConfirm}
        confirmQuestion={"입력한 선수 정보를 한번 더 확인해주세용."}
        contents={confirmContents}
        onClickConfirm={handleOnConfirm}
        onClickCancel={() => {
          setShowConfirm(false);
        }}
      />
    </>
  );
};

export default PlayerModificationFragment;
