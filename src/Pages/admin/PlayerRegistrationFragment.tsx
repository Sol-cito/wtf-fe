import { useEffect, useRef, useState } from "react";
import CustomizedPopup from "../../Components/CustomizedPopup";
import PlayerInfoInputBox from "../../Components/PlayerInfoInputBox";
import PlayerList from "../../Components/PlayerList";
import WaitingBackground from "../../Components/WaitingBackground";
import { SortModel } from "../../Models/CommonModel";
import { OrderSortKeyword } from "../../Models/Enum/CommonEnum";
import { PlayerModel } from "../../Models/PlayerModel";
import {
  getAllPlayersAPI,
  getPlayersByNameAPI,
  registerNewPlayerAPI,
} from "../../Service/PlayerService";
import "./PlayerRegistrationFragment.scss";

const PlayerRegistrationFragment = () => {
  const [players, setPlayers] = useState<PlayerModel[]>();
  const initStateRef: React.Ref<any> = useRef({});

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
    if (res) setPlayers(res);
    setIsLoading(false);
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

  const handlePlayerMultiPart = async (
    palyer: PlayerModel,
    formData: FormData
  ) => {
    const validateRes = await validateDuplicatePlayerName(palyer.name);
    if (!validateRes) return;
    const registrationResult: PlayerModel = await registerNewPlayerAPI(
      formData
    );
    if (registrationResult) {
      setPopupTitle(
        "[Success] Player Registration Success!! " + registrationResult.name
      );
      getAllRegisteredPlayers();
      initStateRef.current.initState();
    } else {
      setPopupTitle("[ERROR] 요청 실패...개발자에게 문의 ㄱㄱ");
    }
    setPopupShow(true);
  };

  return (
    <>
      <PlayerInfoInputBox
        title={"선수 등록"}
        handlePlayerMultiPart={handlePlayerMultiPart}
        ref={initStateRef}
      />
      <PlayerList players={players} title={"< 현재 등록된 선수 명단 >"} />
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

export default PlayerRegistrationFragment;
