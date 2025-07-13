import React, { useEffect, useState } from "react";
import AdminPanelMenu from "./AdminPanelMenu";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const API_URL = `${import.meta.env.VITE_API_URL}/api/categorias/`;

const AdminCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    nom_categoria: "",
    descripcion: "",
    color: "#6366f1",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Funciones utilitarias
  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName?.toLowerCase() || "";
    if (name.includes("herramienta")) return "🔧";
    if (name.includes("pintura")) return "🎨";
    if (name.includes("material")) return "🧱";
    if (name.includes("eléctrico") || name.includes("electrico")) return "⚡";
    if (name.includes("plomería") || name.includes("plomeria")) return "🔧";
    if (name.includes("jardín") || name.includes("jardin")) return "🌱";
    if (name.includes("seguridad")) return "🛡️";
    if (name.includes("ferretería") || name.includes("ferreteria")) return "🏪";
    if (name.includes("construcción") || name.includes("construccion"))
      return "🏗️";
    if (name.includes("limpieza")) return "🧽";
    return "📂";
  };

  const getCategoryGradient = (index: number) => {
    const gradients = [
      "from-blue-500 to-cyan-600",
      "from-purple-500 to-indigo-600",
      "from-green-500 to-emerald-600",
      "from-red-500 to-pink-600",
      "from-yellow-500 to-orange-600",
      "from-indigo-500 to-purple-600",
      "from-teal-500 to-blue-600",
      "from-pink-500 to-rose-600",
      "from-orange-500 to-red-600",
      "from-cyan-500 to-blue-600",
    ];
    return gradients[index % gradients.length];
  };

  const getCategoryUsage = (categoryName: string) => {
    // Simulamos el uso de categorías (en un app real vendría del backend)
    const usageData: { [key: string]: number } = {
      herramientas: 45,
      pinturas: 32,
      materiales: 28,
      eléctrico: 15,
      plomería: 22,
      jardín: 18,
      seguridad: 12,
      ferretería: 38,
      construcción: 25,
      limpieza: 14,
    };
    const key = categoryName?.toLowerCase() || "";
    return usageData[key] || Math.floor(Math.random() * 50) + 5;
  };

  const fetchCategories = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setFilteredCategories(data);
      });
  };

  // Función de filtrado
  useEffect(() => {
    let filtered = categories;

    if (searchTerm) {
      filtered = filtered.filter((category) =>
        category.nom_categoria?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCategories(filtered);
  }, [categories, searchTerm]);

  useEffect(fetchCategories, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}${editingId}/` : API_URL;
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom_categoria: form.nom_categoria }),
    }).then(() => {
      setForm({
        nom_categoria: "",
        descripcion: "",
        color: "#6366f1",
      });
      setEditingId(null);
      setShowModal(false);
      fetchCategories();
    });
  };

  const handleEdit = (c: any) => {
    setForm({
      nom_categoria: c.nom_categoria,
      descripcion: c.descripcion || "",
      color: c.color || "#6366f1",
    });
    setEditingId(c.id);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("¿Eliminar categoría?")) {
      fetch(`${API_URL}${id}/`, { method: "DELETE" }).then(fetchCategories);
    }
  };

  const openCreateModal = () => {
    setForm({
      nom_categoria: "",
      descripcion: "",
      color: "#6366f1",
    });
    setEditingId(null);
    setShowModal(true);
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
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                  📂
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent">
                    Gestión de Categorías
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Organiza tu catálogo por categorías
                  </p>
                </div>
              </div>
              <button
                onClick={openCreateModal}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <span className="text-lg">➕</span>
                Nueva Categoría
              </button>
            </div>
          </div>

          {/* Estadísticas de categorías */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-white text-xl">
                  📂
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Total Categorías
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {categories.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-xl">
                  📈
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Más Usada</p>
                  <p className="text-lg font-bold text-green-600">
                    {categories.length > 0
                      ? categories.reduce((prev, current) =>
                          getCategoryUsage(prev.nom_categoria) >
                          getCategoryUsage(current.nom_categoria)
                            ? prev
                            : current
                        ).nom_categoria || "N/A"
                      : "N/A"}
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
                    Productos Totales
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {categories.reduce(
                      (sum, cat) => sum + getCategoryUsage(cat.nom_categoria),
                      0
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Panel de búsqueda */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-white">
                🔍
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Buscar Categorías
              </h3>
            </div>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Buscar categorías..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <button
                onClick={() => setSearchTerm("")}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
              >
                Limpiar
              </button>
            </div>
          </div>

          {/* Grid de categorías */}
          {filteredCategories.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">📂</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No hay categorías
              </h3>
              <p className="text-gray-600 mb-6">
                {categories.length === 0
                  ? "Comienza creando tu primera categoría"
                  : "No se encontraron categorías con los filtros aplicados"}
              </p>
              <button
                onClick={openCreateModal}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Crear Categoría
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map((category, index) => (
                <div
                  key={category.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  {/* Header de la categoría con gradiente */}
                  <div
                    className={`h-32 bg-gradient-to-r ${getCategoryGradient(
                      index
                    )} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-20" />
                    <div className="relative p-6 h-full flex flex-col justify-center items-center text-white">
                      <div className="text-4xl mb-2">
                        {getCategoryIcon(category.nom_categoria)}
                      </div>
                      <h3 className="text-lg font-bold text-center leading-tight">
                        {category.nom_categoria}
                      </h3>
                    </div>
                  </div>

                  {/* Contenido de la categoría */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {/* Estadísticas de uso */}
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">
                          Productos en esta categoría
                        </p>
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-2xl font-bold text-purple-600">
                            {getCategoryUsage(category.nom_categoria)}
                          </span>
                          <span className="text-sm text-gray-500">
                            productos
                          </span>
                        </div>
                      </div>

                      {/* Barra de progreso de uso */}
                      <div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Popularidad</span>
                          <span>
                            {Math.min(
                              getCategoryUsage(category.nom_categoria) * 2,
                              100
                            )}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r ${getCategoryGradient(
                              index
                            )} h-2 rounded-full transition-all duration-500`}
                            style={{
                              width: `${Math.min(
                                getCategoryUsage(category.nom_categoria) * 2,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Badge de estado */}
                      <div className="flex justify-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            getCategoryUsage(category.nom_categoria) > 30
                              ? "bg-green-100 text-green-700"
                              : getCategoryUsage(category.nom_categoria) > 15
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {getCategoryUsage(category.nom_categoria) > 30
                            ? "🔥 Popular"
                            : getCategoryUsage(category.nom_categoria) > 15
                            ? "📊 Activa"
                            : "💤 Poco usada"}
                        </span>
                      </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex gap-2 mt-6">
                      <button
                        onClick={() => handleEdit(category)}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <span>✏️</span>
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <span>🗑️</span>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal para crear/editar categoría */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                      {editingId ? "Editar Categoría" : "Nueva Categoría"}
                    </h2>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-white hover:text-gray-200 text-2xl"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de la Categoría
                    </label>
                    <input
                      name="nom_categoria"
                      placeholder="Ingresa el nombre de la categoría"
                      value={form.nom_categoria}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Preview de la categoría */}
                  {form.nom_categoria && (
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-2">
                        Vista previa:
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {getCategoryIcon(form.nom_categoria)}
                        </span>
                        <span className="font-medium text-gray-800">
                          {form.nom_categoria}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 bg-gray-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-600 transition-all"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      {editingId ? "Actualizar" : "Crear"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminCategories;
