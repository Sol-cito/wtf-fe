import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import NotFoundPage from "./Pages/NotFoundPage";
import ContactPage from "./Pages/AboutPage";
import Header from "./Header";
import Footer from "./Footer";
import ProjectPage from "./Pages/ProjectPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="body">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/:projectName" element={<ProjectPage />} />
            <Route path="/about" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
