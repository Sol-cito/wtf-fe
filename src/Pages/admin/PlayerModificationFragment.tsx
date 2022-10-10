import { useEffect, useState } from "react";
import CustomizedPopup from "../../Components/CustomizedPopup";
import PlayerInfoInputBox from "../../Components/PlayerInfoInputBox";
import PlayerList from "../../Components/PlayerList";
import { PlayerModel, PlayerMultipartModel } from "../../Models/PlayerModel";
import { getAllPlayersAPI, modifyPlayerAPI } from "../../Service/PlayerService";
import "./PlayerRegistrationFragment.scss";

const PlayerModificationFragment = () => {
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerModel>();

  const [popupTitle, setPopupTitle] = useState<string>("");
  const [popupShow, setPopupShow] = useState<boolean>(false);

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
      setPopupTitle(
        "[Success] Player Info Modification Success!! " +
          modificationResult.name
      );
      getAllRegisteredPlayers();
    } else {
      setPopupTitle("[ERROR] 요청 실패...개발자에게 문의 ㄱㄱ");
    }
    setPopupShow(true);
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
      <CustomizedPopup
        title={popupTitle}
        show={popupShow}
        onClickOk={() => {
          setPopupShow(false);
        }}
      />
    </>
  );
};

export default PlayerModificationFragment;
