import AdminPanelMenu from "./AdminPanelMenu";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";

// Datos expandidos de actividad con más detalles
const mockActivity = [
  {
    id: 1,
    usuario: "admin",
    accion: "Creó usuario vendedor",
    fecha: "2024-05-21 10:12",
    tipo: "usuario",
    prioridad: "media",
    detalles: "Se creó cuenta para nuevo vendedor: María González",
    icono: "👤",
    color: "blue",
  },
  {
    id: 2,
    usuario: "admin",
    accion: "Editó promoción",
    fecha: "2024-05-21 11:05",
    tipo: "promocion",
    prioridad: "alta",
    detalles: "Modificó descuento de 15% a 20% en categoría Electrónicos",
    icono: "🎯",
    color: "green",
  },
  {
    id: 3,
    usuario: "juan",
    accion: "Aprobó pedido #123",
    fecha: "2024-05-21 12:30",
    tipo: "pedido",
    prioridad: "alta",
    detalles: "Pedido por $150.000 - Cliente: Carlos Ruiz",
    icono: "✅",
    color: "emerald",
  },
  {
    id: 4,
    usuario: "admin",
    accion: "Agregó nuevo producto",
    fecha: "2024-05-21 09:45",
    tipo: "producto",
    prioridad: "media",
    detalles: "iPhone 15 Pro - Categoría: Smartphones",
    icono: "📱",
    color: "purple",
  },
  {
    id: 5,
    usuario: "maria",
    accion: "Actualizó stock",
    fecha: "2024-05-21 08:30",
    tipo: "inventario",
    prioridad: "baja",
    detalles: "Stock de laptops HP aumentado en 25 unidades",
    icono: "📦",
    color: "orange",
  },
  {
    id: 6,
    usuario: "admin",
    accion: "Eliminó categoría",
    fecha: "2024-05-20 16:20",
    tipo: "categoria",
    prioridad: "alta",
    detalles: "Categoría 'Accesorios obsoletos' eliminada",
    icono: "🗑️",
    color: "red",
  },
  {
    id: 7,
    usuario: "carlos",
    accion: "Procesó devolución",
    fecha: "2024-05-20 14:15",
    tipo: "devolucion",
    prioridad: "media",
    detalles: "Devolución de $45.000 aprobada - Motivo: producto defectuoso",
    icono: "↩️",
    color: "yellow",
  },
  {
    id: 8,
    usuario: "admin",
    accion: "Configuró método de pago",
    fecha: "2024-05-20 13:10",
    tipo: "configuracion",
    prioridad: "alta",
    detalles: "Habilitó WebPay Plus para transacciones",
    icono: "💳",
    color: "indigo",
  },
];

// Función para obtener el gradiente según el tipo de actividad
const getActivityGradient = (color: string) => {
  const gradients: { [key: string]: string } = {
    blue: "from-blue-500 to-cyan-600",
    green: "from-green-500 to-emerald-600",
    emerald: "from-emerald-500 to-teal-600",
    purple: "from-purple-500 to-indigo-600",
    orange: "from-orange-500 to-red-600",
    red: "from-red-500 to-pink-600",
    yellow: "from-yellow-500 to-orange-600",
    indigo: "from-indigo-500 to-purple-600",
  };
  return gradients[color] || "from-gray-500 to-gray-600";
};

// Función para obtener el color del badge de prioridad
const getPriorityStyle = (prioridad: string) => {
  const styles: { [key: string]: string } = {
    alta: "bg-red-100 text-red-700 border-red-200",
    media: "bg-yellow-100 text-yellow-700 border-yellow-200",
    baja: "bg-green-100 text-green-700 border-green-200",
  };
  return styles[prioridad] || "bg-gray-100 text-gray-700 border-gray-200";
};

// Función para formatear fecha relativa
const getRelativeTime = (fecha: string) => {
  const now = new Date();
  const activityDate = new Date(fecha);
  const diff = now.getTime() - activityDate.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) return `Hace ${days} día${days > 1 ? "s" : ""}`;
  if (hours > 0) return `Hace ${hours} hora${hours > 1 ? "s" : ""}`;
  return "Hace menos de una hora";
};

const AdminActivity = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("todos");
  const [filterPriority, setFilterPriority] = useState("todas");
  const [filteredActivity, setFilteredActivity] = useState(mockActivity);

  // Efecto para filtrar actividades
  useEffect(() => {
    let filtered = mockActivity;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (activity) =>
          activity.accion.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.detalles.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por tipo
    if (filterType !== "todos") {
      filtered = filtered.filter((activity) => activity.tipo === filterType);
    }

    // Filtrar por prioridad
    if (filterPriority !== "todas") {
      filtered = filtered.filter(
        (activity) => activity.prioridad === filterPriority
      );
    }

    // Ordenar por fecha (más reciente primero)
    filtered.sort(
      (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
    );

    setFilteredActivity(filtered);
  }, [searchTerm, filterType, filterPriority]);

  // Función para obtener estadísticas
  const getStats = () => {
    const total = mockActivity.length;
    const hoy = mockActivity.filter((a) => {
      const today = new Date().toISOString().split("T")[0];
      return a.fecha.startsWith(today);
    }).length;
    const prioridades = {
      alta: mockActivity.filter((a) => a.prioridad === "alta").length,
      media: mockActivity.filter((a) => a.prioridad === "media").length,
      baja: mockActivity.filter((a) => a.prioridad === "baja").length,
    };

    return { total, hoy, prioridades };
  };

  const stats = getStats();
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
        <AdminPanelMenu />
        <main className="flex-1 px-10 py-10">
          {/* Header mejorado */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                  📊
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
                    Historial de Actividad
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Monitorea todas las acciones del sistema
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Estadísticas de actividad */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-white text-xl">
                  📈
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Total Actividades
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stats.total}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-xl">
                  🕒
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Hoy</p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.hoy}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center text-white text-xl">
                  🔥
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Alta Prioridad
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {stats.prioridades.alta}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-xl">
                  🎯
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    En Proceso
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {stats.prioridades.media}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Panel de filtros */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-white">
                🔍
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Filtros de Actividad
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar Actividad
                </label>
                <input
                  type="text"
                  placeholder="Buscar por acción, usuario o detalles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Actividad
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="todos">Todos los tipos</option>
                  <option value="usuario">👤 Usuarios</option>
                  <option value="promocion">🎯 Promociones</option>
                  <option value="pedido">✅ Pedidos</option>
                  <option value="producto">📱 Productos</option>
                  <option value="inventario">📦 Inventario</option>
                  <option value="categoria">📂 Categorías</option>
                  <option value="devolucion">↩️ Devoluciones</option>
                  <option value="configuracion">💳 Configuración</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prioridad
                </label>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="todas">Todas las prioridades</option>
                  <option value="alta">🔥 Alta</option>
                  <option value="media">⚡ Media</option>
                  <option value="baja">📝 Baja</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("todos");
                  setFilterPriority("todas");
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
              >
                Limpiar Filtros
              </button>
              <span className="text-sm text-gray-600 flex items-center">
                Mostrando {filteredActivity.length} de {mockActivity.length}{" "}
                actividades
              </span>
            </div>
          </div>

          {/* Timeline de actividades */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white">
                📋
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Timeline de Actividades
              </h3>
            </div>

            {filteredActivity.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  No hay actividades
                </h3>
                <p className="text-gray-600">
                  {mockActivity.length === 0
                    ? "No se han registrado actividades aún"
                    : "No se encontraron actividades con los filtros aplicados"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredActivity.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="group relative flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300"
                  >
                    {/* Línea de timeline */}
                    <div className="relative flex flex-col items-center">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${getActivityGradient(
                          activity.color
                        )} rounded-full flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        {activity.icono}
                      </div>
                      {index < filteredActivity.length - 1 && (
                        <div className="w-0.5 h-16 bg-gray-200 mt-2" />
                      )}
                    </div>

                    {/* Contenido de la actividad */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                            {activity.accion}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Por{" "}
                            <span className="font-medium text-blue-600">
                              {activity.usuario}
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityStyle(
                              activity.prioridad
                            )}`}
                          >
                            {activity.prioridad === "alta"
                              ? "🔥"
                              : activity.prioridad === "media"
                              ? "⚡"
                              : "📝"}{" "}
                            {activity.prioridad.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {getRelativeTime(activity.fecha)}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-2">{activity.detalles}</p>

                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${getActivityGradient(
                            activity.color
                          )} bg-opacity-10 text-gray-700`}
                        >
                          {activity.tipo.charAt(0).toUpperCase() +
                            activity.tipo.slice(1)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {activity.fecha}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminActivity;
