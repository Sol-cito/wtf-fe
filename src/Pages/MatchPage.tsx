import AllMatchResult from "../Components/AllMatchResult";
import PageContainer from "../Components/PageContainer";
import "./MatchPage.scss";

const MatchPage = () => {
  return (
    <>
      <PageContainer includedComponent={<AllMatchResult />} />
    </>
  );
};
export default MatchPage;
