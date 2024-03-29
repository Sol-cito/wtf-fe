import { useEffect, useState } from "react";
import CustomizedPopup from "../../Components/CustomizedPopup";
import PlayerInfoInputBox from "../../Components/PlayerInfoInputBox";
import PlayerList from "../../Components/PlayerList";
import WaitingBackground from "../../Components/WaitingBackground";
import { SortModel } from "../../Models/CommonModel";
import { OrderSortKeyword } from "../../Models/Enum/CommonEnum";
import { PlayerModel } from "../../Models/PlayerModel";
import { getAllPlayersAPI, modifyPlayerAPI } from "../../Service/PlayerService";
import "./PlayerRegistrationFragment.scss";

const PlayerModificationFragment = () => {
  const [players, setPlayers] = useState<PlayerModel[]>();
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerModel>();

  const [popupTitle, setPopupTitle] = useState<string>("");
  const [popupShow, setPopupShow] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAllRegisteredPlayers = async () => {
    setIsLoading(true);
    const sortParam: SortModel = {
      columnName: "name",
      sortDirection: OrderSortKeyword.ASC,
    };
    const res: PlayerModel[] = await getAllPlayersAPI(sortParam);
    if (res) {
      setPlayers(res);
      if (!selectedPlayer) {
        setSelectedPlayer(res[0]);
      }
    }
    setIsLoading(false);
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
      {players && players.length > 0 ? (
        <PlayerInfoInputBox
          title={"선수 정보 수정"}
          handlePlayerMultiPart={handlePlayerMultiPart}
          playerInfo={selectedPlayer}
        />
      ) : null}
      <PlayerList
        players={players}
        title={"< 현재 등록된 선수 명단 >"}
        initialSelectedRadioId={selectedPlayer?.id}
        isRadioButtonVisible={true}
        setSelectedPlayer={setSelectedPlayer}
      />
      {isLoading ? <WaitingBackground /> : null}
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
