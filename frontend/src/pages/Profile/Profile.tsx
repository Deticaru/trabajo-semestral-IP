import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Profile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
    password: "",
  });
  const [originalData, setOriginalData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [editFields, setEditFields] = useState({
    nombre: false,
    direccion: false,
    telefono: false,
    password: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/Login");
      return;
    }
    axios
      .get("http://127.0.0.1:8000/api/profile/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const userData = {
          nombre: res.data.nom_usuario || "",
          direccion: res.data.direccion || "",
          telefono: res.data.telefono_usuario || "",
          email: res.data.correo_usuario || "",
          password: "",
        };
        setData(userData);
        setOriginalData(userData);
        setLoading(false);
      })
      .catch(() => {
        navigate("/Login");
      });
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleEditClick = (field: string) => {
    setEditFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    if (!token) return;
    // Solo enviar los campos que cambiaron
    const updates: any = {};
    if (data.nombre !== originalData.nombre) updates.nom_usuario = data.nombre;
    if (data.direccion !== originalData.direccion)
      updates.direccion = data.direccion;
    if (data.telefono !== originalData.telefono)
      updates.telefono_usuario = data.telefono;
    if (data.password && data.password !== "") updates.password = data.password;
    if (Object.keys(updates).length === 0) {
      alert("No hay cambios para guardar.");
      return;
    }
    try {
      await axios.put("http://127.0.0.1:8000/api/profile/", updates, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Datos actualizados correctamente");
      setOriginalData({ ...data, password: "" });
      setData((prev) => ({ ...prev, password: "" }));
      window.location.reload(); // Recarga la página para resetear los campos
    } catch (err) {
      alert("Error al actualizar los datos");
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <>
      <Navbar />
      <StyledWrapper>
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
              <div className="input-edit-wrapper">
                <input
                  type="text"
                  name="nombre"
                  value={data.nombre}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  disabled={!editFields.nombre}
                />
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => handleEditClick("nombre")}
                  tabIndex={-1}
                >
                  <svg className="edit-svgIcon" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1">Dirección</label>
              <div className="input-edit-wrapper">
                <input
                  type="text"
                  name="direccion"
                  value={data.direccion}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder=""
                  disabled={!editFields.direccion}
                />
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => handleEditClick("direccion")}
                  tabIndex={-1}
                >
                  <svg className="edit-svgIcon" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1">Teléfono</label>
              <div className="input-edit-wrapper">
                <input
                  type="text"
                  name="telefono"
                  value={data.telefono}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  disabled={!editFields.telefono}
                />
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => handleEditClick("telefono")}
                  tabIndex={-1}
                >
                  <svg className="edit-svgIcon" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                  </svg>
                </button>
              </div>
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
              <div className="input-edit-wrapper">
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Nueva contraseña"
                  disabled={!editFields.password}
                />
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => handleEditClick("password")}
                  tabIndex={-1}
                >
                  <svg className="edit-svgIcon" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                  </svg>
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-red-700 text-white py-2 rounded hover:bg-red-800 transition"
            >
              Guardar Cambios
            </button>
          </form>
        </main>
      </StyledWrapper>
      <Footer />
    </>
  );
};

const StyledWrapper = styled.div`
  .input-edit-wrapper {
    position: relative;
    width: 100%;
  }
  .input-edit-wrapper input {
    width: 100%;
    padding-right: 48px; /* espacio para el botón */
  }
  .input-edit-wrapper input:disabled,
  input[disabled] {
    background-color: #f1f1f1 !important;
    color: #a0a0a0 !important;
    cursor: not-allowed;
    border-color: #e0e0e0;
  }
  .edit-button {
    position: absolute;
    right: 2px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    width: 38px;
    height: 38px;
    border-radius: 20%;
    background-color: rgb(20, 20, 20);
    border: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
    cursor: pointer;
    transition-duration: 0.3s;
    overflow: hidden;
    text-decoration: none !important;
  }
  .edit-svgIcon {
    width: 17px;
    transition-duration: 0.3s;
  }
  .edit-svgIcon path {
    fill: white;
  }
  .edit-button:hover {
    width: 120px;
    border-radius: 10px;
    transition-duration: 0.3s;
    background-color: #a51d2d;
    align-items: center;
  }
  .edit-button:hover .edit-svgIcon {
    width: 20px;
    transition-duration: 0.3s;
    transform: translateY(60%);
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
  .edit-button::before {
    display: none;
    content: "Editar";
    color: white;
    transition-duration: 0.3s;
    font-size: 2px;
  }
  .edit-button:hover::before {
    display: block;
    padding-right: 10px;
    font-size: 13px;
    opacity: 1;
    transform: translateY(0px);
    transition-duration: 0.3s;
  }
`;

export default Profile;
