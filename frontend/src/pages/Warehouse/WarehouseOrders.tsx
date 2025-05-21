// src/pages/Warehouse/WarehouseOrders.tsx
import WarehousePanelMenu from "./WarehousePanelMenu";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const mockOrders = [
  {
    id: 1,
    vendedor: "Juan",
    estado: "Aprobado",
    productos: "A, B",
    total: 20000,
  },
  {
    id: 2,
    vendedor: "Ana",
    estado: "En preparación",
    productos: "C",
    total: 5000,
  },
  {
    id: 3,
    vendedor: "Pedro",
    estado: "Listo para entrega",
    productos: "D",
    total: 12000,
  },
];

const WarehouseOrders = () => (
  <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 flex">
      <WarehousePanelMenu />
      <main className="flex-1 px-10 py-10">
        <h2 className="text-2xl font-bold text-blue-800 mb-8">
          Pedidos a Preparar y Entregar
        </h2>
        <div className="bg-white rounded-2xl shadow p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-3">ID</th>
                <th className="py-2 px-3">Vendedor</th>
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
                  <td className="py-2 px-3">{o.vendedor}</td>
                  <td className="py-2 px-3">{o.productos}</td>
                  <td className="py-2 px-3">${o.total.toLocaleString()}</td>
                  <td className="py-2 px-3">
                    {o.estado === "Aprobado" && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-semibold text-sm">
                        Aprobado
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
                  </td>
                  <td className="py-2 px-3">
                    {o.estado === "Aprobado" && (
                      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                        Marcar en preparación
                      </button>
                    )}
                    {o.estado === "En preparación" && (
                      <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">
                        Listo para entrega
                      </button>
                    )}
                    {o.estado === "Listo para entrega" && (
                      <button className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition">
                        Confirmar entrega
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

export default WarehouseOrders;
