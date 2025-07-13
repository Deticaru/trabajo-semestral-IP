// src/pages/Admin/AdminPanelMenu.tsx
import { NavLink } from "react-router-dom";

// Configuración de items del menú con iconos y colores
const menuItems = [
  {
    path: "/administrator",
    label: "Dashboard",
    icon: "👑",
    gradient: "from-purple-600 to-indigo-600",
    hoverColor: "hover:bg-purple-50",
    end: true,
  },
  {
    path: "/administrator/promotions",
    label: "Promociones",
    icon: "🎯",
    gradient: "from-green-500 to-emerald-600",
    hoverColor: "hover:bg-green-50",
  },
  {
    path: "/administrator/activity",
    label: "Actividad",
    icon: "📊",
    gradient: "from-blue-500 to-cyan-600",
    hoverColor: "hover:bg-blue-50",
  },
  {
    path: "/administrator/products",
    label: "Productos",
    icon: "🛍️",
    gradient: "from-purple-500 to-indigo-600",
    hoverColor: "hover:bg-purple-50",
  },
  {
    path: "/administrator/categories",
    label: "Categorías",
    icon: "📂",
    gradient: "from-indigo-500 to-purple-600",
    hoverColor: "hover:bg-indigo-50",
  },
  {
    path: "/administrator/brands",
    label: "Marcas",
    icon: "🏷️",
    gradient: "from-violet-500 to-purple-600",
    hoverColor: "hover:bg-violet-50",
  },
  {
    path: "/administrator/usersc",
    label: "Personal",
    icon: "👨‍💼",
    gradient: "from-amber-500 to-orange-600",
    hoverColor: "hover:bg-amber-50",
  },
];

const AdminPanelMenu = () => (
  <aside className="w-72 bg-white shadow-2xl rounded-r-3xl py-8 px-6 flex flex-col gap-2 border-r border-gray-100">
    {/* Header del panel */}
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
          ⚡
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-800 to-indigo-700 bg-clip-text text-transparent">
            Admin Panel
          </h2>
          <p className="text-xs text-gray-500 font-medium">Control Total</p>
        </div>
      </div>
      <div className="w-full h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full opacity-20" />
    </div>

    {/* Items del menú */}
    <nav className="flex-1 space-y-2">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.end}
          className={({ isActive }) =>
            `group relative flex items-center gap-4 px-4 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
              isActive
                ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg scale-105`
                : `text-gray-700 ${item.hoverColor} hover:shadow-md`
            }`
          }
        >
          {({ isActive }) => (
            <>
              {/* Fondo animado para item activo */}
              {isActive && (
                <div className="absolute inset-0 bg-white bg-opacity-20 rounded-xl animate-pulse" />
              )}

              {/* Indicador lateral para item activo */}
              {isActive && (
                <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg" />
              )}

              {/* Icono */}
              <div
                className={`relative text-2xl transition-transform duration-300 ${
                  isActive ? "transform scale-110" : "group-hover:scale-110"
                }`}
              >
                {item.icon}
              </div>

              {/* Texto del menú */}
              <span className="relative text-base font-medium">
                {item.label}
              </span>

              {/* Indicador de flecha para item activo */}
              {isActive && (
                <div className="absolute right-4 text-white text-sm">➤</div>
              )}

              {/* Efecto de brillo en hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}
              />
            </>
          )}
        </NavLink>
      ))}
    </nav>

    {/* Footer del panel */}
    <div className="mt-8 pt-6 border-t border-gray-100">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-sm">
            ✓
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Sistema Online
            </p>
            <p className="text-xs text-gray-500">Todos los servicios activos</p>
          </div>
        </div>
      </div>

      {/* Botón de configuración */}
      <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium text-gray-700 transition-all duration-300 hover:shadow-md transform hover:scale-105">
        <span className="text-lg">⚙️</span>
        <span className="text-sm">Configuración</span>
      </button>
    </div>
  </aside>
);

export default AdminPanelMenu;
