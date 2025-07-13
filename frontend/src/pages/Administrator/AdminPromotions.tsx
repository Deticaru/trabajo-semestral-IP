import AdminPanelMenu from "./AdminPanelMenu";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";

const mockPromotions = [
  {
    id: 1,
    nombre: "Descuento 10% en Herramientas",
    activa: true,
    tipo: "Descuento",
    valor: "10%",
    fechaInicio: "2024-01-15",
    fechaFin: "2024-12-31",
    descripcion:
      "Descuento especial en toda la línea de herramientas manuales y eléctricas",
    usos: 45,
    limiteusos: 100,
    categoria: "Herramientas",
  },
  {
    id: 2,
    nombre: "Envío gratis sobre $50.000",
    activa: false,
    tipo: "Envío Gratis",
    valor: "$50.000",
    fechaInicio: "2024-02-01",
    fechaFin: "2024-06-30",
    descripcion:
      "Promoción de envío gratuito para compras superiores a $50.000",
    usos: 23,
    limiteusos: 200,
    categoria: "Envío",
  },
  {
    id: 3,
    nombre: "2x1 en Pinturas Premium",
    activa: true,
    tipo: "2x1",
    valor: "50%",
    fechaInicio: "2024-03-01",
    fechaFin: "2024-05-31",
    descripcion: "Lleva 2 galones de pintura premium pagando solo 1",
    usos: 12,
    limiteusos: 50,
    categoria: "Pinturas",
  },
];

const AdminPromotions = () => {
  const getTypeIcon = (tipo: string) => {
    switch (tipo) {
      case "Descuento":
        return "💸";
      case "Envío Gratis":
        return "🚚";
      case "2x1":
        return "🎁";
      default:
        return "🎯";
    }
  };

  const getTypeColor = (tipo: string) => {
    switch (tipo) {
      case "Descuento":
        return "from-green-500 to-emerald-600";
      case "Envío Gratis":
        return "from-blue-500 to-cyan-600";
      case "2x1":
        return "from-purple-500 to-indigo-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

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
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                  🎯
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                    Promociones y Descuentos
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Gestiona las promociones de tu tienda
                  </p>
                </div>
              </div>
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <span className="text-lg">➕</span>
                Crear Nueva Promoción
              </button>
            </div>
          </div>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-xl">
                  🎯
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Total Promociones
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {mockPromotions.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-white text-xl">
                  ✅
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Activas</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {mockPromotions.filter((p) => p.activa).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg flex items-center justify-center text-white text-xl">
                  ⏸️
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Inactivas</p>
                  <p className="text-2xl font-bold text-gray-600">
                    {mockPromotions.filter((p) => !p.activa).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-xl">
                  📊
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Usos Totales
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {mockPromotions.reduce((sum, p) => sum + p.usos, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de promociones mejorado */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockPromotions.map((promo) => (
              <div
                key={promo.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                {/* Header de la tarjeta con gradiente */}
                <div
                  className={`h-32 bg-gradient-to-r ${getTypeColor(
                    promo.tipo
                  )} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-20" />
                  <div className="relative p-6 h-full flex items-center justify-between text-white">
                    <div>
                      <div className="text-3xl mb-2">
                        {getTypeIcon(promo.tipo)}
                      </div>
                      <h3 className="text-lg font-bold leading-tight">
                        {promo.nombre}
                      </h3>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        promo.activa
                          ? "bg-green-500 bg-opacity-20 text-green-100 border border-green-300"
                          : "bg-gray-500 bg-opacity-20 text-gray-200 border border-gray-300"
                      }`}
                    >
                      {promo.activa ? "✅ Activa" : "⏸️ Inactiva"}
                    </div>
                  </div>
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-6">
                  <div className="space-y-4">
                    {/* Descripción */}
                    <p className="text-gray-600 text-sm">{promo.descripcion}</p>

                    {/* Información clave */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">
                          {promo.valor}
                        </p>
                        <p className="text-xs text-gray-500 uppercase">Valor</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">
                          {promo.usos}
                        </p>
                        <p className="text-xs text-gray-500 uppercase">Usos</p>
                      </div>
                    </div>

                    {/* Barra de progreso de usos */}
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Uso de promoción</span>
                        <span>
                          {promo.usos}/{promo.limiteusos}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${getTypeColor(
                            promo.tipo
                          )} h-2 rounded-full transition-all duration-500`}
                          style={{
                            width: `${(promo.usos / promo.limiteusos) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Fechas */}
                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex justify-between">
                        <span>📅 Inicio:</span>
                        <span>{promo.fechaInicio}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>🏁 Fin:</span>
                        <span>{promo.fechaFin}</span>
                      </div>
                    </div>

                    {/* Categoría */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">🏷️</span>
                      <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                        {promo.categoria}
                      </span>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex gap-2 mt-6">
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
                      <span>✏️</span>
                      Editar
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
                      <span>🗑️</span>
                      Eliminar
                    </button>
                  </div>

                  <button
                    className={`w-full mt-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 ${
                      promo.activa
                        ? "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
                        : "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                    }`}
                  >
                    <span>{promo.activa ? "⏸️" : "▶️"}</span>
                    {promo.activa ? "Desactivar" : "Activar"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Panel de filtros y búsqueda */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white">
                🔍
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Filtros y Búsqueda
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Buscar promociones..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                <option>Todas las categorías</option>
                <option>Herramientas</option>
                <option>Pinturas</option>
                <option>Envío</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                <option>Todos los estados</option>
                <option>Activas</option>
                <option>Inactivas</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                <option>Todos los tipos</option>
                <option>Descuento</option>
                <option>Envío Gratis</option>
                <option>2x1</option>
              </select>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminPromotions;
