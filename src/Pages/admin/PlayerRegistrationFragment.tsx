import { useEffect, useRef, useState } from "react";
import PlayerInfoInputBox from "../../Components/PlayerInfoInputBox";
import PlayerList from "../../Components/PlayerList";
import { PlayerModel, PlayerMultipartModel } from "../../Models/PlayerModel";
import {
  getAllPlayersAPI,
  getPlayersByNameAPI,
  registerNewPlayerAPI,
} from "../../Service/PlayerService";
import "./PlayerRegistrationFragment.scss";

const PlayerRegistrationFragment = () => {
  const [players, setPlayers] = useState<PlayerModel[]>([]);

  const initStateRef: React.Ref<any> = useRef({});

  const getAllRegisteredPlayers = async () => {
    const res = await getAllPlayersAPI();
    setPlayers(res);
  };

  useEffect(() => {
    getAllRegisteredPlayers();
  }, []);

  const validateInputData = (player: PlayerModel) => {
    for (let res of Object.entries(player)) {
      let key: string = res[0];
      let value: string = res[1];
      if (value.length == 0) {
        alert("[Warning] " + key + " 입력되지 않음");
        return false;
      }
    }
    return true;
  };

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

  const handleRegistrationOnClick = async (
    playerMultipartModel: PlayerMultipartModel
  ) => {
    if (!validateInputData(playerMultipartModel.player)) return;
    if (!(await validateDuplicatePlayerName(playerMultipartModel.player.name)))
      return;

    let confirmRes = window.confirm(
      "기입하고자 하는 선수 정보가 아래 내용이 맞습니까? \n" +
        "\n   - 한글 이름 : " +
        playerMultipartModel.player.name +
        "\n   - 영문 이름 : " +
        playerMultipartModel.player.firstNameEng +
        "\n   - 영문 성 : " +
        playerMultipartModel.player.familyNameEng +
        "\n   - 생년월일 : " +
        playerMultipartModel.player.birth +
        "\n   - 포지션 : " +
        playerMultipartModel.player.position +
        "\n   - 등번호 : " +
        playerMultipartModel.player.backNo +
        "\n   - 좌우명 : " +
        playerMultipartModel.player.moto
    );
    if (!confirmRes) return;
    const formData: FormData = new FormData();
    if (playerMultipartModel.player.id > -1) {
      formData.append("id", String(playerMultipartModel.player.id));
    }
    formData.append("name", playerMultipartModel.player.name);
    formData.append("firstNameEng", playerMultipartModel.player.firstNameEng);
    formData.append("familyNameEng", playerMultipartModel.player.familyNameEng);
    formData.append("birth", playerMultipartModel.player.birth);
    formData.append("position", playerMultipartModel.player.position);
    formData.append("backNo", String(playerMultipartModel.player.backNo));
    formData.append("moto", playerMultipartModel.player.moto);
    formData.append("curYn", "Y");

    if (playerMultipartModel.player.profileImgSrc) {
      formData.append("image", playerMultipartModel.player.profileImgSrc);
    }

    const registrationResult: PlayerModel = await registerNewPlayerAPI(
      formData
    );
    if (registrationResult) {
      alert("Success!! " + registrationResult.name);
      getAllRegisteredPlayers();
      initStateRef.current.initState();
    } else {
      alert("[ERROR] 요청 실패...개발자에게 문의 ㄱㄱ");
    }
  };

  return (
    <>
      <PlayerList players={players} title={"< 현재 등록된 선수 명단 >"} />
      <PlayerInfoInputBox
        title={"선수 등록"}
        handleOnClick={handleRegistrationOnClick}
        ref={initStateRef}
      />
    </>
  );
};

export default PlayerRegistrationFragment;
