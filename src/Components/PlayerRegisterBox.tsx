import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import {
  BIRTH_REGAX,
  ENGLISH_REGAX,
  KOREAN_REGAX,
  NUMBER_REGAX,
} from "../CommonConstant/CommonConstant";
import { PlayerModel } from "../Models/PlayerModel";
import {
  getAllPlayersAPI,
  getPlayersByNameAPI,
  registerNewPlayerAPI,
} from "../Service/PlayerService";
import CustomizedInput from "./CustomizedInput";
import CustomizedSelectBox from "./CustomizedSelectBox";
import ImageUploader from "./ImageUploader";
import PlayerList from "./PlayerList";
import "./PlayerRegisterBox.scss";

const PlayerRegisterBox = () => {
  const [players, setPlayers] = useState<PlayerModel[]>([]);

  const [korName, setKorName] = useState<string>("");
  const [firstNameEng, setFirstNameEng] = useState<string>("");
  const [familyNameEng, setFamilyNameEng] = useState<string>("");
  const [birth, setBitrh] = useState<string>("");
  const [position, setPosition] = useState<string>("GK");
  const [backNo, setBackNo] = useState<number>(0);
  const [moto, setMoto] = useState<string>("");
  const [profileImageFile, setProfileImageFile] = useState<File>();

  const positions = ["GK", "FW", "MF", "DF"];

  const initState = () => {
    setKorName("");
    setFirstNameEng("");
    setFamilyNameEng("");
    setBitrh("");
    setPosition("");
    setBackNo(0);
    setMoto("");
    setProfileImageFile(undefined);
  };

  const getAllRegisteredPlayers = async () => {
    const res = await getAllPlayersAPI();
    setPlayers(res);
  };

  useEffect(() => {
    getAllRegisteredPlayers();
  }, []);

  const testKorNameRegax = (input: string) => {
    if (input && !KOREAN_REGAX.test(input)) {
      alert("[Warning] 한글 이름이 한글이 아니거나 형식이 이상함..");
      setKorName("");
      return;
    }
  };

  const handleFirstNameEngInput = (input: string) => {
    input = input.charAt(0).toUpperCase() + input.slice(1);
    setFirstNameEng(input);
  };

  const testFirstNameEngRegax = (input: string) => {
    if (input && !ENGLISH_REGAX.test(input)) {
      alert("[Warning] 영어가 아니거나 형식이 이상함..");
      setFirstNameEng("");
      return;
    }
  };

  const handleFamilyNameEngInput = (input: string) => {
    input = input.charAt(0).toUpperCase() + input.slice(1);
    setFamilyNameEng(input);
  };

  const testFamilyNameEngRegax = (input: string) => {
    if (input && !ENGLISH_REGAX.test(input)) {
      alert("[Warning] 영어가 아니거나 형식이 이상함..");
      setFamilyNameEng("");
      return;
    }
  };

  const testBirthRegax = (input: string) => {
    if (input && !BIRTH_REGAX.test(input)) {
      alert("[Warning] 생년월일이 0000-00-00 형식에 맞지 않음");
      setBitrh("");
      return;
    }
  };

  const validateRegistration = () => {
    if (!korName) {
      alert("한글 이름 입력 안됨");
      return false;
    }
    if (!firstNameEng) {
      alert("영문 이름 입력 안됨");
      return false;
    }
    if (!familyNameEng) {
      alert("영문 성 입력 안됨");
      return false;
    }
    if (!birth) {
      alert("생년월일 입력 안됨");
      return false;
    }
    if (!moto) {
      alert("좌우명 입력 안됨");
      return false;
    }
    return true;
  };

  const handlePlayerRegister = () => {
    if (!validateRegistration()) {
      return;
    }
    let confirmRes = window.confirm(
      "등록하고자 하는 선수 정보가 아래 내용이 맞습니까? \n" +
        "\n   - 한글 이름 : " +
        korName +
        "\n   - 영문 이름 : " +
        firstNameEng +
        "\n   - 영문 성 : " +
        familyNameEng +
        "\n   - 생년월일 : " +
        birth +
        "\n   - 포지션 : " +
        position +
        "\n   - 등번호 : " +
        backNo +
        "\n   - 좌우명 : " +
        moto
    );
    if (confirmRes) {
      registerPlayer();
    }
  };

  const registerPlayer = async () => {
    const playerByNameRes: PlayerModel[] = await getPlayersByNameAPI(korName);
    if (0 < playerByNameRes.length) {
      let confirmRes = window.confirm(
        "[Warning] 동일 이름으로 등록된 선수가 이미 있습니다. 그래도 등록하시겠습니까? \n"
      );
      if (!confirmRes) return;
    }

    const formData: FormData = new FormData();
    formData.append("name", korName);
    formData.append("firstNameEng", firstNameEng);
    formData.append("familyNameEng", familyNameEng);
    formData.append("birth", birth);
    formData.append("position", position);
    formData.append("backNo", String(backNo));
    formData.append("moto", moto);
    formData.append("curYn", "Y");

    if (profileImageFile) {
      formData.append("image", profileImageFile);
    }

    const registerRes: PlayerModel = await registerNewPlayerAPI(formData);
    if (registerRes) {
      alert("등록 성공! " + registerRes.name);
      getAllRegisteredPlayers();
      initState();
    } else {
      alert("[ERROR] 등록 실패...개발자에게 문의 ㄱㄱ");
    }
  };

  const handleBackNoChange = (input: string) => {
    if (NUMBER_REGAX.test(input)) {
      setBackNo(Number(input));
    }
  };

  return (
    <>
      <div className="register_info_area">
        <p className="register_title">선수 등록</p>
        <CustomizedInput
          title={"이름(한글) : "}
          value={korName}
          className={"name"}
          onBlur={testKorNameRegax}
          onChange={setKorName}
          maxLength={10}
        />
        <CustomizedInput
          title={"First Name (English) : "}
          value={firstNameEng}
          className={"first_name_eng"}
          onBlur={testFirstNameEngRegax}
          onChange={handleFirstNameEngInput}
          maxLength={15}
        />
        <CustomizedInput
          title={"Family Name (English) : "}
          value={familyNameEng}
          className={"family_name_eng"}
          onBlur={testFamilyNameEngRegax}
          onChange={handleFamilyNameEngInput}
          maxLength={15}
        />
        <CustomizedInput
          title={"생년월일(0000-00-00) : "}
          value={birth}
          className={"birth"}
          onBlur={testBirthRegax}
          onChange={setBitrh}
        />
        <CustomizedSelectBox
          title={"포지션 :"}
          value={positions}
          className={"pisition"}
          useStateFunc={setPosition}
        />
        <CustomizedInput
          title={"등번호(숫자만) : "}
          value={String(backNo)}
          className={"backNo"}
          onChange={handleBackNoChange}
          maxLength={3}
        />
        <div className="moto_area">
          <span> Moto(최대 30자) : </span>
          <textarea
            value={moto}
            className={"moto"}
            maxLength={30}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setMoto(e.target.value);
            }}
          />
        </div>
        <ImageUploader
          title="프로필 이미지 등록 (등록안하면 기본이미지로 보임): "
          setImgFile={setProfileImageFile}
          imageFile={profileImageFile}
        />
        <Button
          fullWidth={true}
          size="large"
          variant="contained"
          color="primary"
          onClick={handlePlayerRegister}
          className="register_btn"
        >
          선수 등록하기
        </Button>
      </div>
      <PlayerList players={players} />
    </>
  );
};
export default PlayerRegisterBox;
