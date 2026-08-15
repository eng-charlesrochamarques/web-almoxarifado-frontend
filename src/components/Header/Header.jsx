import Navigation from "../Navigation/Navigation.jsx";

function Header({ isLoggedIn, onSignOut, onLoginClick, onRegisterClick }) {
  return (
    <header className="header">
      <div className="header__brand" aria-label="Web Almoxarifado">
        <span className="header__mark">
          <span className="header__mark-web">Web</span>
          <span className="header__mark-a">A</span>
        </span>
        <span className="header__name">Web Almoxarifado</span>
      </div>
      <Navigation
        isLoggedIn={isLoggedIn}
        onSignOut={onSignOut}
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
      />
    </header>
  );
}

export default Header;
