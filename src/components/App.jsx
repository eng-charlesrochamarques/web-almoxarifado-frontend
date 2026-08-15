import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import CurrentUserContext from "../contexts/CurrentUserContext.jsx";
import { getCurrentUser } from "../utils/api.js";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Search from "./Search/Search.jsx";
import Footer from "./Footer/Footer.jsx";

const TOKEN_KEY = "webAlmoxarifadoToken";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const isLoggedIn = Boolean(currentUser);

  useEffect(() => {
    if (!token) {
      return;
    }

    getCurrentUser(token)
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setCurrentUser(null);
      });
  }, [token]);

  function handleSignOut() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setCurrentUser(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header isLoggedIn={isLoggedIn} onSignOut={handleSignOut} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<Search token={token} />} />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
