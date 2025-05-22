import { NavLink } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const mockProducts = [
  { id: 1, nombre: "Producto X", stock: 5 },
  { id: 2, nombre: "Producto Y", stock: 1 },
  { id: 3, nombre: "Producto Z", stock: 12 },
];

const WarehouseInventory = () => (
  <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 flex">
      {/* Menú lateral */}
      <aside className="w-60 bg-white shadow-lg rounded-r-2xl py-8 px-6 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">
          Panel Bodeguero
        </h2>
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

      {/* Contenido principal */}
      <main className="flex-1 px-10 py-10">
        <h2 className="text-2xl font-bold text-blue-800 mb-8">Inventario</h2>
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

export default WarehouseInventory;
