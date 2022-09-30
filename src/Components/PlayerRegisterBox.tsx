import { useEffect, useState } from "react";
import {
  BIRTH_REGAX,
  ENGLISH_REGAX,
  KOREAN_REGAX,
  NUMBER_REGAX,
} from "../CommonConstant/CommonConstant";
import { PlayerModel } from "../Models/PlayerModel";
import {
  getAllPlayersService,
  registerNewPlayer,
} from "../Service/PlayerService";
import PlayerList from "./PlayerList";
import "./PlayerRegisterBox.scss";
import SelectBox from "./SelectBox";

const PlayerRegisterBox = () => {
  const [players, setPlayers] = useState<PlayerModel[]>([]);

  const [korName, setKorName] = useState<string>("");
  const [fistNameEng, setFirstNameEng] = useState<string>("");
  const [familyNameEng, setFamilyNameEng] = useState<string>("");
  const [birth, setBitrh] = useState<string>("");
  const [position, setPosition] = useState<string>("GK");
  const [backNo, setBackNo] = useState<number>(0);
  const [moto, setMoto] = useState<string>("");

  const positions = ["GK", "FW", "MF", "DF"];

  const getAllRegisteredPlayers = async () => {
    const res = await getAllPlayersService();
    setPlayers(res);
  };

  useEffect(() => {
    getAllRegisteredPlayers();
  }, []);

  const validateRegistration = () => {
    if (!korName) {
      alert("한글 이름 입력 안됨");
      return false;
    }
    if (!fistNameEng) {
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
        fistNameEng +
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
    const playerModel: PlayerModel = {
      name: korName,
      firstNameEng: fistNameEng,
      familyNameEng: familyNameEng,
      birth: birth,
      position: position,
      backNo: backNo,
      moto: moto,
      profileImgSrc: "",
      curYn: "Y",
    };
    await registerNewPlayer(playerModel);
  };

  const testKorNameRegax = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && !KOREAN_REGAX.test(e.target.value)) {
      alert("[Warning] 한글 이름이 한글이 아니거나 형식이 이상함..");
      setKorName("");
      return;
    }
  };

  const testEngNameRegax = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: Function
  ) => {
    if (e.target.value && !ENGLISH_REGAX.test(e.target.value)) {
      alert("[Warning] 영어가 아니거나 형식이 이상함..");
      setState("");
      return;
    }
  };

  const testBirthRegax = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && !BIRTH_REGAX.test(e.target.value)) {
      alert("[Warning] 생년월일이 0000-00-00 형식에 맞지 않음");
      setBitrh("");
      return;
    }
  };

  const handleBackNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (NUMBER_REGAX.test(e.target.value)) {
      setBackNo(Number(e.target.value));
    }
  };

  return (
    <>
      <div className="register_info_area">
        선수 등록
        <p>
          <span>이름(한글) : </span>
          <input
            value={korName}
            onBlur={testKorNameRegax}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setKorName(e.target.value)
            }
            maxLength={10}
          />
        </p>
        <p>
          <span>First Name (English) : </span>
          <input
            value={fistNameEng}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
              testEngNameRegax(e, setFirstNameEng)
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFirstNameEng(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              )
            }
            maxLength={15}
          />
        </p>
        <p>
          <span>Family Name (English) : </span>
          <input
            value={familyNameEng}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
              testEngNameRegax(e, setFamilyNameEng)
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFamilyNameEng(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              )
            }
            maxLength={15}
          />
        </p>
        <p>
          <span>생년월일(0000-00-00) : </span>
          <input
            value={birth}
            onBlur={testBirthRegax}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBitrh(e.target.value)
            }
          />
        </p>
        <p>
          <span>포지션 : </span>
          <SelectBox value={positions} useStateFunc={setPosition} />
        </p>
        <p>
          <span>등번호(숫자만 입력가능) : </span>
          <input value={backNo} onChange={handleBackNoChange} maxLength={3} />
        </p>
        <p>
          <span>좌우명(최대 30자) : </span>
          <textarea
            maxLength={30}
            value={moto}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setMoto(e.target.value)
            }
          />
        </p>
        <button onClick={handlePlayerRegister} className="register_btn">
          선수 등록하기
        </button>
      </div>
      <PlayerList players={players} />
    </>
  );
};
export default PlayerRegisterBox;
