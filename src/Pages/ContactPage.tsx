import { SHALLOW_BLACK } from "../CommonConstant/StringColorConstant";
import ContactBox from "../Components/ContactBox";
import PageContainer from "../Components/PageContainer";
import "./ContactPage.scss";

const ContactPage = () => {
  return (
    <div className="contact_page_container">
      <PageContainer
        boxColor={SHALLOW_BLACK}
        includedComponent={<ContactBox />}
      />
    </div>
  );
};
export default ContactPage;
