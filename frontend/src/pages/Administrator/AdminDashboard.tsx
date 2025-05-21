// src/pages/Admin/AdminDashboard.tsx
import AdminPanelMenu from "./AdminPanelMenu";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { NavLink } from "react-router-dom";

const mockStats = [
  { label: "Ventas totales", value: "$2.500.000", color: "text-green-700" },
  { label: "Pedidos activos", value: "34", color: "text-blue-700" },
  { label: "Usuarios activos", value: "12", color: "text-purple-700" },
  { label: "Stock bajo", value: "5 productos", color: "text-red-700" },
];

const AdminDashboard = () => (
  <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 flex">
      <AdminPanelMenu />
      <main className="flex-1 px-10 py-10">
        <h1 className="text-3xl font-bold text-purple-800 mb-8">
          Panel de Administrador
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {mockStats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow p-6 flex flex-col items-center"
            >
              <span className="font-semibold text-gray-600 mb-2">
                {stat.label}
              </span>
              <span className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <NavLink
            to="/administrator/users"
            className="bg-yellow-400 text-purple-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            Gestionar Usuarios
          </NavLink>
          <NavLink
            to="/administrator/promotions"
            className="bg-green-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-800 transition"
          >
            Promociones
          </NavLink>
          <NavLink
            to="/administrator/activity"
            className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            Historial de Actividad
          </NavLink>
        </div>
      </main>
    </div>
    <Footer />
  </>
);

export default AdminDashboard;
