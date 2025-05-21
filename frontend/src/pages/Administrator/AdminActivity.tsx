import AdminPanelMenu from "./AdminPanelMenu";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const mockActivity = [
  {
    id: 1,
    usuario: "admin",
    accion: "Creó usuario vendedor",
    fecha: "2024-05-21 10:12",
  },
  {
    id: 2,
    usuario: "admin",
    accion: "Editó promoción",
    fecha: "2024-05-21 11:05",
  },
  {
    id: 3,
    usuario: "juan",
    accion: "Aprobó pedido #123",
    fecha: "2024-05-21 12:30",
  },
];

const AdminActivity = () => (
  <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 flex">
      <AdminPanelMenu />
      <main className="flex-1 px-10 py-10">
        <h2 className="text-2xl font-bold text-purple-800 mb-8">
          Historial de Actividad
        </h2>
        <div className="bg-white rounded-2xl shadow p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-3">Usuario</th>
                <th className="py-2 px-3">Acción</th>
                <th className="py-2 px-3">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {mockActivity.map((a) => (
                <tr key={a.id} className="border-b last:border-b-0">
                  <td className="py-2 px-3">{a.usuario}</td>
                  <td className="py-2 px-3">{a.accion}</td>
                  <td className="py-2 px-3">{a.fecha}</td>
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

export default AdminActivity;
