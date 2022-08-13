import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import MainPage from "./Pages/MainPage";
import NotFoundPage from "./Pages/NotFoundPage";
import ContactPage from "./Pages/ContactPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
