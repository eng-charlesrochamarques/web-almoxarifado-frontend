import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation" aria-label="Navegacao principal">
      <div className="navigation__links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `navigation__link${isActive ? " navigation__link_active" : ""}`
          }
        >
          Inicio
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            `navigation__link${isActive ? " navigation__link_active" : ""}`
          }
        >
          Pesquisar
        </NavLink>
      </div>

      <div className="navigation__auth" aria-label="Acesso do usuario">
        <button className="navigation__auth-button" type="button">
          Entrar
        </button>
        <button
          className="navigation__auth-button navigation__auth-button_register"
          type="button"
        >
          Registrar
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
