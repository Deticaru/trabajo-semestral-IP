import React, { useEffect, useState } from "react";
import AdminPanelMenu from "./AdminPanelMenu";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const API_URL = `${import.meta.env.VITE_API_URL}/api/productos/`;

const AdminProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    nom_producto: "",
    desc_producto: "",
    precio_producto: "",
    marca_producto: "",
    tag_producto: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Funciones utilitarias
  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName?.toLowerCase() || "";
    if (name.includes("herramienta")) return "🔧";
    if (name.includes("pintura")) return "🎨";
    if (name.includes("material")) return "🧱";
    if (name.includes("eléctrico")) return "⚡";
    if (name.includes("plomería")) return "🔧";
    return "📦";
  };

  const getBrandColor = (brandName: string) => {
    const colors = [
      "from-blue-500 to-cyan-600",
      "from-purple-500 to-indigo-600",
      "from-green-500 to-emerald-600",
      "from-red-500 to-pink-600",
      "from-yellow-500 to-orange-600",
      "from-indigo-500 to-purple-600",
    ];
    const index = brandName?.length % colors.length || 0;
    return colors[index];
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getPriceCategory = (price: number) => {
    if (price < 10000)
      return { label: "Económico", color: "bg-green-100 text-green-700" };
    if (price < 50000)
      return { label: "Medio", color: "bg-yellow-100 text-yellow-700" };
    return { label: "Premium", color: "bg-purple-100 text-purple-700" };
  };

  const fetchProducts = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  };

  // Función de filtrado
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.nom_producto
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.desc_producto
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) =>
          product.categoria?.id === parseInt(selectedCategory) ||
          product.tag_producto === selectedCategory
      );
    }

    if (selectedBrand) {
      filtered = filtered.filter(
        (product) =>
          product.marca?.id === parseInt(selectedBrand) ||
          product.marca_producto === selectedBrand
      );
    }

    if (priceFilter) {
      const [min, max] = priceFilter.split("-").map(Number);
      filtered = filtered.filter((product) => {
        const price = parseFloat(product.precio_producto);
        return price >= min && (max ? price <= max : true);
      });
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, selectedBrand, priceFilter]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/marcas/`)
      .then((res) => res.json())
      .then(setBrands);
    fetch(`${import.meta.env.VITE_API_URL}/api/categorias/`)
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  useEffect(fetchProducts, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}${editingId}/` : API_URL;
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => {
      setForm({
        nom_producto: "",
        desc_producto: "",
        precio_producto: "",
        marca_producto: "",
        tag_producto: "",
      });
      setEditingId(null);
      setShowModal(false);
      fetchProducts();
    });
  };

  const handleEdit = (p: any) => {
    setForm({
      nom_producto: p.nom_producto,
      desc_producto: p.desc_producto,
      precio_producto: p.precio_producto,
      marca_producto: p.marca?.id || p.marca_producto,
      tag_producto: p.categoria?.id || p.tag_producto,
    });
    setEditingId(p.id);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("¿Eliminar producto?")) {
      fetch(`${API_URL}${id}/`, { method: "DELETE" }).then(fetchProducts);
    }
  };

  const openCreateModal = () => {
    setForm({
      nom_producto: "",
      desc_producto: "",
      precio_producto: "",
      marca_producto: "",
      tag_producto: "",
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
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                  🛍️
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">
                    Gestión de Productos
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Administra tu catálogo de productos
                  </p>
                </div>
              </div>
              <button
                onClick={openCreateModal}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <span className="text-lg">➕</span>
                Nuevo Producto
              </button>
            </div>
          </div>

          {/* Estadísticas del inventario */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-white text-xl">
                  📦
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Total Productos
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {products.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-xl">
                  💰
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Precio Promedio
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {products.length > 0
                      ? formatPrice(
                          products.reduce(
                            (sum, p) =>
                              sum + parseFloat(p.precio_producto || 0),
                            0
                          ) / products.length
                        )
                      : "$0"}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-xl">
                  🏷️
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Categorías
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {categories.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white text-xl">
                  🎯
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Marcas</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {brands.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Panel de filtros y búsqueda */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-white">
                🔍
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Filtros y Búsqueda
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="">Todas las categorías</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nom_categoria}
                  </option>
                ))}
              </select>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="">Todas las marcas</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.nom_marca}
                  </option>
                ))}
              </select>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="">Todos los precios</option>
                <option value="0-10000">Menos de $10.000</option>
                <option value="10000-50000">$10.000 - $50.000</option>
                <option value="50000-100000">$50.000 - $100.000</option>
                <option value="100000-">Más de $100.000</option>
              </select>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                  setSelectedBrand("");
                  setPriceFilter("");
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>

          {/* Grid de productos */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No hay productos
              </h3>
              <p className="text-gray-600 mb-6">
                {products.length === 0
                  ? "Comienza agregando tu primer producto"
                  : "No se encontraron productos con los filtros aplicados"}
              </p>
              <button
                onClick={openCreateModal}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Agregar Producto
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  {/* Imagen del producto */}
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl opacity-50">
                        {getCategoryIcon(product.categoria?.nom_categoria)}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          getPriceCategory(parseFloat(product.precio_producto))
                            .color
                        }`}
                      >
                        {
                          getPriceCategory(parseFloat(product.precio_producto))
                            .label
                        }
                      </span>
                    </div>
                  </div>

                  {/* Contenido del producto */}
                  <div className="p-6">
                    <div className="space-y-3">
                      {/* Nombre del producto */}
                      <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-purple-600 transition-colors">
                        {product.nom_producto}
                      </h3>

                      {/* Descripción */}
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {product.desc_producto}
                      </p>

                      {/* Precio destacado */}
                      <div className="text-center py-3">
                        <p className="text-3xl font-bold text-purple-600">
                          {formatPrice(parseFloat(product.precio_producto))}
                        </p>
                      </div>

                      {/* Marca y categoría */}
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getBrandColor(
                            product.marca?.nom_marca || ""
                          )}`}
                        >
                          🏷️{" "}
                          {product.marca?.nom_marca || product.marca_producto}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          {getCategoryIcon(product.categoria?.nom_categoria)}{" "}
                          {product.categoria?.nom_categoria ||
                            product.tag_producto}
                        </span>
                      </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex gap-2 mt-6">
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <span>✏️</span>
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
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

          {/* Modal para crear/editar producto */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {editingId ? "Editar Producto" : "Nuevo Producto"}
                    </h2>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Producto
                    </label>
                    <input
                      name="nom_producto"
                      placeholder="Ingresa el nombre del producto"
                      value={form.nom_producto}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción
                    </label>
                    <textarea
                      name="desc_producto"
                      placeholder="Describe el producto"
                      value={form.desc_producto}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precio
                    </label>
                    <input
                      name="precio_producto"
                      type="number"
                      placeholder="0"
                      value={form.precio_producto}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marca
                    </label>
                    <select
                      name="marca_producto"
                      value={form.marca_producto}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    >
                      <option value="">Selecciona una marca</option>
                      {brands.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.nom_marca}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría
                    </label>
                    <select
                      name="tag_producto"
                      value={form.tag_producto}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    >
                      <option value="">Selecciona una categoría</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nom_categoria}
                        </option>
                      ))}
                    </select>
                  </div>

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
                      className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
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

export default AdminProducts;
