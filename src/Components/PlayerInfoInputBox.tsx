import { Button } from "@material-ui/core";
import moment from "moment";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import {
  DATE_REGAX,
  ENGLISH_REGAX,
  KOREAN_REGAX,
  NUMBER_REGAX,
} from "../CommonConstant/CommonConstant";
import { PlayerModel, PlayerMultipartModel } from "../Models/PlayerModel";
import {
  createFormData,
  getImageFileNameWithExtension,
} from "../Service/UtilityService";
import CustomizedConfirm from "./CustomizedConfirm";
import CustomizedInput from "./CustomizedInput";
import CustomizedPopup from "./CustomizedPopup";
import CustomizedSelectBox, { CustomizedOptions } from "./CustomizedSelectBox";
import ImageUploader from "./ImageUploader";
import "./CommonInfoInputBox.scss";
import WaitingBackground from "./WaitingBackground";

export interface PlayerInfoInputBoxProps {
  title: string;
  playerInfo?: PlayerModel;
  handlePlayerMultiPart: Function;
}

const PlayerInfoInputBox = forwardRef((props: PlayerInfoInputBoxProps, ref) => {
  const deleteImageRef: React.Ref<any> = useRef({});

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
  const [profileImgSrc, setProfileImgSrc] = useState<string>();
  const [profileImgFile, setProfileImgFile] = useState<File>();
  const [profileTorsoImgSrc, setProfileTorsoImgSrc] = useState<string>();
  const [profileTorsoImgFile, setProfileTorsoImgFile] = useState<File>();

  const [popupTitle, setPopupTitle] = useState<string>("");
  const [popupContents, setPopupContents] = useState<string>("");
  const [popupShow, setPopupShow] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [playerMultipartModel, setPlayerMultipartModel] =
    useState<PlayerMultipartModel>();

  const positionOptions: CustomizedOptions[] = [
    { value: "GK" },
    { value: "FW" },
    { value: "MF" },
    { value: "DF" },
  ];

  const curYnOptions: CustomizedOptions[] = [{ value: "Y" }, { value: "N" }];

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
    setProfileImgSrc(props.playerInfo.profileImgSrc);
    setProfileTorsoImgSrc(props.playerInfo.profileTorsoImgSrc);
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
    setProfileImgSrc("");
    setProfileImgFile(undefined);
    setProfileTorsoImgSrc("");
    setProfileTorsoImgFile(undefined);
    deleteImageRef.current.handleDeleteImage();
  };

  useImperativeHandle(ref, () => ({
    initState,
  }));

  const testKorNameRegax = (input: string) => {
    if (input && !KOREAN_REGAX.test(input)) {
      setPopupTitle("[Error] ?????? ?????? ????????? ??????");
      setPopupContents("?????? ????????? ????????? ???????????? ????????? ?????????..");
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
      setPopupTitle("[Error] First name ????????? ??????");
      setPopupContents("????????? ???????????? ????????? ?????????..");
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
      setPopupTitle("[Error] Family name ????????? ??????");
      setPopupContents("????????? ???????????? ????????? ?????????..");
      setPopupShow(true);
      setFamilyNameEng("");
      return;
    }
  };

  const testBirthRegax = (input: string) => {
    if (input && !DATE_REGAX.test(input)) {
      setPopupTitle("[Error] ???????????? ????????? ??????");
      setPopupContents("??????????????? 0000-00-00 ????????? ?????? ??????");
      setPopupShow(true);
      setBitrh("");
      return;
    }
  };

  const handleBackNoChange = (input: string) => {
    if (isNaN(Number(input))) {
      return;
    }
    if (NUMBER_REGAX.test(input)) {
      setBackNo(Number(input));
    }
  };

  const validatePlayerInputData = (player: PlayerModel) => {
    for (let res of Object.entries(player)) {
      let key: string = res[0];
      let value: string = res[1];

      if (key === "profileImgSrc" || key === "profileTorsoImgSrc") continue;

      if (!value || value.length == 0) {
        setPopupTitle("[Error] ????????? ?????????");
        setPopupContents(key + " ???????????? ??????");
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
      profileImgSrc: profileImgSrc,
      profileTorsoImgSrc: profileTorsoImgSrc,
      curYn: curYn,
    };
    if (!validatePlayerInputData(player)) return;

    const inputRes: PlayerMultipartModel = {
      player: player,
      profileImgFile: profileImgFile,
      profileTorsoImgFile: profileTorsoImgFile,
    };

    setPlayerMultipartModel(inputRes);
    setConfirmContents(
      "- ?????? ?????? : " +
        inputRes.player.name +
        "\n- ?????? ?????? : " +
        inputRes.player.firstNameEng +
        "\n- ?????? ??? : " +
        inputRes.player.familyNameEng +
        "\n- ???????????? : " +
        inputRes.player.birth +
        "\n- ????????? : " +
        inputRes.player.position +
        "\n- ????????? : " +
        inputRes.player.backNo +
        "\n- ????????? : " +
        inputRes.player.moto +
        "\n- ?????? ?????? ?????? : " +
        inputRes.player.curYn +
        "\n- ??????????????? : " +
        (profileImgFile
          ? profileImgFile.name
          : getImageFileNameWithExtension(profileImgSrc) || "????????? ??????") +
        "\n- ????????? ?????? : " +
        (profileTorsoImgFile
          ? profileTorsoImgFile.name
          : getImageFileNameWithExtension(profileTorsoImgSrc) || "????????? ??????")
    );
    setShowConfirm(true);
  };

  const handleOnConfirm = async () => {
    setShowConfirm(false);
    setIsLoading(true);

    const formData: FormData = new FormData();

    formData.append("id", String(playerMultipartModel!.player.id));
    formData.append("name", playerMultipartModel!.player.name);
    formData.append("firstNameEng", playerMultipartModel!.player.firstNameEng);
    formData.append(
      "familyNameEng",
      playerMultipartModel!.player.familyNameEng
    );
    formData.append("birth", playerMultipartModel!.player.birth);
    formData.append("position", playerMultipartModel!.player.position);
    formData.append("backNo", String(playerMultipartModel!.player.backNo));
    formData.append("moto", playerMultipartModel!.player.moto);
    formData.append("curYn", playerMultipartModel!.player.curYn);
    formData.append(
      "profileImgSrc",
      playerMultipartModel!.player.profileImgSrc || ""
    );
    formData.append(
      "image",
      playerMultipartModel!.profileImgFile || new Blob()
    );

    formData.append(
      "profileTorsoImgSrc",
      playerMultipartModel!.player.profileTorsoImgSrc || ""
    );
    formData.append(
      "image",
      playerMultipartModel!.profileTorsoImgFile || new Blob()
    );

    await props.handlePlayerMultiPart(playerMultipartModel!.player, formData);
    setIsLoading(false);
  };

  return (
    <>
      <div className="info_area">
        <p className="title">{props.title}</p>
        <CustomizedInput
          title={"??????(??????) : "}
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
          title={"????????????(0000-00-00) : "}
          value={birth}
          className={"birth"}
          onBlur={testBirthRegax}
          onChange={setBitrh}
        />
        <CustomizedSelectBox
          title={"????????? :"}
          defaultValue={position}
          options={positionOptions}
          className={"pisition"}
          useStateFuncForValue={setPosition}
        />
        <CustomizedInput
          title={"?????????(?????????) : "}
          value={String(backNo)}
          className={"backNo"}
          onChange={handleBackNoChange}
          maxLength={3}
        />
        <div className="moto_area">
          <span> Moto(?????? 30???) : </span>
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
          title={"??????????????????"}
          defaultValue={curYn}
          options={curYnOptions}
          className={"curYn"}
          useStateFuncForValue={setCurYn}
        />
        <ImageUploader
          fileInputId="profile_img"
          title="????????? ?????????(?????? ??????-?????? ??????): "
          initialImageSrc={profileImgSrc}
          setInitialImageSrc={setProfileImgSrc}
          imageFile={profileImgFile}
          setImgFile={setProfileImgFile}
          ref={deleteImageRef}
        />
        <ImageUploader
          fileInputId="profile_torso_img"
          title="?????? ?????????(???????????????-?????? ??????): "
          initialImageSrc={profileTorsoImgSrc}
          setInitialImageSrc={setProfileTorsoImgSrc}
          imageFile={profileTorsoImgFile}
          setImgFile={setProfileTorsoImgFile}
          ref={deleteImageRef}
        />
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={handleBtnOnClick}
          className="btn"
        >
          {props.title}
        </Button>
        <CustomizedConfirm
          show={showConfirm}
          confirmQuestion={"????????? ?????? ????????? ?????? ??? ??????????????????."}
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
      {isLoading ? <WaitingBackground /> : null}
    </>
  );
});
export default PlayerInfoInputBox;
