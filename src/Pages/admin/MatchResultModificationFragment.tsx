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
  deleteMatchResultAPI,
  getMatchResultAPI,
  MatchResultProps,
  modifyMatchResultAPI,
} from "../../Service/MatchService";

const MatchResultModificationFragment = () => {
  const ORDER_ENTITY_FIELD_NAME = "matchDate";

  const initStateRef: React.Ref<any> = useRef({});

  const [matchResults, setMatchResults] = useState<MatchResultModel[]>();
  const [selectedMatch, setSelectedMatch] = useState<MatchResultModel>();

  const [isDeletionComplete, setIsDeletionComplete] = useState<boolean>(false);

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
      if (!selectedMatch || isDeletionComplete) {
        setSelectedMatch(res[0]);
        setIsDeletionComplete(false);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllMatchResult();
  }, []);

  useEffect(() => {
    getAllMatchResult();
  }, [isDeletionComplete]);

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
      setPopupTitle("[ERROR] ?????? ??????...??????????????? ?????? ??????");
    }
    setPopupShow(true);
  };

  const handleMatchResultDeletion = async (matchId: number) => {
    const result = await deleteMatchResultAPI(matchId);
    if (result) {
      setPopupTitle("[Success] Match Result Deletion Success!!");
      setIsDeletionComplete(true);
      getAllMatchResult();
    } else {
      setPopupTitle("[ERROR] ?????? ??????...??????????????? ?????? ??????");
    }
    setPopupShow(true);
  };

  return (
    <>
      {matchResults && matchResults.length > 0 && (
        <MatchResultInputBox
          title={"?????? ?????? ??????/??????"}
          handleMatchResultRegistration={handleMatchResultModification}
          handleMatchResultDeletion={handleMatchResultDeletion}
          matchResult={selectedMatch}
          ref={initStateRef}
        />
      )}
      <MatchResultList
        matchResults={matchResults}
        title={"< ?????? ????????? ?????? ?????? >"}
        isRadioButtonVisible={true}
        initialSelectedRadioId={selectedMatch?.id}
        setSelectedMatch={setSelectedMatch}
      />
      {isLoading && <WaitingBackground />}
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
