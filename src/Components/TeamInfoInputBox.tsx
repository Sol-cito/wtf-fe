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
import "./CommonInfoInputBox.scss";
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
  const [teamLogoSrc, setTeamLogoSrc] = useState<string>();
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
    setTeamLogoSrc("");
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
        setPopupTitle("[Error] ????????? ?????????");
        setPopupContents(key + " ???????????? ??????");
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
      "- ?????? : " +
        inputRes.team.name +
        "\n- ????????? : " +
        inputRes.team.hometown +
        "\n- ???????????? : " +
        (teamLogoImgFile
          ? teamLogoImgFile.name
          : getImageFileNameWithExtension(teamLogoSrc) || "????????? ??????")
    );
    setShowConfirm(true);
  };

  const handleOnConfirm = async () => {
    setShowConfirm(false);
    setIsLoading(true);

    const formData: FormData = new FormData();

    formData.append("id", String(teamMultipartModel!.team.id));
    formData.append("name", teamMultipartModel!.team.name);
    formData.append("hometown", teamMultipartModel!.team.hometown || "");
    formData.append("teamLogoSrc", teamMultipartModel!.team.teamLogoSrc || "");
    formData.append("image", teamLogoImgFile || new Blob());
    await props.handleTeamMultiPart(formData);
    setIsLoading(false);
  };

  return (
    <>
      <div className="info_area">
        <p className="title">{props.title}</p>
        <CustomizedInput
          title={"?????? : "}
          value={name}
          className={"name"}
          onChange={setName}
          maxLength={10}
          placeHolder={"???????????? 10???"}
        />
        <CustomizedInput
          title={"????????? : "}
          value={hometown}
          className={"first_name_eng"}
          onChange={setHometown}
          maxLength={15}
          placeHolder={"???????????? 15???"}
        />
        <ImageUploader
          fileInputId="profile_img"
          title="??? ??????(?????? ??????): "
          initialImageSrc={teamLogoSrc}
          setInitialImageSrc={setTeamLogoSrc}
          imageFile={teamLogoImgFile}
          setImgFile={setTeamLogoImgFile}
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
          confirmQuestion={"????????? ??? ????????? ?????? ??? ??????????????????."}
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
