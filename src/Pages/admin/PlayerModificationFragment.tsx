import { useEffect, useState } from "react";
import PlayerInfoInputBox from "../../Components/PlayerInfoInputBox";
import PlayerList from "../../Components/PlayerList";
import { PlayerModel } from "../../Models/PlayerModel";
import { getAllPlayersAPI } from "../../Service/PlayerService";
import "./PlayerRegistrationFragment.scss";

const PlayerModificationFragment = () => {
  const [players, setPlayers] = useState<PlayerModel[]>([]);

  const getAllRegisteredPlayers = async () => {
    const res = await getAllPlayersAPI();
    setPlayers(res);
  };

  useEffect(() => {
    getAllRegisteredPlayers();
  }, []);

  return (
    <>
      <PlayerList
        players={players}
        title={"< 현재 등록된 선수 명단 >"}
        isCheckboxVisible={true}
      />
      <PlayerInfoInputBox
        title={"선수 수정"}
        // playerInfo={}
        // validateFunction={}
        initFunction={getAllRegisteredPlayers}
        executeFunction={() => {}}
      />
    </>
  );
};

export default PlayerModificationFragment;
