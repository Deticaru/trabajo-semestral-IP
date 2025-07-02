// @ts-ignore
import SellerNavbar from "./SellerNavbar";
import { NavLink } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

// Simulación de datos
const mockOrders = [
  { estado: "Pendiente" },
  { estado: "Pendiente" },
  { estado: "En preparación" },
  { estado: "Listo para entrega" },
  { estado: "Entregado" },
];
const mockProducts = [
  { nombre: "Producto A", stock: 2 },
  { nombre: "Producto B", stock: 10 },
  { nombre: "Producto C", stock: 4 },
];

const SellerDashboard = () => {
  // Resúmenes
  const pendientes = mockOrders.filter((o) => o.estado === "Pendiente").length;
  const enPreparacion = mockOrders.filter(
    (o) => o.estado === "En preparación"
  ).length;
  const listos = mockOrders.filter(
    (o) => o.estado === "Listo para entrega"
  ).length;
  const entregados = mockOrders.filter((o) => o.estado === "Entregado").length;

  const productosStockBajo = mockProducts.filter((p) => p.stock < 5);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex">
        {/* Menú lateral */}
        <aside className="w-60 bg-white shadow-lg rounded-r-2xl py-8 px-6 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-red-800 mb-4">
            Panel Vendedor
          </h2>
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
          <h1 className="text-3xl font-bold text-red-800 mb-8">
            Resumen del Vendedor
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="font-semibold text-lg mb-3 text-red-700">
                Pedidos
              </h2>
              <ul className="space-y-2">
                <li>
                  <span className="text-gray-700">Pendientes:</span>{" "}
                  <span className="font-bold text-red-800">{pendientes}</span>
                </li>
                <li>
                  <span className="text-gray-700">En preparación:</span>{" "}
                  <span className="font-bold text-yellow-600">
                    {enPreparacion}
                  </span>
                </li>
                <li>
                  <span className="text-gray-700">Listos para entrega:</span>{" "}
                  <span className="font-bold text-green-700">{listos}</span>
                </li>
                <li>
                  <span className="text-gray-700">Entregados:</span>{" "}
                  <span className="font-bold text-blue-700">{entregados}</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="font-semibold text-lg mb-3 text-red-700">
                Alertas de Stock Bajo
              </h2>
              {productosStockBajo.length === 0 ? (
                <p className="text-green-700 font-semibold">Todo en orden</p>
              ) : (
                <ul className="space-y-1">
                  {productosStockBajo.map((p, i) => (
                    <li key={i} className="text-red-700 font-semibold">
                      {p.nombre}{" "}
                      <span className="text-gray-600">(Stock: {p.stock})</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <NavLink
              to="/seller/inventory"
              className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Ir a Inventario
            </NavLink>
            <NavLink
              to="/seller/orders"
              className="bg-green-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-800 transition"
            >
              Ver Pedidos
            </NavLink>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default SellerDashboard;
