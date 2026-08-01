import { Route, Routes } from "react-router-dom";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Search from "./Search/Search.jsx";
import Footer from "./Footer/Footer.jsx";

function App() {
  return (
    <div className="page">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
