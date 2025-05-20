import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkStyle = "px-3 py-2 rounded-md text-sm font-medium";
  const activeStyle = "text-white";
  const inactiveStyle = "text-gray-300 hover:text-white";

  return (
    <nav className="bg-red-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-white font-bold text-xl">Ferremas</div>
        <div className="flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            Inicio
          </NavLink>
          <NavLink
            to="/servicios"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            Servicios
          </NavLink>
          <NavLink
            to="/contacto"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            Contacto
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
