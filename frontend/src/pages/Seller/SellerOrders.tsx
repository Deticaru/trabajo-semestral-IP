// @ts-ignore
import SellerNavbar from "./SellerNavbar";
import { NavLink } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const mockOrders = [
  {
    id: 1,
    cliente: "Juan",
    estado: "Pendiente",
    productos: "A, B",
    total: 20000,
  },
  {
    id: 2,
    cliente: "Ana",
    estado: "En preparación",
    productos: "C",
    total: 5000,
  },
  {
    id: 3,
    cliente: "Pedro",
    estado: "Listo para entrega",
    productos: "D",
    total: 12000,
  },
];

const SellerOrders = () => (
  <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 flex">
      {/* Menú lateral */}
      <aside className="w-60 bg-white shadow-lg rounded-r-2xl py-8 px-6 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-red-800 mb-4">Panel Vendedor</h2>
        <NavLink
          to="/seller"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg font-semibold transition ${
              isActive
                ? "bg-red-700 text-white"
                : "text-red-800 hover:bg-red-100"
            }`
          }
          end
        >
          Resumen
        </NavLink>
        <NavLink
          to="/seller/inventory"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg font-semibold transition ${
              isActive
                ? "bg-yellow-400 text-red-900"
                : "text-red-800 hover:bg-yellow-100"
            }`
          }
        >
          Inventario
        </NavLink>
        <NavLink
          to="/seller/orders"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg font-semibold transition ${
              isActive
                ? "bg-green-600 text-white"
                : "text-red-800 hover:bg-green-100"
            }`
          }
        >
          Pedidos
        </NavLink>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 px-10 py-10">
        <h2 className="text-2xl font-bold text-red-800 mb-8">Pedidos</h2>
        <div className="bg-white rounded-2xl shadow p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-3">ID</th>
                <th className="py-2 px-3">Cliente</th>
                <th className="py-2 px-3">Productos</th>
                <th className="py-2 px-3">Total</th>
                <th className="py-2 px-3">Estado</th>
                <th className="py-2 px-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((o) => (
                <tr key={o.id} className="border-b last:border-b-0">
                  <td className="py-2 px-3">{o.id}</td>
                  <td className="py-2 px-3">{o.cliente}</td>
                  <td className="py-2 px-3">{o.productos}</td>
                  <td className="py-2 px-3">${o.total.toLocaleString()}</td>
                  <td className="py-2 px-3">
                    {o.estado === "Pendiente" && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-semibold text-sm">
                        Pendiente
                      </span>
                    )}
                    {o.estado === "En preparación" && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold text-sm">
                        En preparación
                      </span>
                    )}
                    {o.estado === "Listo para entrega" && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-semibold text-sm">
                        Listo para entrega
                      </span>
                    )}
                    {o.estado === "Entregado" && (
                      <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded font-semibold text-sm">
                        Entregado
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-3">
                    {o.estado === "Pendiente" && (
                      <>
                        <button className="bg-green-600 text-white px-3 py-1 rounded mr-2 hover:bg-green-700 transition">
                          Aprobar
                        </button>
                        <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">
                          Rechazar
                        </button>
                      </>
                    )}
                    {o.estado === "En preparación" && (
                      <button className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 transition">
                        Listo para entrega
                      </button>
                    )}
                    {o.estado === "Listo para entrega" && (
                      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                        Entregado
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
    <Footer />
  </>
);

export default SellerOrders;
