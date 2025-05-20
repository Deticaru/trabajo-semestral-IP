import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import styled from 'styled-components';
import LogoLogin from "../../assets/images/login-banner-2000-slim-v3.png"
import LoginBackground from "../../assets/images/login-background.jpg"
import "./Login.css"

const Login: React.FC = () => {
  const [correo_usuario, setCorreo] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); 
  const navigate = useNavigate();
  
  // FONDO
  useEffect(() => {
    
    document.title = "Iniciar Sesión";
    document.body.classList.add("login-page");
    
    const root = document.getElementById("root");
    if (root) {
      root.classList.add("login-root");
    }

    // Set body background when this component is mounted
    document.body.style.backgroundImage = `url(${LoginBackground})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    const token = localStorage.getItem("access_token");
    if (token) {
      // Opcional: podrías verificar si el token es válido con el backend
      navigate("/Home");
      document.title = "Inicio";
    } else {
      setLoading(false); // solo mostramos login si no está logueado
    }

    return () => {
      document.body.classList.remove("login-page");
      if (root) root.classList.remove("login-root");
      // Reset when component unmounts (important!)
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundRepeat = "";
    };
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // CAMBIAR DESPUÉS
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        correo_usuario,
        password,
      });

      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      alert("¡Login Exitoso!");
      navigate("/Home");
      const root = document.getElementById("root");
      document.body.classList.remove("login-page");
      if (root) {
        root.classList.remove("login-root");
      }
    } catch (err) {
      console.error(err);
      setError("Correo o contraseña incorrectos");
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    
    <div>
      <StyledWrapper>
        <div className="grid grid-cols-2 gap-3 form-container2">
          <div className="col-span-1">
            <p className="title">Iniciar Sesión</p>

            {/* FORM */}
            <form className="form" onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="username">Correo</label>
                <input type="email" name="username" id="username" placeholder="Ingresa tu correo..." value={correo_usuario} onChange={(e) => setCorreo(e.target.value)} required/>
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <div className="forgot">
                  <a rel="noopener noreferrer" href="#">¿Olvidaste tu contraseña?</a>
                </div>
              </div>
              <button type="submit" className="sign">Iniciar Sesión</button>
            </form>
            {/* FORM */}

            <div className="social-message">
              <div className="line" />
              <p className="message">Acceso rápido</p>
              <div className="line" />
            </div>
            <div className="social-icons">
              <button aria-label="Log in with Google" className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                  <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z" />
                </svg>
              </button>
            </div>
            <p className="signup">¿No tienes una cuenta?
              <a rel="noopener noreferrer" href="#" > Registrarse</a>
            </p>
          </div>
          <div className="col-span-1" >
            <img src={LogoLogin} alt="" />
          </div>
        </div>
      </StyledWrapper>
    </div>
  );
  
};
const StyledWrapper = styled.div`


  .form-container2 {
    width: 1040px;
    border-radius: 0.75rem;
    background-color: rgba(17, 24, 39, 1);
    padding: 2rem;
    color: rgba(243, 244, 246, 1);
  }

  .form-container {
    width: 520px;
    border-radius: 0.75rem;
    background-color: rgba(17, 24, 39, 1);
    padding: 2rem;
    color: rgba(243, 244, 246, 1);
  }

  .title {
    text-align: center;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
  }

  .form {
    margin-top: 1.5rem;
  }

  .input-group {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .input-group label {
    display: block;
    text-align: start;
    color: rgba(156, 163, 175, 1);
    margin-bottom: 5px;
  }

  .input-group input {
    width: 100%;
    border-radius: 0.375rem;
    border: 1px solid rgba(55, 65, 81, 1);
    outline: 0;
    background-color: hsl(221, 39.30%, 11.00%);
    padding: 0.75rem 1rem;
    color: rgba(243, 244, 246, 1);
  }

  .input-group input:focus {
    border-color: rgba(167, 139, 250);
  }

  .forgot {
    display: flex;
    justify-content: flex-end;
    font-size: 0.75rem;
    line-height: 1rem;
    color: rgba(156, 163, 175,1);
    margin: 8px 0 14px 0;
  }

  .forgot a,.signup a {
    color: rgba(243, 244, 246, 1);
    text-decoration: none;
    font-size: 14px;
  }

  .forgot a:hover, .signup a:hover {
    text-decoration: underline rgb(0, 0, 0);
  }

  .sign {
    display: block;
    width: 100%;
    background-color: #a51d2d;
    padding: 0.75rem;
    text-align: center;
    color: rgb(255, 255, 255);
    border: none;
    border-radius: 0.375rem;
    font-weight: 600;
  }

  .sign:hover {
    background-color:#5f0e17;
  }

  .social-message {
    display: flex;
    align-items: center;
    padding-top: 1rem;
  }

  .line {
    height: 1px;
    flex: 1 1 0%;
    background-color: rgba(55, 65, 81, 1);
  }

  .social-message .message {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: rgba(156, 163, 175, 1);
  }

  .social-icons {
    display: flex;
    justify-content: center;
  }

  .social-icons .icon {
    border-radius: 0.125rem;
    padding: 0.75rem;
    border: none;
    background-color: transparent;
    margin-left: 8px;
  }

  .social-icons .icon svg {
    height: 1.25rem;
    width: 1.25rem;
    fill: #fff;
  }

  .signup {
    text-align: center;
    font-size: 0.75rem;
    line-height: 1rem;
    color: rgba(156, 163, 175, 1);
  }`;


export default Login;
