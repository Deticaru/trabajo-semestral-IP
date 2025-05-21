import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const linkStyle = "px-3 py-2 rounded-md text-sm font-medium";
  const activeStyle = "text-white";
  const inactiveStyle = "text-gray-300 hover:text-white";

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirige al catálogo con el término de búsqueda como query param
    navigate(`/catalog?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <nav className="bg-red-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-white font-bold text-xl">
          <NavLink to="/Home" className="text-white font-bold text-xl">
            Ferremas
          </NavLink>
        </div>
        <div className="flex space-x-4 items-center">
          <form onSubmit={handleSearch} className="flex items-center mr-2">
            <input
              type="text"
              placeholder="Buscar..."
              className="px-2 py-1 rounded-md text-sm text-white border border-white placeholder-gray-300 bg-white/10 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="ml-1 px-2 py-1 bg-white text-red-800 rounded-md text-sm font-medium hover:bg-gray-200 flex items-center"
              aria-label="Buscar"
            >
              <svg
                viewBox="-2.4 -2.4 28.80 28.80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                stroke="#a51d2d"
              >
                <path
                  d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                  stroke="#a51d2d"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
          <NavLink
            to="/Catalog"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            Catálogo
          </NavLink>
          <NavLink
            to="/contact"
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
              to="/Login"
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
