import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import CurrentUserContext from "../contexts/CurrentUserContext.jsx";
import { getCurrentUser, login, register } from "../utils/api.js";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Search from "./Search/Search.jsx";
import Footer from "./Footer/Footer.jsx";
import AuthPopup from "./AuthPopup/AuthPopup.jsx";

const TOKEN_KEY = "webAlmoxarifadoToken";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const isLoggedIn = Boolean(currentUser);
  const [activeAuthPopup, setActiveAuthPopup] = useState(null);

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

  function handleOpenLoginPopup() {
    setActiveAuthPopup("login");
  }

  function handleOpenRegisterPopup() {
    setActiveAuthPopup("register");
  }

  function handleClosePopup() {
    setActiveAuthPopup(null);
  }

  function handleLoginSubmit(data) {
    login(data)
      .then(({ token: newToken }) => {
        localStorage.setItem(TOKEN_KEY, newToken);
        setToken(newToken);
        handleClosePopup();
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  function handleRegisterSubmit(data) {
    register(data)
      .then(() => {
        setActiveAuthPopup("login");
      })
      .catch((err) => {
        console.error(err.message);
      });
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          onSignOut={handleSignOut}
          onLoginClick={handleOpenLoginPopup}
          onRegisterClick={handleOpenRegisterPopup}
        />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<Search token={token} />} />
        </Routes>

        <AuthPopup
          isOpen={activeAuthPopup === "login"}
          title="Entrar"
          submitText="Entrar"
          mode="login"
          onClose={handleClosePopup}
          onSubmit={handleLoginSubmit}
        />

        <AuthPopup
          isOpen={activeAuthPopup === "register"}
          title="Registrar"
          submitText="Registrar"
          mode="register"
          onClose={handleClosePopup}
          onSubmit={handleRegisterSubmit}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
