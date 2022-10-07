import { Button } from "@material-ui/core";
import moment from "moment";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
  BIRTH_REGAX,
  ENGLISH_REGAX,
  KOREAN_REGAX,
  NUMBER_REGAX,
} from "../CommonConstant/CommonConstant";
import { PlayerModel, PlayerMultipartModel } from "../Models/PlayerModel";
import CustomizedInput from "./CustomizedInput";
import CustomizedSelectBox from "./CustomizedSelectBox";
import ImageUploader from "./ImageUploader";
import "./PlayerInfoInputBox.scss";

export interface PlayerInfoInputBoxProps {
  title: string;
  playerInfo?: PlayerModel;
  handleOnClick: Function;
}

const PlayerInfoInputBox = forwardRef((props: PlayerInfoInputBoxProps, ref) => {
  const [playerId, setPlayerId] = useState<number>(-1);
  const [korName, setKorName] = useState<string>("");
  const [firstNameEng, setFirstNameEng] = useState<string>("");
  const [familyNameEng, setFamilyNameEng] = useState<string>("");
  const [birth, setBitrh] = useState<string>("");
  const [position, setPosition] = useState<string>("GK");
  const [backNo, setBackNo] = useState<number>(0);
  const [moto, setMoto] = useState<string>("");
  const [profileImageFile, setProfileImageFile] = useState<File>();

  const allPositions: string[] = ["GK", "FW", "MF", "DF"];

  useEffect(() => {
    if (!props.playerInfo) return;
    setPlayerId(props.playerInfo.id);
    setKorName(props.playerInfo.name);
    setFirstNameEng(props.playerInfo.firstNameEng);
    setFamilyNameEng(props.playerInfo.familyNameEng);
    setBitrh(moment(props.playerInfo.birth).format("YYYY-MM-DD"));
    setPosition(props.playerInfo.position);
    setBackNo(props.playerInfo.backNo);
    setMoto(props.playerInfo.moto);
  }, [props.playerInfo]);

  const initState = () => {
    setPlayerId(-1);
    setKorName("");
    setFirstNameEng("");
    setFamilyNameEng("");
    setBitrh("");
    setPosition("GK");
    setBackNo(0);
    setMoto("");
    setProfileImageFile(undefined);
  };

  useImperativeHandle(ref, () => ({
    initState,
  }));

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

  const handleBackNoChange = (input: string) => {
    if (NUMBER_REGAX.test(input)) {
      setBackNo(Number(input));
    }
  };

  const handleBtnOnClick = () => {
    const player: PlayerModel = {
      id: playerId,
      name: korName,
      firstNameEng: firstNameEng,
      familyNameEng: familyNameEng,
      birth: birth,
      position: position,
      backNo: backNo,
      moto: moto,
    };
    const inputRes: PlayerMultipartModel = {
      player: player,
      profileImageFile: profileImageFile,
    };
    props.handleOnClick(inputRes);
  };

  return (
    <>
      <div className="register_info_area">
        <p className="register_title">{props.title}</p>
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
          value={position}
          options={allPositions}
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
          title="프로필 이미지(업로드 안하면 기본이미지로 보임): "
          setImgFile={setProfileImageFile}
          imageFile={profileImageFile}
        />
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={handleBtnOnClick}
          className="register_btn"
        >
          {props.title}
        </Button>
      </div>
    </>
  );
});
export default PlayerInfoInputBox;
