// src/pages/Admin/AdminPanelMenu.tsx
import { NavLink } from "react-router-dom";

const AdminPanelMenu = () => (
  <aside className="w-60 bg-white shadow-lg rounded-r-2xl py-8 px-6 flex flex-col gap-6">
    <h2 className="text-2xl font-bold text-purple-800 mb-4">Panel Admin</h2>
    <NavLink
      to="/administrator"
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg font-semibold transition ${
          isActive
            ? "bg-purple-700 text-white"
            : "text-purple-800 hover:bg-purple-100"
        }`
      }
      end
    >
      Resumen
    </NavLink>

    <NavLink
      to="/administrator/promotions"
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg font-semibold transition ${
          isActive
            ? "bg-green-600 text-white"
            : "text-purple-800 hover:bg-green-100"
        }`
      }
    >
      Promociones
    </NavLink>
    <NavLink
      to="/administrator/activity"
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg font-semibold transition ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-purple-800 hover:bg-blue-100"
        }`
      }
    >
      Actividad
    </NavLink>
    <NavLink
      to="/administrator/products"
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg font-semibold transition ${
          isActive
            ? "bg-purple-700 text-white"
            : "text-purple-800 hover:bg-purple-100"
        }`
      }
    >
      Productos
    </NavLink>
    <NavLink
      to="/administrator/categories"
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg font-semibold transition ${
          isActive
            ? "bg-purple-700 text-white"
            : "text-purple-800 hover:bg-purple-100"
        }`
      }
    >
      Categorías
    </NavLink>
    <NavLink
      to="/administrator/brands"
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg font-semibold transition ${
          isActive
            ? "bg-purple-700 text-white"
            : "text-purple-800 hover:bg-purple-100"
        }`
      }
    >
      Marcas
    </NavLink>
    <NavLink
      to="/administrator/usersc"
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg font-semibold transition ${
          isActive
            ? "bg-yellow-400 text-purple-900"
            : "text-purple-800 hover:bg-yellow-100"
        }`
      }
    >
      Usuarios Personal
    </NavLink>
  </aside>
);

export default AdminPanelMenu;
