import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const initialData = {
  nombre: "Juan Pérez",
  direccion: "Calle Falsa 123",
  telefono: "+56 9 1234 5678",
  email: "juan@email.com",
  password: "",
};

const Profile = () => {
  const [data, setData] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar los cambios
    alert("Datos actualizados correctamente");
  };

  return (
    <>
      <Navbar />
      <main className="max-w-xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">
          Configurar Perfil
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded shadow"
        >
          <div>
            <label className="block font-semibold mb-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={data.nombre}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={data.direccion}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={data.telefono}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Nueva contraseña"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-700 text-white py-2 rounded hover:bg-red-800 transition"
          >
            Guardar Cambios
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
