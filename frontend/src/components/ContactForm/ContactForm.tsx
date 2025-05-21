import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import styled from "styled-components";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
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
        <button type="submit">Enviar</button>
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
    max-width: 600px; /* Aumentado desde 400px */
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
    color: rgba(255, 255, 255, 0.85); /* Blanco con opacidad */
    width: 100%;
    outline: none;
  }

  .form input::placeholder,
  .form textarea::placeholder {
    color: rgba(255, 255, 255, 0.4); /* Placeholder gris claro */
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
