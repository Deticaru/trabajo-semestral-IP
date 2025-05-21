// src/pages/Warehouse/WarehousePanelMenu.tsx
import { NavLink } from "react-router-dom";

const WarehousePanelMenu = () => (
  <aside className="w-60 bg-white shadow-lg rounded-r-2xl py-8 px-6 flex flex-col gap-6">
    <h2 className="text-2xl font-bold text-blue-800 mb-4">Panel Bodeguero</h2>
    <NavLink
      to="/warehouse"
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg font-semibold transition ${
          isActive
            ? "bg-blue-700 text-white"
            : "text-blue-800 hover:bg-blue-100"
        }`
      }
      end
    >
      Resumen
    </NavLink>
    <NavLink
      to="/warehouse/inventory"
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg font-semibold transition ${
          isActive
            ? "bg-yellow-400 text-blue-900"
            : "text-blue-800 hover:bg-yellow-100"
        }`
      }
    >
      Inventario
    </NavLink>
    <NavLink
      to="/warehouse/orders"
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg font-semibold transition ${
          isActive
            ? "bg-green-600 text-white"
            : "text-blue-800 hover:bg-green-100"
        }`
      }
    >
      Pedidos
    </NavLink>
  </aside>
);

export default WarehousePanelMenu;
