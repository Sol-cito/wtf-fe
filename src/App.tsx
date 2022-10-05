import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Footer from "./Footer";
import Header from "./Header";
import ContactPage from "./Pages/AboutPage";
import AdminLoginPage from "./Pages/admin/AdminLoginPage";
import AdminPage from "./Pages/admin/AdminPage";
import PlayerInfoInputBox from "./Components/PlayerInfoInputBox";
import MainPage from "./Pages/MainPage";
import NotFoundPage from "./Pages/NotFoundPage";
import { useAppSelector } from "./Store/config";

const App = () => {
  const { isLogin } = useAppSelector((state) => state.isLogin);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="body">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/about" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route
              path="/admin"
              element={isLogin ? <AdminPage /> : <AdminLoginPage />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
