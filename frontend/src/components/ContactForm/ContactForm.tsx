import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import axios from "axios"; // Agrega esta línea

const SERVICE_ID = "service_ln2frmg";
const TEMPLATE_ID = "template_gi2llgy";
const PUBLIC_KEY = "qdkFnM8pCKZJTQYYk";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setSuccess(null);

    try {
      // 1. Envía los datos al backend
      await axios.post(`${import.meta.env.VITE_API_URL}/api/contacto/`, {
        nombre: formData.name,
        correo: formData.email,
        mensaje: formData.message,
      });

      // 2. Envía el correo con EmailJS (como ya lo tienes)
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          time: new Date().toLocaleString(), // 👈 Añade esta línea
        },
        PUBLIC_KEY
      );

      setSuccess("¡Mensaje enviado correctamente!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSuccess("Hubo un error al enviar el mensaje.");
    } finally {
      setSending(false);
    }
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">Contáctanos</div>
        <input
          type="text"
          name="name"
          placeholder="Tu nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Tu correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Tu mensaje"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={sending}>
          {sending ? "Enviando..." : "Enviar"}
        </button>
        {success && <div style={{ color: "#fff", marginTop: 10 }}>{success}</div>}
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 5rem;

  .form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 600px;
    background-color: #111827;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 30px 30px -20px rgba(0, 0, 0, 0.4);
  }

  .form .title {
    color: #ffffff;
    font-size: 28px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
  }

  .form input,
  .form textarea {
    background-color: #1f2937;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    padding: 12px 16px;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.85);
    width: 100%;
    outline: none;
  }

  .form input::placeholder,
  .form textarea::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  .form textarea {
    resize: none;
    height: 120px;
  }

  .form button {
    align-self: flex-end;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    background-color: #a51d2d;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .form button:hover {
    background-color: #5f0e17;
  }
`;

export default ContactForm;
