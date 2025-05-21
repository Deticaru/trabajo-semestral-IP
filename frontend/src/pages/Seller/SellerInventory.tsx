import { NavLink } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const mockProducts = [
  { id: 1, nombre: "Producto A", stock: 3 },
  { id: 2, nombre: "Producto B", stock: 20 },
  { id: 3, nombre: "Producto C", stock: 2 },
];

const SellerInventory = () => (
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
        <h2 className="text-2xl font-bold text-red-800 mb-8">Inventario</h2>
        <div className="bg-white rounded-2xl shadow p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-3">Producto</th>
                <th className="py-2 px-3">Stock</th>
                <th className="py-2 px-3">Alerta</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((p) => (
                <tr key={p.id} className="border-b last:border-b-0">
                  <td className="py-2 px-3">{p.nombre}</td>
                  <td className="py-2 px-3">{p.stock}</td>
                  <td className="py-2 px-3">
                    {p.stock < 5 ? (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded font-semibold text-sm">
                        Stock bajo
                      </span>
                    ) : (
                      <span className="text-green-700 font-semibold text-sm">
                        OK
                      </span>
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

export default SellerInventory;
