import { useEffect, useRef, useState } from "react";
import CustomizedPopup from "../../Components/CustomizedPopup";
import MatchResultInputBox from "../../Components/MatchResultInputBox";
import MatchResultList from "../../Components/MatchResultList";
import WaitingBackground from "../../Components/WaitingBackground";
import { OrderSortKeyword } from "../../Models/Enum/CommonEnum";
import {
  MatchResultModel,
  MatchResultRequestModel,
} from "../../Models/MatchResultModel";
import {
  getMatchResultAPI,
  MatchResultProps,
  modifyMatchResultAPI,
} from "../../Service/MatchService";

const MatchResultModificationFragment = () => {
  const ORDER_ENTITY_FIELD_NAME = "matchDate";

  const initStateRef: React.Ref<any> = useRef({});

  const [matchResults, setMatchResults] = useState<MatchResultModel[]>();
  const [selectedMatch, setSelectedMatch] = useState<MatchResultModel>();

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
      if (!selectedMatch) {
        setSelectedMatch(res[0]);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllMatchResult();
  }, []);

  const handleMatchResultModification = async (
    request: MatchResultRequestModel
  ) => {
    const registrationResult: MatchResultModel = await modifyMatchResultAPI(
      request
    );
    if (registrationResult) {
      setPopupTitle("[Success] Match Result Modification Success!!");
      getAllMatchResult();
    } else {
      setPopupTitle("[ERROR] 요청 실패...개발자에게 문의 ㄱㄱ");
    }
    setPopupShow(true);
  };

  return (
    <>
      <MatchResultInputBox
        title={"매치 결과 수정"}
        handleMatchResultRegistration={handleMatchResultModification}
        matchResult={selectedMatch}
        ref={initStateRef}
      />
      <MatchResultList
        matchResults={matchResults}
        title={"< 현재 등록된 매치 결과 >"}
        isRadioButtonVisible={true}
        initialSelectedRadioId={selectedMatch?.id}
        setSelectedMatch={setSelectedMatch}
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

export default MatchResultModificationFragment;
