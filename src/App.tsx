import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import CustomizedModal from "./Components/CustomizedModal";
import Footer from "./Footer";
import Header from "./Header";
import AboutPage from "./Pages/AboutPage";
import AdminLoginPage from "./Pages/admin/AdminLoginPage";
import AdminPage from "./Pages/admin/AdminPage";
import ContactPage from "./Pages/ContactPage";
import MainPage from "./Pages/MainPage";
import MatchPage from "./Pages/MatchPage";
import NotFoundPage from "./Pages/NotFoundPage";
import PlayerPage from "./Pages/PlayerPage";
import { useAppSelector } from "./Store/config";

const App = () => {
  const { isLogin } = useAppSelector((state) => state.isLogin);

  const { modalShow } = useAppSelector((state) => state.modal);
  const { includedComponent } = useAppSelector((state) => state.modal);
  const { backgroundStyle } = useAppSelector((state) => state.modal);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="body">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/match" element={<MatchPage />} />
            <Route path="/players" element={<PlayerPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route
              path="/admin"
              element={isLogin ? <AdminPage /> : <AdminLoginPage />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      <CustomizedModal
        showModal={modalShow}
        includedComponent={includedComponent}
        backgroundStyle={backgroundStyle}
      />
    </div>
  );
};

export default App;
