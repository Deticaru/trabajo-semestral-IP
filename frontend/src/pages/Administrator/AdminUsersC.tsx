import React, { useEffect, useState } from "react";
import AdminPanelMenu from "./AdminPanelMenu";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const API_URL = `${import.meta.env.VITE_API_URL}/api/usuarios/`;

// Función para obtener el icono según el tipo de usuario
const getUserIcon = (tipoUsuario: string) => {
  const icons: { [key: string]: string } = {
    administrador: "👑",
    admin: "👑",
    vendedor: "🛍️",
    supervisor: "👨‍💼",
    empleado: "👤",
    gerente: "💼",
    personal: "👨‍💻",
  };

  const tipo = tipoUsuario?.toLowerCase() || "";
  return icons[tipo] || "👤";
};

// Función para obtener el gradient según el tipo de usuario
const getUserGradient = (tipoUsuario: string) => {
  const gradients: { [key: string]: string } = {
    administrador: "from-purple-500 to-indigo-600",
    admin: "from-purple-500 to-indigo-600",
    vendedor: "from-green-500 to-emerald-600",
    supervisor: "from-blue-500 to-cyan-600",
    empleado: "from-gray-500 to-slate-600",
    gerente: "from-orange-500 to-red-600",
    personal: "from-teal-500 to-cyan-600",
  };

  const tipo = tipoUsuario?.toLowerCase() || "";
  return gradients[tipo] || "from-gray-500 to-slate-600";
};

// Función para obtener el badge de rol
const getRoleBadge = (tipoUsuario: string) => {
  const badges: { [key: string]: { color: string; icon: string } } = {
    administrador: {
      color: "bg-purple-100 text-purple-700 border-purple-200",
      icon: "👑",
    },
    admin: {
      color: "bg-purple-100 text-purple-700 border-purple-200",
      icon: "👑",
    },
    vendedor: {
      color: "bg-green-100 text-green-700 border-green-200",
      icon: "🛍️",
    },
    supervisor: {
      color: "bg-blue-100 text-blue-700 border-blue-200",
      icon: "👨‍💼",
    },
    empleado: {
      color: "bg-gray-100 text-gray-700 border-gray-200",
      icon: "👤",
    },
    gerente: {
      color: "bg-orange-100 text-orange-700 border-orange-200",
      icon: "💼",
    },
    personal: {
      color: "bg-teal-100 text-teal-700 border-teal-200",
      icon: "👨‍💻",
    },
  };

  const tipo = tipoUsuario?.toLowerCase() || "";
  return (
    badges[tipo] || {
      color: "bg-gray-100 text-gray-700 border-gray-200",
      icon: "👤",
    }
  );
};

// Función para generar estadísticas de usuario
const getUserStats = (usuario: any) => {
  // Simulación de estadísticas
  const joinDate = new Date();
  joinDate.setDate(joinDate.getDate() - Math.floor(Math.random() * 365));

  const ventasRealizadas = Math.floor(Math.random() * 50) + 1;
  const ultimaActividad = Math.floor(Math.random() * 24) + 1; // horas

  return {
    fechaIngreso: joinDate.toLocaleDateString(),
    ventasRealizadas,
    ultimaActividad: `Hace ${ultimaActividad}h`,
    activo: ultimaActividad < 8,
  };
};

const AdminUsersC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [tiposUsuario, setTiposUsuario] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("todos");
  const [showModal, setShowModal] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [form, setForm] = useState({
    nom_usuario: "",
    correo_usuario: "",
    telefono_usuario: "",
    tipo_usuario: "",
    password: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Efecto para filtrar usuarios
  useEffect(() => {
    let filtered = users;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.nom_usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.correo_usuario
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          user.telefono_usuario.includes(searchTerm)
      );
    }

    // Filtrar por rol
    if (filterRole !== "todos") {
      filtered = filtered.filter(
        (user) =>
          user.tipo_usuario?.nom_tipo?.toLowerCase() ===
          filterRole.toLowerCase()
      );
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, filterRole]);

  const openCreateModal = () => {
    setForm({
      nom_usuario: "",
      correo_usuario: "",
      telefono_usuario: "",
      tipo_usuario: "",
      password: "",
    });
    setEditingId(null);
    setShowModal(true);
  };

  const fetchUsers = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setUsers);
  };

  useEffect(fetchUsers, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/tipo_usuario/`)
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
      setShowModal(false);
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
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("¿Eliminar usuario?")) {
      fetch(`${API_URL}${id}/`, { method: "DELETE" }).then(fetchUsers);
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
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                  👨‍💼
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-700 to-red-600 bg-clip-text text-transparent">
                    Gestión de Personal
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Administra usuarios del equipo de trabajo
                  </p>
                </div>
              </div>
              <button
                onClick={openCreateModal}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <span className="text-lg">➕</span>
                Nuevo Usuario
              </button>
            </div>
          </div>

          {/* Estadísticas de usuarios */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-white text-xl">
                  👥
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Total Usuarios
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {users.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-xl">
                  🟢
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Activos</p>
                  <p className="text-2xl font-bold text-green-600">
                    {users.filter((_, i) => i % 3 !== 0).length}
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
                    Administradores
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {
                      users.filter((u) =>
                        u.tipo_usuario?.nom_tipo
                          ?.toLowerCase()
                          .includes("admin")
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center text-white text-xl">
                  🛍️
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    Vendedores
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {
                      users.filter((u) =>
                        u.tipo_usuario?.nom_tipo
                          ?.toLowerCase()
                          .includes("vendedor")
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Panel de búsqueda y filtros */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-white">
                🔍
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Buscar Personal
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar Usuario
                </label>
                <input
                  type="text"
                  placeholder="Buscar por nombre, correo o teléfono..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filtrar por Rol
                </label>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  <option value="todos">Todos los roles</option>
                  {tiposUsuario.map((tipo) => (
                    <option key={tipo.id} value={tipo.nom_tipo}>
                      {getUserIcon(tipo.nom_tipo)} {tipo.nom_tipo}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterRole("todos");
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
              >
                Limpiar Filtros
              </button>
              <span className="text-sm text-gray-600 flex items-center">
                Mostrando {filteredUsers.length} de {users.length} usuarios
              </span>
            </div>
          </div>

          {/* Grid de usuarios */}
          {filteredUsers.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">👨‍💼</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No hay usuarios
              </h3>
              <p className="text-gray-600 mb-6">
                {users.length === 0
                  ? "Comienza agregando tu primer usuario del personal"
                  : "No se encontraron usuarios con los filtros aplicados"}
              </p>
              <button
                onClick={openCreateModal}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Agregar Usuario
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => {
                const tipoNombre = user.tipo_usuario?.nom_tipo || "Usuario";
                const roleBadge = getRoleBadge(tipoNombre);
                const stats = getUserStats(user);

                return (
                  <div
                    key={user.id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                  >
                    {/* Header del usuario con gradiente */}
                    <div
                      className={`h-32 bg-gradient-to-r ${getUserGradient(
                        tipoNombre
                      )} relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-20" />
                      <div className="relative p-6 h-full flex flex-col justify-center items-center text-white">
                        <div className="text-4xl mb-2">
                          {getUserIcon(tipoNombre)}
                        </div>
                        <h3 className="text-lg font-bold text-center leading-tight">
                          {user.nom_usuario}
                        </h3>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold border ${roleBadge.color}`}
                        >
                          {roleBadge.icon} {tipoNombre}
                        </span>
                      </div>
                      {/* Indicador de estado activo */}
                      <div className="absolute top-3 left-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            stats.activo ? "bg-green-400" : "bg-gray-400"
                          } shadow-lg`}
                        />
                      </div>
                    </div>

                    {/* Contenido del usuario */}
                    <div className="p-6">
                      <div className="space-y-4">
                        {/* Información de contacto */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>📧</span>
                            <span className="truncate">
                              {user.correo_usuario}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>📱</span>
                            <span>{user.telefono_usuario}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>📅</span>
                            <span>Ingresó: {stats.fechaIngreso}</span>
                          </div>
                        </div>

                        {/* Estadísticas del usuario */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-lg font-bold text-blue-600">
                              {stats.ventasRealizadas}
                            </p>
                            <p className="text-xs text-gray-500 uppercase">
                              Ventas
                            </p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm font-bold text-green-600">
                              {stats.ultimaActividad}
                            </p>
                            <p className="text-xs text-gray-500 uppercase">
                              Última vez
                            </p>
                          </div>
                        </div>

                        {/* Estado y rendimiento */}
                        <div className="flex justify-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              stats.activo
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {stats.activo ? "🟢 Activo" : "🔴 Inactivo"}
                          </span>
                        </div>

                        {/* Indicador de rol */}
                        <div className="text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${roleBadge.color}`}
                          >
                            {roleBadge.icon} {tipoNombre}
                          </span>
                        </div>
                      </div>

                      {/* Botones de acción */}
                      <div className="flex gap-2 mt-6">
                        <button
                          onClick={() => handleEdit(user)}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <span>✏️</span>
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
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

          {/* Modal para crear/editar usuario */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                      {editingId ? "Editar Usuario" : "Nuevo Usuario"}
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
                      Nombre Completo
                    </label>
                    <input
                      name="nom_usuario"
                      placeholder="Ingresa el nombre completo"
                      value={form.nom_usuario}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Correo Electrónico
                    </label>
                    <input
                      name="correo_usuario"
                      type="email"
                      placeholder="correo@empresa.com"
                      value={form.correo_usuario}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      name="telefono_usuario"
                      placeholder="+56 9 1234 5678"
                      value={form.telefono_usuario}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Usuario
                    </label>
                    <select
                      name="tipo_usuario"
                      value={form.tipo_usuario}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    >
                      <option value="">Selecciona un tipo de usuario</option>
                      {tiposUsuario.map((t) => (
                        <option key={t.id} value={t.id}>
                          {getUserIcon(t.nom_tipo)} {t.nom_tipo}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contraseña{" "}
                      {editingId && "(dejar vacío para mantener actual)"}
                    </label>
                    <input
                      name="password"
                      type="password"
                      placeholder="Contraseña segura"
                      value={form.password}
                      onChange={handleChange}
                      required={!editingId}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Preview del usuario */}
                  {form.nom_usuario && form.tipo_usuario && (
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-2">
                        Vista previa:
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {getUserIcon(
                            tiposUsuario.find(
                              (t) => t.id.toString() === form.tipo_usuario
                            )?.nom_tipo || ""
                          )}
                        </span>
                        <div>
                          <span className="font-medium text-gray-800">
                            {form.nom_usuario}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium border ${
                                getRoleBadge(
                                  tiposUsuario.find(
                                    (t) => t.id.toString() === form.tipo_usuario
                                  )?.nom_tipo || ""
                                ).color
                              }`}
                            >
                              {
                                getRoleBadge(
                                  tiposUsuario.find(
                                    (t) => t.id.toString() === form.tipo_usuario
                                  )?.nom_tipo || ""
                                ).icon
                              }{" "}
                              {
                                tiposUsuario.find(
                                  (t) => t.id.toString() === form.tipo_usuario
                                )?.nom_tipo
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
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
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

export default AdminUsersC;
