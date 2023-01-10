import { useState } from "react";
import CustomizedPopup from "../../Components/CustomizedPopup";
import { useAppDispatch } from "../../Store/config";
import { setLoginState } from "../../Store/Slices/LoginSlice";
import "./AdminLoginPage.scss";

const AdminLoginPage = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [popupTitle, setPopupTitle] = useState<string>("");
  const [popupContents, setPopupContents] = useState<string>("");
  const [popupShow, setPopupShow] = useState<boolean>(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const onChangeIdHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.currentTarget.value);
  };

  const onChangePasswordHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.currentTarget.value);
  };

  const handleLogin = () => {
    if (
      id === process.env.REACT_APP_ADMIN_ID &&
      password === process.env.REACT_APP_ADMIN_PW
    ) {
      setPopupTitle("[Success] 로그인 성공!");
      setPopupContents("");
      setIsLoginSuccess(true);
    } else {
      setPopupTitle("[Error] 로그인 실패");
      setPopupContents("Id와 Password를 다시 확인하세요");
    }
    setPopupShow(true);
  };

  return (
    <>
      <div className="admin_background" />
      <div className="admin_login_container">
        <div className="admin_login_title">WTF Admin Page Login</div>
        <div className="admin_login_info_area">
          <input placeholder="아이디" value={id} onChange={onChangeIdHandler} />
          <br />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={onChangePasswordHandler}
          />
          <br />
          <button onClick={handleLogin}>로그인</button>
        </div>
      </div>
      <CustomizedPopup
        title={popupTitle}
        contents={popupContents}
        show={popupShow}
        onClickOk={() => {
          setPopupShow(false);
          if (isLoginSuccess) {
            dispatch(setLoginState(true));
          }
        }}
      />
    </>
  );
};
export default AdminLoginPage;
