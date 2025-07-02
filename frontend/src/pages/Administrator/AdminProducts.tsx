import React, { useEffect, useState } from "react";
import AdminPanelMenu from "./AdminPanelMenu";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const API_URL = `${import.meta.env.VITE_API_URL}/api/productos/`;

const AdminProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState({
    nom_producto: "",
    desc_producto: "",
    precio_producto: "",
    marca_producto: "",
    tag_producto: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchProducts = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setProducts);
  };

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
  };

  const handleDelete = (id: number) => {
    if (window.confirm("¿Eliminar producto?")) {
      fetch(`${API_URL}${id}/`, { method: "DELETE" }).then(fetchProducts);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex">
        <AdminPanelMenu />
        <main className="flex-1 px-10 py-10">
          <h2 className="text-2xl font-bold text-purple-800 mb-8">
            CRUD Productos
          </h2>
          <form
            onSubmit={handleSubmit}
            className="mb-6 flex flex-col gap-2 max-w-xl"
          >
            <input
              name="nom_producto"
              placeholder="Nombre"
              value={form.nom_producto}
              onChange={handleChange}
              required
            />
            <input
              name="desc_producto"
              placeholder="Descripción"
              value={form.desc_producto}
              onChange={handleChange}
              required
            />
            <input
              name="precio_producto"
              placeholder="Precio"
              value={form.precio_producto}
              onChange={handleChange}
              required
            />
            <select
              name="marca_producto"
              value={form.marca_producto}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una marca</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.nom_marca}
                </option>
              ))}
            </select>
            <select
              name="tag_producto"
              value={form.tag_producto}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nom_categoria}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-purple-700 text-white px-4 py-2 rounded"
            >
              {editingId ? "Actualizar" : "Crear"}
            </button>
          </form>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Marca</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.nom_producto}</td>
                  <td>{p.desc_producto}</td>
                  <td>{p.precio_producto}</td>
                  <td>{p.marca?.nom_marca || p.marca_producto}</td>
                  <td>{p.categoria?.nom_categoria || p.tag_producto}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(p)}
                      className="mr-2 text-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminProducts;
