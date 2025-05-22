import React, { useEffect, useState } from "react";
import AdminPanelMenu from "./AdminPanelMenu";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const API_URL = "http://localhost:8000/api/categorias/";

const AdminCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState({ nom_categoria: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchCategories = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setCategories);
  };

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
      body: JSON.stringify(form),
    }).then(() => {
      setForm({ nom_categoria: "" });
      setEditingId(null);
      fetchCategories();
    });
  };

  const handleEdit = (c: any) => {
    setForm({ nom_categoria: c.nom_categoria });
    setEditingId(c.id);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("¿Eliminar categoría?")) {
      fetch(`${API_URL}${id}/`, { method: "DELETE" }).then(fetchCategories);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex">
        <AdminPanelMenu />
        <main className="flex-1 px-10 py-10">
          <h2 className="text-2xl font-bold text-purple-800 mb-8">
            CRUD Categorías
          </h2>
          <form
            onSubmit={handleSubmit}
            className="mb-6 flex flex-col gap-2 max-w-xl"
          >
            <input
              name="nom_categoria"
              placeholder="Nombre Categoría"
              value={form.nom_categoria}
              onChange={handleChange}
              required
            />
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
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id}>
                  <td>{c.nom_categoria}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(c)}
                      className="mr-2 text-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
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

export default AdminCategories;
