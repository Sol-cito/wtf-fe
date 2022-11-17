import { Button } from "@material-ui/core";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { TeamModel, TeamMultipartModel } from "../Models/TeamModel";
import { getImageFileNameWithExtension } from "../Service/UtilityService";
import CustomizedConfirm from "./CustomizedConfirm";
import CustomizedInput from "./CustomizedInput";
import CustomizedPopup from "./CustomizedPopup";
import ImageUploader from "./ImageUploader";
import "./PlayerInfoInputBox.scss";
import WaitingBackground from "./WaitingBackground";

export interface TeamInfoInputBoxProps {
  title: string;
  teamInfo?: TeamModel;
  handleTeamMultiPart: Function;
}

const TeamInfoInputBox = forwardRef((props: TeamInfoInputBoxProps, ref) => {
  const deleteImageRef: React.Ref<any> = useRef({});

  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [confirmContents, setConfirmContents] = useState<string>("");

  const [teamId, setTeamId] = useState<number>(-1);
  const [name, setName] = useState<string>("");
  const [hometown, setHometown] = useState<string>("");
  const [teamLogoSrc, setteamLogoSrc] = useState<string>();
  const [teamLogoImgFile, setTeamLogoImgFile] = useState<File>();

  const [teamMultipartModel, setTeamMultipartModel] =
    useState<TeamMultipartModel>();

  const [popupTitle, setPopupTitle] = useState<string>("");
  const [popupContents, setPopupContents] = useState<string>("");
  const [popupShow, setPopupShow] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!props.teamInfo) return;
    setTeamId(props.teamInfo.id);
    setName(props.teamInfo.name);
    setHometown(props.teamInfo.hometown || "");
  }, [props.teamInfo]);

  const initState = () => {
    setTeamId(-1);
    setName("");
    setHometown("");
    setteamLogoSrc("");
    setTeamLogoImgFile(undefined);
    deleteImageRef.current.handleDeleteImage();
  };

  useImperativeHandle(ref, () => ({
    initState,
  }));

  const validateTeamInputData = (team: TeamModel) => {
    for (let res of Object.entries(team)) {
      let key: string = res[0];
      let value: string = res[1];

      if (key === "teamLogoSrc") continue;

      if (!value || value.length == 0) {
        setPopupTitle("[Error] 필수값 미입력");
        setPopupContents(key + " 입력되지 않음");
        setPopupShow(true);
        return false;
      }
    }
    return true;
  };

  const handleBtnOnClick = () => {
    const team: TeamModel = {
      id: teamId,
      name: name,
      hometown: hometown,
      teamLogoSrc: teamLogoSrc,
    };
    if (!validateTeamInputData(team)) return;

    const inputRes: TeamMultipartModel = {
      team: team,
      teamImageFile: teamLogoImgFile,
    };

    setTeamMultipartModel(inputRes);
    setConfirmContents(
      "- 팀명 : " +
        inputRes.team.name +
        "\n- 연고지 : " +
        inputRes.team.hometown +
        "\n- 프로필사진 : " +
        (teamLogoImgFile
          ? teamLogoImgFile.name
          : getImageFileNameWithExtension(teamLogoSrc) || "이미지 없음")
    );
    setShowConfirm(true);
  };

  const handleOnConfirm = async () => {
    setShowConfirm(false);
    setIsLoading(true);

    const formData: FormData = new FormData();

    formData.append("id", String(teamMultipartModel!.team.id));
    formData.append("name", teamMultipartModel!.team.name);
    formData.append("honetown", teamMultipartModel!.team.hometown || "");
    formData.append("teamLogoSrc", teamMultipartModel!.team.teamLogoSrc || "");
    await props.handleTeamMultiPart(teamMultipartModel!.team, formData);
    setIsLoading(false);
  };

  return (
    <>
      <div className="register_info_area">
        <p className="register_title">{props.title}</p>
        <CustomizedInput
          title={"팀명 : "}
          value={name}
          className={"name"}
          onChange={setName}
          maxLength={10}
          placeHolder={"최대길이 10자"}
        />
        <CustomizedInput
          title={"연고지 : "}
          value={hometown}
          className={"first_name_eng"}
          onChange={setHometown}
          maxLength={15}
          placeHolder={"최대길이 15자"}
        />
        <ImageUploader
          fileInputId="profile_img"
          title="팀 로고(필수 아님): "
          initialImageSrc={teamLogoSrc}
          setInitialImageSrc={setteamLogoSrc}
          imageFile={teamLogoImgFile}
          setImgFile={setTeamLogoImgFile}
          ref={deleteImageRef}
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
          confirmQuestion={"입력한 팀 정보를 한번 더 확인해주세용."}
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
export default TeamInfoInputBox;
