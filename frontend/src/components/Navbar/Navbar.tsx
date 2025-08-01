import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const linkStyle = "px-3 py-2 rounded-md text-sm font-medium";
  const activeStyle = "text-white";
  const inactiveStyle = "text-gray-300 hover:text-white";

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sucursales, setSucursales] = useState<
    { id: number; nom_sucursal: string }[]
  >([]);
  const [sucursal, setSucursal] = useState<{
    id: number;
    nom_sucursal: string;
  } | null>(null);
  const navigate = useNavigate();

  const { cart, animateCart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    // Fetch sucursales desde la API
    fetch(`${import.meta.env.VITE_API_URL}/api/sucursales/`)
      .then((res) => res.json())
      .then((data) => {
        setSucursales(data);
        // Si no hay sucursal en localStorage, setear la primera como default
        const stored = localStorage.getItem("sucursal");
        if (stored) {
          setSucursal(JSON.parse(stored));
        } else if (data.length > 0) {
          setSucursal(data[0]);
          localStorage.setItem("sucursal", JSON.stringify(data[0]));
        }
      });
  }, []);

  // Función para cerrar sesión y redirigir
  const logoutAndRedirect = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    delete axios.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
    navigate("/login");
  };

  // Interceptor global de axios para detectar 401
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          logoutAndRedirect();
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const handleLogout = () => {
    logoutAndRedirect();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/catalog?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleSucursalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = sucursales.find((s) => s.id === Number(e.target.value));
    if (selected) {
      setSucursal(selected);
      localStorage.setItem("sucursal", JSON.stringify(selected));
      window.location.reload();
    }
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
            <>
              <button
                onClick={handleLogout}
                className={`${linkStyle} ${inactiveStyle}`}
              >
                Cerrar sesión
              </button>
              {/* Ícono de usuario */}
              <button
                onClick={() => navigate("/profile")}
                className="ml-2 flex items-center justify-center bg-red-700 hover:bg-red-800 rounded-full p-2"
                aria-label="Perfil de usuario"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  width="26"
                  height="26"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
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
          {/* Botón de carrito al final con badge animado */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `ml-2 ${linkStyle} flex items-center justify-center ${
                isActive ? activeStyle : inactiveStyle
              }`
            }
            aria-label="Ver carrito"
          >
            <div className="relative">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                width="26"
                height="26"
                xmlns="http://www.w3.org/2000/svg"
                className="inline"
              >
                <path
                  d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {cartCount > 0 && (
                <span
                  className={`absolute -top-2 -right-2 bg-yellow-400 text-red-800 text-xs font-bold rounded-full px-2 py-0.5 border-2 border-white
                    ${animateCart ? "animate-bounce" : ""}`}
                >
                  {cartCount}
                </span>
              )}
            </div>
          </NavLink>
          <select
            value={sucursal?.id || ""}
            onChange={handleSucursalChange}
            className="ml-4 px-3 py-2 rounded-md text-sm font-medium bg-white text-red-800 border border-white"
          >
            {sucursales.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nom_sucursal}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
