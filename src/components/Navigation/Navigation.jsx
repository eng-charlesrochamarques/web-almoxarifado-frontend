import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navigation({ isLoggedIn, onSignOut, onLoginClick, onRegisterClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleToggleMenu() {
    setIsMenuOpen((currentValue) => !currentValue);
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  function handleLoginButtonClick() {
    handleCloseMenu();
    onLoginClick();
  }

  function handleRegisterButtonClick() {
    handleCloseMenu();
    onRegisterClick();
  }

  function handleSignOutButtonClick() {
    handleCloseMenu();
    onSignOut();
  }

  return (
    <nav
      className={`navigation${isMenuOpen ? " navigation_opened" : ""}`}
      aria-label="Navegacao principal"
    >
      <button
        className="navigation__toggle"
        type="button"
        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isMenuOpen}
        onClick={handleToggleMenu}
      >
        <span className="navigation__toggle-line" />
        <span className="navigation__toggle-line" />
        <span className="navigation__toggle-line" />
      </button>

      <div className="navigation__menu">
        <div className="navigation__links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `navigation__link${isActive ? " navigation__link_active" : ""}`
          }
          onClick={handleCloseMenu}
        >
          Inicio
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            `navigation__link${isActive ? " navigation__link_active" : ""}`
          }
          onClick={handleCloseMenu}
        >
          Pesquisar
        </NavLink>
        </div>

        <div className="navigation__auth" aria-label="Acesso do usuario">
          {isLoggedIn ? (
            <button
              className="navigation__auth-button"
              type="button"
              onClick={handleSignOutButtonClick}
            >
              Sair
            </button>
          ) : (
            <>
              <button
                className="navigation__auth-button"
                type="button"
                onClick={handleLoginButtonClick}
              >
                Entrar
              </button>
              <button
                className="navigation__auth-button navigation__auth-button_register"
                type="button"
                onClick={handleRegisterButtonClick}
              >
                Registrar
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
