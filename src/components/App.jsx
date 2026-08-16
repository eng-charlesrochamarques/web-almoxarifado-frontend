import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import CurrentUserContext from "../contexts/CurrentUserContext.jsx";
import { getCurrentUser, login, register } from "../utils/api.js";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Search from "./Search/Search.jsx";
import Footer from "./Footer/Footer.jsx";
import AuthPopup from "./AuthPopup/AuthPopup.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";

const TOKEN_KEY = "webAlmoxarifadoToken";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const isLoggedIn = Boolean(currentUser);
  const [activeAuthPopup, setActiveAuthPopup] = useState(null);
  const [authError, setAuthError] = useState("");
  const [authSuccessMessage, setAuthSuccessMessage] = useState("");

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
    setAuthError("");
    setAuthSuccessMessage("");
    setActiveAuthPopup("login");
  }

  function handleOpenRegisterPopup() {
    setAuthError("");
    setAuthSuccessMessage("");
    setActiveAuthPopup("register");
  }

  function handleClosePopup() {
    setActiveAuthPopup(null);
    setAuthError("");
    setAuthSuccessMessage("");
  }

  function handleLoginSubmit(data) {
    setAuthError("");

    login(data)
      .then(({ token: newToken }) => {
        localStorage.setItem(TOKEN_KEY, newToken);
        setToken(newToken);
        handleClosePopup();
      })
      .catch((err) => {
        setAuthError(err.message);
      });
  }
  function handleRegisterSubmit(data) {
    setAuthError("");

    register(data)
      .then(() => {
        setAuthSuccessMessage(
          "Cadastro realizado com sucesso. Agora entre na sua conta.",
        );
        setActiveAuthPopup("login");
      })
      .catch((err) => {
        setAuthError(err.message);
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
          <Route
            path="/search"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                onUnauthorized={handleOpenLoginPopup}
              >
                <Search token={token} />
              </ProtectedRoute>
            }
          />
        </Routes>

        <AuthPopup
          isOpen={activeAuthPopup === "login"}
          title="Entrar"
          submitText="Entrar"
          mode="login"
          serverError={authError}
          successMessage={authSuccessMessage}
          onClose={handleClosePopup}
          onSubmit={handleLoginSubmit}
          onSwitchMode={handleOpenRegisterPopup}
        />

        <AuthPopup
          isOpen={activeAuthPopup === "register"}
          title="Registrar"
          submitText="Registrar"
          mode="register"
          serverError={authError}
          successMessage=""
          onClose={handleClosePopup}
          onSubmit={handleRegisterSubmit}
          onSwitchMode={handleOpenLoginPopup}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
