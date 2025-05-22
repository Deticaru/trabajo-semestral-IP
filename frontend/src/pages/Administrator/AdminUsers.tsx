// src/pages/Admin/AdminUsers.tsx
import AdminPanelMenu from "./AdminPanelMenu";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const mockUsers = [
  { id: 1, nombre: "Juan", rol: "Vendedor", activo: true },
  { id: 2, nombre: "Ana", rol: "Bodeguero", activo: true },
  { id: 3, nombre: "Pedro", rol: "Contador", activo: false },
];

const AdminUsers = () => (
  <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 flex">
      <AdminPanelMenu />
      <main className="flex-1 px-10 py-10">
        <h2 className="text-2xl font-bold text-purple-800 mb-8">
          Gestión de Usuarios
        </h2>
        <div className="bg-white rounded-2xl shadow p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-3">Nombre</th>
                <th className="py-2 px-3">Rol</th>
                <th className="py-2 px-3">Estado</th>
                <th className="py-2 px-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((u) => (
                <tr key={u.id} className="border-b last:border-b-0">
                  <td className="py-2 px-3">{u.nombre}</td>
                  <td className="py-2 px-3">{u.rol}</td>
                  <td className="py-2 px-3">
                    {u.activo ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-semibold text-sm">
                        Activo
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded font-semibold text-sm">
                        Inactivo
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="mt-6 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition">
            Crear Nuevo Usuario
          </button>
        </div>
      </main>
    </div>
    <Footer />
  </>
);

export default AdminUsers;
