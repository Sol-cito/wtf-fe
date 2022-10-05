import { useEffect, useState } from "react";
import PlayerInfoInputBox from "../../Components/PlayerInfoInputBox";
import PlayerList from "../../Components/PlayerList";
import { PlayerModel } from "../../Models/PlayerModel";
import {
  getAllPlayersAPI,
  getPlayersByNameAPI,
  registerNewPlayerAPI,
} from "../../Service/PlayerService";
import "./PlayerRegistrationFragment.scss";

const PlayerRegistrationFragment = () => {
  const [players, setPlayers] = useState<PlayerModel[]>([]);

  const getAllRegisteredPlayers = async () => {
    const res = await getAllPlayersAPI();
    setPlayers(res);
  };

  useEffect(() => {
    getAllRegisteredPlayers();
  }, []);

  const validateDuplicatePlayerName = async (korName: string) => {
    const playerByNameRes: PlayerModel[] = await getPlayersByNameAPI(korName);
    if (0 < playerByNameRes.length) {
      let confirmRes = window.confirm(
        "[Warning] 동일 이름으로 등록된 선수가 이미 있습니다. 그래도 등록하시겠습니까? \n"
      );
      if (!confirmRes) return false;
    }
    return true;
  };

  return (
    <>
      <PlayerList players={players} title={"< 현재 등록된 선수 명단 >"} />
      <PlayerInfoInputBox
        title={"선수 등록"}
        validateFunction={validateDuplicatePlayerName}
        initFunction={getAllRegisteredPlayers}
        executeFunction={registerNewPlayerAPI}
      />
    </>
  );
};

export default PlayerRegistrationFragment;
