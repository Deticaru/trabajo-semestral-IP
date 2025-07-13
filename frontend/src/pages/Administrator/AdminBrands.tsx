import React, { useEffect, useState } from "react";
import AdminPanelMenu from "./AdminPanelMenu";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const API_URL = `${import.meta.env.VITE_API_URL}/api/marcas/`;

const AdminBrands = () => {
  const [brands, setBrands] = useState<any[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    nom_marca: "",
    descripcion: "",
    pais_origen: "",
    año_fundacion: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Funciones utilitarias
  const getBrandIcon = (brandName: string) => {
    const name = brandName?.toLowerCase() || "";
    // Marcas conocidas de herramientas/ferretería
    if (name.includes("bosch")) return "🔧";
    if (name.includes("dewalt")) return "⚡";
    if (name.includes("makita")) return "🔨";
    if (name.includes("milwaukee")) return "🛠️";
    if (name.includes("stanley")) return "📏";
    if (name.includes("black") || name.includes("decker")) return "🔌";
    if (name.includes("ryobi")) return "🌱";
    if (name.includes("hitachi")) return "⚙️";
    if (name.includes("craftsman")) return "🔩";
    if (name.includes("ridgid")) return "🔧";
    if (name.includes("sherwin") || name.includes("williams")) return "🎨";
    if (name.includes("behr")) return "🎨";
    if (name.includes("valspar")) return "🖌️";
    if (name.includes("benjamin") || name.includes("moore")) return "🎨";
    // Marcas genéricas por tipo
    if (name.includes("paint") || name.includes("pintur")) return "🎨";
    if (name.includes("tool") || name.includes("herramienta")) return "🔧";
    if (name.includes("electric") || name.includes("eléctric")) return "⚡";
    return "🏷️";
  };

  const getBrandGradient = (index: number) => {
    const gradients = [
      "from-violet-500 to-purple-600",
      "from-blue-500 to-indigo-600",
      "from-emerald-500 to-teal-600",
      "from-orange-500 to-red-600",
      "from-pink-500 to-rose-600",
      "from-cyan-500 to-blue-600",
      "from-yellow-500 to-orange-600",
      "from-purple-500 to-pink-600",
      "from-indigo-500 to-blue-600",
      "from-teal-500 to-green-600",
    ];
    return gradients[index % gradients.length];
  };

  const getBrandPopularity = (brandName: string) => {
    // Simulamos la popularidad de marcas (en un app real vendría del backend)
    const popularityData: { [key: string]: number } = {
      bosch: 95,
      dewalt: 88,
      makita: 85,
      milwaukee: 82,
      stanley: 78,
      "black & decker": 75,
      ryobi: 70,
      hitachi: 68,
      craftsman: 65,
      ridgid: 62,
      "sherwin williams": 90,
      behr: 75,
      valspar: 70,
      "benjamin moore": 85,
    };
    const key = brandName?.toLowerCase() || "";
    return popularityData[key] || Math.floor(Math.random() * 60) + 30;
  };

  const getBrandProducts = (brandName: string) => {
    // Simulamos cantidad de productos por marca
    return Math.floor(Math.random() * 50) + 5;
  };

  const getBrandCategory = (popularity: number) => {
    if (popularity >= 80)
      return {
        label: "Premium",
        color: "bg-purple-100 text-purple-700",
        icon: "👑",
      };
    if (popularity >= 60)
      return {
        label: "Popular",
        color: "bg-green-100 text-green-700",
        icon: "🔥",
      };
    return {
      label: "Emergente",
      color: "bg-blue-100 text-blue-700",
      icon: "🌟",
    };
  };

  const fetchBrands = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setBrands(data);
        setFilteredBrands(data);
      });
  };

  // Función de filtrado
  useEffect(() => {
    let filtered = brands;

    if (searchTerm) {
      filtered = filtered.filter((brand) =>
        brand.nom_marca?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBrands(filtered);
  }, [brands, searchTerm]);

  useEffect(fetchBrands, []);

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
      body: JSON.stringify({ nom_marca: form.nom_marca }),
    }).then(() => {
      setForm({
        nom_marca: "",
        descripcion: "",
        pais_origen: "",
        año_fundacion: "",
      });
      setEditingId(null);
      setShowModal(false);
      fetchBrands();
    });
  };

  const handleEdit = (b: any) => {
    setForm({
      nom_marca: b.nom_marca,
      descripcion: b.descripcion || "",
      pais_origen: b.pais_origen || "",
      año_fundacion: b.año_fundacion || "",
    });
    setEditingId(b.id);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("¿Eliminar marca?")) {
      fetch(`${API_URL}${id}/`, { method: "DELETE" }).then(fetchBrands);
    }
  };

  const openCreateModal = () => {
    setForm({
      nom_marca: "",
      descripcion: "",
      pais_origen: "",
      año_fundacion: "",
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
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                  🏷️
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-700 to-purple-600 bg-clip-text text-transparent">
                    Gestión de Marcas
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Administra las marcas de tu inventario
                  </p>
                </div>
              </div>
              <button
                onClick={openCreateModal}
                className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <span className="text-lg">➕</span>
                Nueva Marca
              </button>
            </div>
          </div>

          {/* Estadísticas de marcas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-white text-xl">
                  🏷️
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Total Marcas
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {brands.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-xl">
                  👑
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Marcas Premium
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {
                      brands.filter(
                        (b) => getBrandPopularity(b.nom_marca) >= 80
                      ).length
                    }
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
                  <p className="text-sm text-gray-600 font-medium">
                    Más Popular
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    {brands.length > 0
                      ? brands.reduce((prev, current) =>
                          getBrandPopularity(prev.nom_marca) >
                          getBrandPopularity(current.nom_marca)
                            ? prev
                            : current
                        ).nom_marca || "N/A"
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white text-xl">
                  📦
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Productos Totales
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {brands.reduce(
                      (sum, brand) => sum + getBrandProducts(brand.nom_marca),
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
                Buscar Marcas
              </h3>
            </div>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Buscar marcas..."
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

          {/* Grid de marcas */}
          {filteredBrands.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">🏷️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No hay marcas
              </h3>
              <p className="text-gray-600 mb-6">
                {brands.length === 0
                  ? "Comienza agregando tu primera marca"
                  : "No se encontraron marcas con los filtros aplicados"}
              </p>
              <button
                onClick={openCreateModal}
                className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Agregar Marca
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBrands.map((brand, index) => {
                const popularity = getBrandPopularity(brand.nom_marca);
                const products = getBrandProducts(brand.nom_marca);
                const category = getBrandCategory(popularity);

                return (
                  <div
                    key={brand.id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                  >
                    {/* Header de la marca con gradiente */}
                    <div
                      className={`h-32 bg-gradient-to-r ${getBrandGradient(
                        index
                      )} relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-20" />
                      <div className="relative p-6 h-full flex flex-col justify-center items-center text-white">
                        <div className="text-4xl mb-2">
                          {getBrandIcon(brand.nom_marca)}
                        </div>
                        <h3 className="text-lg font-bold text-center leading-tight">
                          {brand.nom_marca}
                        </h3>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${category.color}`}
                        >
                          {category.icon} {category.label}
                        </span>
                      </div>
                    </div>

                    {/* Contenido de la marca */}
                    <div className="p-6">
                      <div className="space-y-4">
                        {/* Estadísticas de la marca */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold text-purple-600">
                              {products}
                            </p>
                            <p className="text-xs text-gray-500 uppercase">
                              Productos
                            </p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">
                              {popularity}%
                            </p>
                            <p className="text-xs text-gray-500 uppercase">
                              Popularidad
                            </p>
                          </div>
                        </div>

                        {/* Barra de progreso de popularidad */}
                        <div>
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Ranking de marca</span>
                            <span>{popularity}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`bg-gradient-to-r ${getBrandGradient(
                                index
                              )} h-2 rounded-full transition-all duration-500`}
                              style={{ width: `${popularity}%` }}
                            />
                          </div>
                        </div>

                        {/* Información adicional */}
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <span>📦</span>
                            <span>{products} productos disponibles</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>⭐</span>
                            <span>Popularidad: {popularity}%</span>
                          </div>
                        </div>

                        {/* Indicador de rendimiento */}
                        <div className="flex justify-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              popularity >= 80
                                ? "bg-purple-100 text-purple-700"
                                : popularity >= 60
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {popularity >= 80
                              ? "🏆 Marca líder"
                              : popularity >= 60
                              ? "🔥 Muy popular"
                              : "⭐ En crecimiento"}
                          </span>
                        </div>
                      </div>

                      {/* Botones de acción */}
                      <div className="flex gap-2 mt-6">
                        <button
                          onClick={() => handleEdit(brand)}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <span>✏️</span>
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(brand.id)}
                          className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <span>🗑️</span>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Modal para crear/editar marca */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
                <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white p-6 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                      {editingId ? "Editar Marca" : "Nueva Marca"}
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
                      Nombre de la Marca
                    </label>
                    <input
                      name="nom_marca"
                      placeholder="Ingresa el nombre de la marca"
                      value={form.nom_marca}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Preview de la marca */}
                  {form.nom_marca && (
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-2">
                        Vista previa:
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {getBrandIcon(form.nom_marca)}
                        </span>
                        <div>
                          <span className="font-medium text-gray-800">
                            {form.nom_marca}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                getBrandCategory(
                                  getBrandPopularity(form.nom_marca)
                                ).color
                              }`}
                            >
                              {
                                getBrandCategory(
                                  getBrandPopularity(form.nom_marca)
                                ).icon
                              }{" "}
                              {
                                getBrandCategory(
                                  getBrandPopularity(form.nom_marca)
                                ).label
                              }
                            </span>
                          </div>
                        </div>
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
                      className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
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

export default AdminBrands;
