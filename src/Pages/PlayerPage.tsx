import { PlayerModel } from "../Models/PlayerModel";
import { useState, useEffect } from "react";
import "./PlayerPage.scss";
import PlayerBox from "../Components/PlayerBox";
import { getPlayersByPositionAPI } from "../Service/PlayerService";
import { Position } from "../Models/Enum/EnumsAboutPlayer";

const PlayerPage = () => {
  const [forwardPlayers, setForwardPlayers] = useState<PlayerModel[]>([]);
  const [midfielderPlayers, setMidfielderPlayers] = useState<PlayerModel[]>([]);
  const [defenderPlayers, setDefenderPlayers] = useState<PlayerModel[]>([]);
  const [goalyPlayers, setGoalyPlayers] = useState<PlayerModel[]>([]);

  const getAllFWPlayers = async () => {
    const res: PlayerModel[] = await getPlayersByPositionAPI(Position.FW);
    setForwardPlayers(res);
  };

  const getAllMFPlayers = async () => {
    const res: PlayerModel[] = await getPlayersByPositionAPI(Position.MF);
    setMidfielderPlayers(res);
  };

  const getAllDFPlayers = async () => {
    const res: PlayerModel[] = await getPlayersByPositionAPI(Position.DF);
    setDefenderPlayers(res);
  };

  const getAllGFPlayers = async () => {
    const res: PlayerModel[] = await getPlayersByPositionAPI(Position.GK);
    setGoalyPlayers(res);
  };

  useEffect(() => {
    getAllGFPlayers();
    getAllFWPlayers();
    getAllMFPlayers();
    getAllDFPlayers();
  }, []);

  return (
    <div className="player_page_container">
      <PlayerBox players={goalyPlayers} />
      <PlayerBox players={forwardPlayers} />
      <PlayerBox players={midfielderPlayers} />
      <PlayerBox players={defenderPlayers} />
    </div>
  );
};
export default PlayerPage;
