import AdminPanelMenu from "./AdminPanelMenu";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const mockPromotions = [
  { id: 1, nombre: "Descuento 10% en Herramientas", activa: true },
  { id: 2, nombre: "Envío gratis sobre $50.000", activa: false },
];

const AdminPromotions = () => (
  <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 flex">
      <AdminPanelMenu />
      <main className="flex-1 px-10 py-10">
        <h2 className="text-2xl font-bold text-purple-800 mb-8">
          Promociones y Descuentos
        </h2>
        <div className="bg-white rounded-2xl shadow p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-3">Nombre</th>
                <th className="py-2 px-3">Estado</th>
                <th className="py-2 px-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mockPromotions.map((promo) => (
                <tr key={promo.id} className="border-b last:border-b-0">
                  <td className="py-2 px-3">{promo.nombre}</td>
                  <td className="py-2 px-3">
                    {promo.activa ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-semibold text-sm">
                        Activa
                      </span>
                    ) : (
                      <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded font-semibold text-sm">
                        Inactiva
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-3">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 transition">
                      Editar
                    </button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">
                      Eliminar
                    </button>
                    <button
                      className={`ml-2 px-3 py-1 rounded font-semibold transition ${
                        promo.activa
                          ? "bg-gray-400 text-white hover:bg-gray-500"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      {promo.activa ? "Desactivar" : "Activar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="mt-6 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition">
            Crear Nueva Promoción
          </button>
        </div>
      </main>
    </div>
    <Footer />
  </>
);

export default AdminPromotions;
