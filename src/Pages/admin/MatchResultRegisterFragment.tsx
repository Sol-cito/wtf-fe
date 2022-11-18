import { useEffect, useRef, useState } from "react";
import CustomizedPopup from "../../Components/CustomizedPopup";
import MatchResultInputBox from "../../Components/MatchResultInputBox";
import MatchResultList from "../../Components/MatchResultList";
import WaitingBackground from "../../Components/WaitingBackground";
import { OrderSortKeyword } from "../../Models/Enum/CommonEnum";
import { MatchResultModel } from "../../Models/MatchResultModel";
import {
  getMatchResultAPI,
  MatchResultProps,
  registerNewMatchResultAPI,
} from "../../Service/MatchService";

const MatchResultRegisterFragment = () => {
  const ORDER_ENTITY_FIELD_NAME = "matchDate";

  const initStateRef: React.Ref<any> = useRef({});

  const [matchResults, setMatchResults] = useState<MatchResultModel[]>();

  const [popupTitle, setPopupTitle] = useState<string>("");
  const [popupShow, setPopupShow] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAllMatchResult = async () => {
    setIsLoading(true);

    const matchResultProps: MatchResultProps = {
      order: {
        entityFieldName: ORDER_ENTITY_FIELD_NAME,
        orderSortKeyword: OrderSortKeyword.DESC,
      },
    };
    const res: MatchResultModel[] = await getMatchResultAPI(matchResultProps);
    if (res) {
      setMatchResults(res);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllMatchResult();
  }, []);

  const handleMatchResultRegistration = async (
    matchResultModel: MatchResultModel
  ) => {
    const registrationResult: MatchResultModel =
      await registerNewMatchResultAPI(matchResultModel);
    if (registrationResult) {
      setPopupTitle("[Success] Match Result Registration Success!!");
    } else {
      setPopupTitle("[ERROR] 요청 실패...개발자에게 문의 ㄱㄱ");
    }
    initStateRef.current.initState();
    getAllMatchResult();
    setPopupShow(true);
  };

  return (
    <>
      <MatchResultInputBox
        title={"매치 결과 등록"}
        handleMatchResultRegistration={handleMatchResultRegistration}
        ref={initStateRef}
      />
      <MatchResultList
        matchResults={matchResults}
        title={"< 현재 등록된 매치 결과 >"}
        isRadioButtonVisible={false}
      />
      {isLoading ? <WaitingBackground /> : null}
      <CustomizedPopup
        title={popupTitle}
        show={popupShow}
        onClickOk={() => {
          setPopupShow(false);
        }}
      />
    </>
  );
};

export default MatchResultRegisterFragment;
