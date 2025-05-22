import React, { useEffect, useState } from "react";
import AdminPanelMenu from "./AdminPanelMenu";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const API_URL = "http://localhost:8000/api/marcas/";

const AdminBrands = () => {
  const [brands, setBrands] = useState<any[]>([]);
  const [form, setForm] = useState({ nom_marca: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchBrands = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setBrands);
  };

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
      body: JSON.stringify(form),
    }).then(() => {
      setForm({ nom_marca: "" });
      setEditingId(null);
      fetchBrands();
    });
  };

  const handleEdit = (b: any) => {
    setForm({ nom_marca: b.nom_marca });
    setEditingId(b.id);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("¿Eliminar marca?")) {
      fetch(`${API_URL}${id}/`, { method: "DELETE" }).then(fetchBrands);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex">
        <AdminPanelMenu />
        <main className="flex-1 px-10 py-10">
          <h2 className="text-2xl font-bold text-purple-800 mb-8">
            CRUD Marcas
          </h2>
          <form
            onSubmit={handleSubmit}
            className="mb-6 flex flex-col gap-2 max-w-xl"
          >
            <input
              name="nom_marca"
              placeholder="Nombre Marca"
              value={form.nom_marca}
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
              {brands.map((b) => (
                <tr key={b.id}>
                  <td>{b.nom_marca}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(b)}
                      className="mr-2 text-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
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

export default AdminBrands;
