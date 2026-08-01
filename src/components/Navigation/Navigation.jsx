import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation" aria-label="Navegacao principal">
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
    </nav>
  );
}

export default Navigation;
