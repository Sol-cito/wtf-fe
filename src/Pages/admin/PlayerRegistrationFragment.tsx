import { useEffect, useRef, useState } from "react";
import CustomizedConfirm from "../../Components/CustomizedConfirm";
import PlayerInfoInputBox from "../../Components/PlayerInfoInputBox";
import PlayerList from "../../Components/PlayerList";
import { PlayerModel, PlayerMultipartModel } from "../../Models/PlayerModel";
import {
  getAllPlayersAPI,
  getPlayersByNameAPI,
  registerNewPlayerAPI,
} from "../../Service/PlayerService";
import {
  createFormData,
  validatePlayerInputData,
} from "../../Service/UtilityService";
import "./PlayerRegistrationFragment.scss";

const PlayerRegistrationFragment = () => {
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [playerMultipartModel, setPlayerMultipartModel] =
    useState<PlayerMultipartModel>();

  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [confirmContents, setConfirmContents] = useState<string>("");

  const initStateRef: React.Ref<any> = useRef({});

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

  const handleRegistrationOnClick = async (
    playerMultipartModel: PlayerMultipartModel
  ) => {
    if (!validatePlayerInputData(playerMultipartModel.player)) return;
    if (!(await validateDuplicatePlayerName(playerMultipartModel.player.name)))
      return;
    setPlayerMultipartModel(playerMultipartModel);
    setConfirmContents(
      "- 한글 이름 : " +
        playerMultipartModel.player.name +
        "\n- 영문 이름 : " +
        playerMultipartModel.player.firstNameEng +
        "\n- 영문 성 : " +
        playerMultipartModel.player.familyNameEng +
        "\n- 생년월일 : " +
        playerMultipartModel.player.birth +
        "\n- 포지션 : " +
        playerMultipartModel.player.position +
        "\n- 등번호 : " +
        playerMultipartModel.player.backNo +
        "\n- 좌우명 : " +
        playerMultipartModel.player.moto
    );
    setShowConfirm(true);
  };

  const handleOnConfirm = async () => {
    let map: Map<string, string | Blob> = new Map<string, string | Blob>();
    map.set("name", playerMultipartModel!.player.name);
    map.set("firstNameEng", playerMultipartModel!.player.firstNameEng);
    map.set("familyNameEng", playerMultipartModel!.player.familyNameEng);
    map.set("birth", playerMultipartModel!.player.birth);
    map.set("position", playerMultipartModel!.player.position);
    map.set("backNo", String(playerMultipartModel!.player.backNo));
    map.set("moto", playerMultipartModel!.player.moto);
    map.set("curYn", "Y");
    if (playerMultipartModel!.profileImageFile) {
      map.set("image", playerMultipartModel!.profileImageFile);
    }

    const formData: FormData = createFormData(map);
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
    setShowConfirm(false);
  };

  return (
    <>
      <PlayerList players={players} title={"< 현재 등록된 선수 명단 >"} />
      <PlayerInfoInputBox
        title={"선수 등록"}
        handleOnClick={handleRegistrationOnClick}
        ref={initStateRef}
      />
      <CustomizedConfirm
        show={showConfirm}
        confirmQuestion={"입력한 선수 정보를 한번 더 확인해주세용."}
        contents={confirmContents}
        onClickConfirm={handleOnConfirm}
        onClickCancel={() => {
          setShowConfirm(false);
        }}
      />
    </>
  );
};

export default PlayerRegistrationFragment;
