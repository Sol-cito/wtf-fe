import { PlayerModel } from "../Models/PlayerModel";
import { useState, useEffect } from "react";
import "./PlayerPage.scss";
import PlayerBox from "../Components/PlayerBox";
import { getPlayersByPositionAPI } from "../Service/PlayerService";
import { Position } from "../Models/Enum/EnumsAboutPlayer";
import PageContainer from "../Components/PageContainer";
import { SALLWOW_BLACK } from "../CommonConstant/StringColorConstant";
import CustomizedSpinner from "../Components/CustomizedSpinner";

const PlayerPage = () => {
  const [isLoading, setIsLoding] = useState<boolean>(true);
  const [forwardPlayers, setForwardPlayers] = useState<PlayerModel[]>();
  const [midfielderPlayers, setMidfielderPlayers] = useState<PlayerModel[]>();
  const [defenderPlayers, setDefenderPlayers] = useState<PlayerModel[]>();
  const [goalyPlayers, setGoalyPlayers] = useState<PlayerModel[]>();

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

  const callAllAPIs = () => {
    getAllGFPlayers();
    getAllFWPlayers();
    getAllMFPlayers();
    getAllDFPlayers();
  };

  useEffect(() => {
    callAllAPIs();
  }, []);

  useEffect(() => {
    if (goalyPlayers && forwardPlayers && midfielderPlayers && defenderPlayers)
      setIsLoding(false);
  }, [goalyPlayers, forwardPlayers, midfielderPlayers, defenderPlayers]);

  return (
    <>
      {isLoading ? (
        <CustomizedSpinner />
      ) : (
        <>
          <PageContainer
            includedComponent={
              <PlayerBox title={Position.GK} players={goalyPlayers!} />
            }
          />
          <PageContainer
            boxColor={SALLWOW_BLACK}
            includedComponent={
              <PlayerBox title={Position.FW} players={forwardPlayers!} />
            }
          />
          <PageContainer
            includedComponent={
              <PlayerBox title={Position.MF} players={midfielderPlayers!} />
            }
          />
          <PageContainer
            boxColor={SALLWOW_BLACK}
            includedComponent={
              <PlayerBox title={Position.DF} players={defenderPlayers!} />
            }
          />
        </>
      )}
    </>
  );
};
export default PlayerPage;
