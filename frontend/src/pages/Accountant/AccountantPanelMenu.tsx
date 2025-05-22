// src/pages/Accountant/AccountantPanelMenu.tsx
import { NavLink } from "react-router-dom";

const AccountantPanelMenu = () => (
  <aside className="w-60 bg-white shadow-lg rounded-r-2xl py-8 px-6 flex flex-col gap-6">
    <h2 className="text-2xl font-bold text-indigo-800 mb-4">Panel Contador</h2>
    <NavLink
      to="/accountant"
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg font-semibold transition ${
          isActive
            ? "bg-indigo-700 text-white"
            : "text-indigo-800 hover:bg-indigo-100"
        }`
      }
      end
    >
      Resumen
    </NavLink>
    <NavLink
      to="/accountant/payments"
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg font-semibold transition ${
          isActive
            ? "bg-yellow-400 text-indigo-900"
            : "text-indigo-800 hover:bg-yellow-100"
        }`
      }
    >
      Pagos
    </NavLink>
    <NavLink
      to="/accountant/reports"
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg font-semibold transition ${
          isActive
            ? "bg-green-600 text-white"
            : "text-indigo-800 hover:bg-green-100"
        }`
      }
    >
      Reportes
    </NavLink>
  </aside>
);

export default AccountantPanelMenu;
