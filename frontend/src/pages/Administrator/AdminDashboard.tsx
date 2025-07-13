// src/pages/Admin/AdminDashboard.tsx
import AdminPanelMenu from "./AdminPanelMenu";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { NavLink } from "react-router-dom";

const mockStats = [
  {
    label: "Ventas totales",
    value: "$2.500.000",
    color: "text-emerald-700",
    bgGradient: "from-emerald-500 to-green-600",
    icon: "💰",
    change: "+12.5%",
    changeType: "positive",
  },
  {
    label: "Pedidos activos",
    value: "34",
    color: "text-blue-700",
    bgGradient: "from-blue-500 to-cyan-600",
    icon: "📦",
    change: "+8.3%",
    changeType: "positive",
  },
  {
    label: "Usuarios activos",
    value: "12",
    color: "text-purple-700",
    bgGradient: "from-purple-500 to-indigo-600",
    icon: "👥",
    change: "+2.1%",
    changeType: "positive",
  },
  {
    label: "Stock bajo",
    value: "5 productos",
    color: "text-red-700",
    bgGradient: "from-red-500 to-pink-600",
    icon: "⚠️",
    change: "-15.2%",
    changeType: "negative",
  },
];

const AdminDashboard = () => (
  <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      <AdminPanelMenu />
      <main className="flex-1 px-10 py-10">
        {/* Header mejorado */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
              👑
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-800 to-indigo-700 bg-clip-text text-transparent">
                Panel de Administrador
              </h1>
              <p className="text-gray-600 mt-1">
                Gestiona tu negocio desde aquí
              </p>
            </div>
          </div>
        </div>

        {/* Tarjetas de estadísticas mejoradas */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {mockStats.map((stat, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Fondo degradado animado */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${stat.bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              {/* Contenido de la tarjeta */}
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div
                    className={`text-sm font-semibold px-2 py-1 rounded-full ${
                      stat.changeType === "positive"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {stat.change}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    {stat.label}
                  </p>
                  <p
                    className={`text-3xl font-bold ${stat.color} group-hover:text-white transition-colors duration-300`}
                  >
                    {stat.value}
                  </p>
                </div>

                {/* Indicador de progreso decorativo */}
                <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
                  <div
                    className={`bg-gradient-to-r ${stat.bgGradient} h-1 rounded-full transition-all duration-500 group-hover:w-full`}
                    style={{ width: `${Math.random() * 80 + 20}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sección de acciones rápidas */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center text-white">
              ⚡
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Acciones Rápidas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <NavLink
              to="/administrator/promotions"
              className="group relative bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="relative flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <span>Promociones</span>
              </div>
            </NavLink>

            <NavLink
              to="/administrator/activity"
              className="group relative bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="relative flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <span>Historial de Actividad</span>
              </div>
            </NavLink>

            <NavLink
              to="/administrator/products"
              className="group relative bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="relative flex items-center gap-3">
                <span className="text-2xl">🛍️</span>
                <span>Gestionar Productos</span>
              </div>
            </NavLink>

            <NavLink
              to="/administrator/categories"
              className="group relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="relative flex items-center gap-3">
                <span className="text-2xl">📂</span>
                <span>Gestionar Categorías</span>
              </div>
            </NavLink>

            <NavLink
              to="/administrator/brands"
              className="group relative bg-gradient-to-r from-violet-500 to-purple-600 text-white p-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="relative flex items-center gap-3">
                <span className="text-2xl">🏷️</span>
                <span>Gestionar Marcas</span>
              </div>
            </NavLink>

            <NavLink
              to="/administrator/usersc"
              className="group relative bg-gradient-to-r from-amber-500 to-orange-600 text-white p-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="relative flex items-center gap-3">
                <span className="text-2xl">👨‍💼</span>
                <span>Gestionar Usuarios Personal</span>
              </div>
            </NavLink>
          </div>
        </div>

        {/* Sección de resumen visual */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Panel de actividad reciente */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-white">
                🕒
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Actividad Reciente
              </h3>
            </div>
            <div className="space-y-3">
              {[
                {
                  action: "Nuevo pedido registrado",
                  time: "Hace 5 min",
                  icon: "🛒",
                },
                {
                  action: "Stock actualizado",
                  time: "Hace 15 min",
                  icon: "📦",
                },
                { action: "Usuario creado", time: "Hace 1 hora", icon: "👤" },
              ].map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-xl">{activity.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel de acceso rápido */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white">
                🚀
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Acceso Rápido
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "Ventas",
                  icon: "💳",
                  color: "bg-green-100 text-green-700",
                },
                {
                  label: "Reportes",
                  icon: "📈",
                  color: "bg-blue-100 text-blue-700",
                },
                {
                  label: "Config",
                  icon: "⚙️",
                  color: "bg-gray-100 text-gray-700",
                },
                {
                  label: "Ayuda",
                  icon: "❓",
                  color: "bg-purple-100 text-purple-700",
                },
              ].map((item, i) => (
                <button
                  key={i}
                  className={`${item.color} p-4 rounded-xl font-medium transition-all duration-200 hover:scale-105 hover:shadow-md`}
                >
                  <div className="text-xl mb-1">{item.icon}</div>
                  <div className="text-sm">{item.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
    <Footer />
  </>
);

export default AdminDashboard;
