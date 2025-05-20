import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const linkStyle = "px-3 py-2 rounded-md text-sm font-medium";
  const activeStyle = "text-white";
  const inactiveStyle = "text-gray-300 hover:text-white";

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token); // true si hay token
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    delete axios.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className="bg-red-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-white font-bold text-xl">Ferremas</div>
        <div className="flex space-x-4">
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
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className={`${linkStyle} ${inactiveStyle}`}
              >
                Cerrar sesión
              </button>
            ) : (
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Iniciar Sesión
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
