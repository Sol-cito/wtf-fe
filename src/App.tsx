import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.scss";
import Footer from "./Footer";
import Header from "./Header";
import ContactPage from "./Pages/AboutPage";
import MainPage from "./Pages/MainPage";
import NotFoundPage from "./Pages/NotFoundPage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="body">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/about" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
