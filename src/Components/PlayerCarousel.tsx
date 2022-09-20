import { PlayerModel } from "../Models/PlayerModel";
import "./PlayerCarousel.scss";
import { useState, useEffect } from "react";
import { getAllPlayersService } from "../Service/PlayerService";
import PlayerInfoBox from "./PlayerInfoBox";

const PlayerCarousel = () => {
  const [players, setPlayers] = useState<PlayerModel[]>([]);

  const getAllPlayers = async () => {
    const res = await getAllPlayersService();
    setPlayers(res);
  };

  useEffect(() => {
    getAllPlayers();
  }, []);

  return (
    <div>
      {players && players.length > 0
        ? players.map((player, idx) => {
            return <PlayerInfoBox key={idx} player={player} />;
          })
        : null}
    </div>
  );
};
export default PlayerCarousel;
