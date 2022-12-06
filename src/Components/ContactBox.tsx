import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { InquiryCategories } from "../Models/Enum/CommonEnum";
import "./ContactBox.scss";
import CustomizedInput from "./CustomizedInput";
import CustomizedSelectBox, { CustomizedOptions } from "./CustomizedSelectBox";
import CustomizedTextArea from "./CustomizedTextArea";
import CustomizedConfirm from "./CustomizedConfirm";
import { sendInquiryAPI } from "../Service/InquiryService";
import { InquiryModel } from "../Models/InquiryModel";
import CustomizedPopup from "./CustomizedPopup";
import { EMAIL_REGAX } from "../CommonConstant/CommonConstant";
import WaitingBackground from "./WaitingBackground";

const ContactBox = () => {
  const selectBoxOptions: CustomizedOptions[] = [
    { value: InquiryCategories.MATCH },
    { value: InquiryCategories.BUG_REPORT },
    { value: InquiryCategories.ETC },
  ];

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [confirmContents, setConfirmContents] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [inquiryCategory, setInquiryCategory] = useState<string>(
    selectBoxOptions[0].value
  );
  const [inquiryTitle, setInquiryTitle] = useState<string>("");
  const [inquiryContent, setInquiryContent] = useState<string>("");

  const [popupTitle, setPopupTitle] = useState<string>("");
  const [popupContents, setPopupContents] = useState<string>("");
  const [popupShow, setPopupShow] = useState<boolean>(false);

  const initData = () => {
    setEmail("");
    setInquiryCategory(selectBoxOptions[0].value);
    setInquiryTitle("");
    setInquiryContent("");
  };

  const validateEmailAddress = (input: string) => {
    if (input && !EMAIL_REGAX.test(input)) {
      setPopupTitle("Email 형식 확인");
      setPopupContents("Email은 'abc@gmail.com ' 형태로 입력되어야 합니다.");
      setPopupShow(true);
      setEmail("");
      return;
    }
  };

  const handleOnClick = () => {
    if (!email || !inquiryTitle || !inquiryContent) {
      setPopupTitle("입력사항 확인");
      setPopupContents("입력되지 않은 사항이 있습니다.");
      setPopupShow(true);
      return;
    }
    setShowConfirm(true);
  };

  const handleOnConfirm = async () => {
    setShowConfirm(false);
    setIsLoading(true);
    setPopupContents("");

    const request: InquiryModel = {
      email: email,
      category: inquiryCategory,
      title: inquiryTitle,
      content: inquiryContent,
    };
    const res: InquiryModel = await sendInquiryAPI(request);
    if (res) {
      setPopupTitle("문의가 성공적으로 접수되었습니다.");
      initData();
    } else {
      setPopupTitle("[ERROR] 요청이 실패하였습니다. 개발자에게 문의하세요.");
    }
    setIsLoading(false);
    setPopupShow(true);
  };

  const makeConfirmContents = () => {
    return (
      " - 메일주소 : " +
      email +
      "\n\n - 문의 분류 : " +
      inquiryCategory +
      "\n\n - 문의 제목 : " +
      inquiryTitle
    );
  };

  useEffect(() => {
    setConfirmContents(makeConfirmContents());
  }, [email, inquiryCategory, inquiryTitle]);

  return (
    <>
      {isLoading ? <WaitingBackground spinnerColor="grey" /> : null}
      <div className="contact_page_container">
        <p>문의하기</p>
        <div className="input_div">
          <CustomizedInput
            title={"이메일 주소"}
            value={email}
            placeHolder={"abc@gmail.com (필수)"}
            onChange={setEmail}
            onBlur={validateEmailAddress}
          />
          <CustomizedSelectBox
            title={"문의 분류"}
            defaultValue={inquiryCategory}
            useStateFuncForValue={setInquiryCategory}
            options={selectBoxOptions}
          />
          <CustomizedInput
            title={"문의 제목"}
            value={inquiryTitle}
            placeHolder={"제목을 입력하세요(25자 이내, 필수)"}
            maxLength={25}
            onChange={setInquiryTitle}
          />
          <CustomizedTextArea
            title={"문의 내용"}
            value={inquiryContent}
            placeHolder={"문의 내용을 입력하세요 (필수)"}
            onChange={setInquiryContent}
          />
        </div>
        <div className="btn_area">
          <Button
            size="large"
            variant="contained"
            className="inquiry_btn"
            onClick={handleOnClick}
          >
            문의접수
          </Button>
        </div>
        <CustomizedConfirm
          show={showConfirm}
          confirmQuestion={"문의를 접수하시겠습니까?"}
          contents={confirmContents}
          onClickConfirm={handleOnConfirm}
          onClickCancel={() => {
            setShowConfirm(false);
          }}
        />
        <CustomizedPopup
          title={popupTitle}
          contents={popupContents}
          show={popupShow}
          onClickOk={() => {
            setPopupShow(false);
          }}
        />
      </div>
    </>
  );
};
export default ContactBox;
