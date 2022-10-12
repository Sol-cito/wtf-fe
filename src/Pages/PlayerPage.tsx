import { PlayerModel } from "../Models/PlayerModel";
import { useState, useEffect } from "react";
import "./PlayerPage.scss";
import PlayerBox from "../Components/PlayerBox";

const PlayerPage = () => {
  const [forwardPlayers, setForwardPlayers] = useState<PlayerModel[]>([]);
  const [midfielderPlayers, setMidfielderPlayers] = useState<PlayerModel[]>([]);
  const [defenderPlayers, setDefenderPlayers] = useState<PlayerModel[]>([]);

  useEffect(() => {}, []);

  const getAllFWPlayers = () => {};

  const getAllMFPlayers = () => {};

  const getAllDFPlayers = () => {};

  return (
    <div className="player_page_container">
      <PlayerBox players={forwardPlayers} />
      <PlayerBox players={midfielderPlayers} />
      <PlayerBox players={defenderPlayers} />
    </div>
  );
};
export default PlayerPage;
