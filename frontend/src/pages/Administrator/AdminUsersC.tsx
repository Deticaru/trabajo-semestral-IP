import React, { useEffect, useState } from "react";
import AdminPanelMenu from "./AdminPanelMenu";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const API_URL = "http://localhost:8000/api/usuarios/";

const AdminUsersC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [tiposUsuario, setTiposUsuario] = useState<any[]>([]);
  const [form, setForm] = useState({
    nom_usuario: "",
    correo_usuario: "",
    telefono_usuario: "",
    tipo_usuario: "",
    password: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchUsers = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setUsers);
  };

  useEffect(fetchUsers, []);

  useEffect(() => {
    fetch("http://localhost:8000/api/tipo_usuario/")
      .then((res) => res.json())
      .then(setTiposUsuario);
  }, []);

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
        nom_usuario: "",
        correo_usuario: "",
        telefono_usuario: "",
        tipo_usuario: "",
        password: "",
      });
      setEditingId(null);
      fetchUsers();
    });
  };

  const handleEdit = (u: any) => {
    setForm({
      nom_usuario: u.nom_usuario,
      correo_usuario: u.correo_usuario,
      telefono_usuario: u.telefono_usuario,
      tipo_usuario: u.tipo_usuario?.id || u.tipo_usuario,
      password: "",
    });
    setEditingId(u.id);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("¿Eliminar usuario?")) {
      fetch(`${API_URL}${id}/`, { method: "DELETE" }).then(fetchUsers);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex">
        <AdminPanelMenu />
        <main className="flex-1 px-10 py-10">
          <h2 className="text-2xl font-bold text-purple-800 mb-8">
            CRUD Usuarios
          </h2>
          <form
            onSubmit={handleSubmit}
            className="mb-6 flex flex-col gap-2 max-w-xl"
          >
            <input
              name="nom_usuario"
              placeholder="Nombre"
              value={form.nom_usuario}
              onChange={handleChange}
              required
            />
            <input
              name="correo_usuario"
              placeholder="Correo"
              value={form.correo_usuario}
              onChange={handleChange}
              required
            />
            <input
              name="telefono_usuario"
              placeholder="Teléfono"
              value={form.telefono_usuario}
              onChange={handleChange}
              required
            />
            <select
              name="tipo_usuario"
              value={form.tipo_usuario}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un tipo de usuario</option>
              {tiposUsuario.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nom_tipo}
                </option>
              ))}
            </select>
            <input
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              type="password"
              required={!editingId}
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
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Tipo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.nom_usuario}</td>
                  <td>{u.correo_usuario}</td>
                  <td>{u.telefono_usuario}</td>
                  <td>{u.tipo_usuario?.nom_tipo || u.tipo_usuario}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(u)}
                      className="mr-2 text-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
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

export default AdminUsersC;
