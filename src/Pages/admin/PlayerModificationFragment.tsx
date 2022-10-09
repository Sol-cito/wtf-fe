import { useEffect, useState } from "react";
import PlayerInfoInputBox from "../../Components/PlayerInfoInputBox";
import PlayerList from "../../Components/PlayerList";
import { PlayerModel, PlayerMultipartModel } from "../../Models/PlayerModel";
import { getAllPlayersAPI, modifyPlayerAPI } from "../../Service/PlayerService";
import "./PlayerRegistrationFragment.scss";

const PlayerModificationFragment = () => {
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerModel>();

  const getAllRegisteredPlayers = async () => {
    const res = await getAllPlayersAPI();
    setPlayers(res);
  };

  useEffect(() => {
    getAllRegisteredPlayers();
  }, []);

  const handlePlayerMultiPart = async (
    palyer: PlayerModel,
    formData: FormData
  ) => {
    const modificationResult: PlayerModel = await modifyPlayerAPI(formData);
    if (modificationResult) {
      alert("Player Info Modification Success!! " + modificationResult.name);
      getAllRegisteredPlayers();
    } else {
      alert("[ERROR] 요청 실패...개발자에게 문의 ㄱㄱ");
    }
  };

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
        handlePlayerMultiPart={handlePlayerMultiPart}
        playerInfo={selectedPlayer}
      />
    </>
  );
};

export default PlayerModificationFragment;
