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
import { createFormData } from "../Service/UtilityService";
import CustomizedConfirm from "./CustomizedConfirm";
import CustomizedInput from "./CustomizedInput";
import CustomizedPopup from "./CustomizedPopup";
import CustomizedSelectBox from "./CustomizedSelectBox";
import ImageUploader from "./ImageUploader";
import "./PlayerInfoInputBox.scss";

export interface PlayerInfoInputBoxProps {
  title: string;
  playerInfo?: PlayerModel;
  handlePlayerMultiPart: Function;
}

const PlayerInfoInputBox = forwardRef((props: PlayerInfoInputBoxProps, ref) => {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [confirmContents, setConfirmContents] = useState<string>("");

  const [playerId, setPlayerId] = useState<number>(-1);
  const [korName, setKorName] = useState<string>("");
  const [firstNameEng, setFirstNameEng] = useState<string>("");
  const [familyNameEng, setFamilyNameEng] = useState<string>("");
  const [birth, setBitrh] = useState<string>("");
  const [position, setPosition] = useState<string>("GK");
  const [backNo, setBackNo] = useState<number>(0);
  const [moto, setMoto] = useState<string>("");
  const [curYn, setCurYn] = useState<string>("Y");
  const [profileImageFile, setProfileImageFile] = useState<File>();

  const [popupTitle, setPopupTitle] = useState<string>("");
  const [popupContents, setPopupContents] = useState<string>("");
  const [popupShow, setPopupShow] = useState<boolean>(false);

  const [playerMultipartModel, setPlayerMultipartModel] =
    useState<PlayerMultipartModel>();

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
    setCurYn(props.playerInfo.curYn);
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
      setPopupTitle("[Error] 한글 이름 입력값 확인");
      setPopupContents("한글 이름이 한글이 아니거나 형식이 이상함..");
      setPopupShow(true);
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
      setPopupTitle("[Error] First name 입력값 확인");
      setPopupContents("영어가 아니거나 형식이 이상함..");
      setPopupShow(true);
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
      setPopupTitle("[Error] Family name 입력값 확인");
      setPopupContents("영어가 아니거나 형식이 이상함..");
      setPopupShow(true);
      setFamilyNameEng("");
      return;
    }
  };

  const testBirthRegax = (input: string) => {
    if (input && !BIRTH_REGAX.test(input)) {
      setPopupTitle("[Error] 생년월일 입력값 확인");
      setPopupContents("생년월일이 0000-00-00 형식에 맞지 않음");
      setPopupShow(true);
      setBitrh("");
      return;
    }
  };

  const handleBackNoChange = (input: string) => {
    if (NUMBER_REGAX.test(input)) {
      setBackNo(Number(input));
    }
  };

  const validatePlayerInputData = (player: PlayerModel) => {
    for (let res of Object.entries(player)) {
      let key: string = res[0];
      let value: string = res[1];
      if (value.length == 0) {
        setPopupTitle("[Error] 필수값 미입력");
        setPopupContents(key + " 입력되지 않음");
        setPopupShow(true);
        return false;
      }
    }
    return true;
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
      curYn: curYn,
    };
    if (!validatePlayerInputData(player)) return;

    const inputRes: PlayerMultipartModel = {
      player: player,
      profileImageFile: profileImageFile,
    };
    setPlayerMultipartModel(inputRes);
    setConfirmContents(
      "- 한글 이름 : " +
        inputRes.player.name +
        "\n- 영문 이름 : " +
        inputRes.player.firstNameEng +
        "\n- 영문 성 : " +
        inputRes.player.familyNameEng +
        "\n- 생년월일 : " +
        inputRes.player.birth +
        "\n- 포지션 : " +
        inputRes.player.position +
        "\n- 등번호 : " +
        inputRes.player.backNo +
        "\n- 좌우명 : " +
        inputRes.player.moto +
        "\n- 현재 활동 여부 : " +
        inputRes.player.curYn
    );
    setShowConfirm(true);
  };

  const handleOnConfirm = async () => {
    let map: Map<string, string | Blob> = new Map<string, string | Blob>();
    map.set("id", String(playerMultipartModel!.player.id));
    map.set("name", playerMultipartModel!.player.name);
    map.set("firstNameEng", playerMultipartModel!.player.firstNameEng);
    map.set("familyNameEng", playerMultipartModel!.player.familyNameEng);
    map.set("birth", playerMultipartModel!.player.birth);
    map.set("position", playerMultipartModel!.player.position);
    map.set("backNo", String(playerMultipartModel!.player.backNo));
    map.set("moto", playerMultipartModel!.player.moto);
    map.set("curYn", playerMultipartModel!.player.curYn);
    if (playerMultipartModel!.profileImageFile) {
      map.set("image", playerMultipartModel!.profileImageFile);
    }

    const formData: FormData = createFormData(map);
    await props.handlePlayerMultiPart(playerMultipartModel!.player, formData);
    setShowConfirm(false);
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
        <CustomizedSelectBox
          title={"현재활동여부"}
          value={curYn}
          options={["Y", "N"]}
          className={"curYn"}
          useStateFunc={setCurYn}
        />
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
        <CustomizedConfirm
          show={showConfirm}
          confirmQuestion={"입력한 선수 정보를 한번 더 확인해주세용."}
          contents={confirmContents}
          onClickConfirm={handleOnConfirm}
          onClickCancel={() => {
            setShowConfirm(false);
          }}
        />
        <CustomizedPopup
          title={popupTitle}
          show={popupShow}
          contents={popupContents}
          onClickOk={() => {
            setPopupShow(false);
          }}
        />
      </div>
    </>
  );
});
export default PlayerInfoInputBox;
