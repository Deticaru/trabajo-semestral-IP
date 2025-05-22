import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import styled from 'styled-components';
import LogoLogin from "../../assets/images/login-banner-2000-slim-v3.png"
import LoginBackground from "../../assets/images/login-background.jpg"
import "./Login.css"

const Login: React.FC = () => {
  const [isLoggingIn, setisLoggingIn] = useState(true);

  const [correo_usuario, setCorreo] = useState<string>("");
  const [nombre_usuario, setNombre] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); 
  const navigate = useNavigate();
  const [loginVisible, setLoginVisible] = useState(true);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  
  // el error aquí es para quitar un mensaje de alerta de vscode, pero si es necesario la const 'error'
  error;

  // FONDO
  useEffect(() => {
    
    document.title = "Iniciar Sesión";
    document.body.classList.add("login-page");
    
    const root = document.getElementById("root");
    if (root) {
      root.classList.add("login-root");
    }

    document.body.style.backgroundImage = `url(${LoginBackground})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/Home");
      document.title = "Inicio";
    } else {
      setLoading(false);
    }

    return () => {
      document.body.classList.remove("login-page");
      if (root) root.classList.remove("login-root");
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundRepeat = "";
    };
  }, []);

  const Logging = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isLoggingIn === true) {
      alert("Está iniciando Sesión");
    } else {
      alert("Se está registrando");
    }
  };

  const handleRegisterClick = () => {
    setLoginVisible(false);
    setTimeout(() => {
      setisLoggingIn(false);
    }, 500);
    setTimeout(() => {
      setRegisterVisible(true);
    }, 600);
  };

  const handleBackToLogin = () => {
    setRegisterVisible(false);
    setTimeout(() => {
      setisLoggingIn(true);
    }, 500);
    setTimeout(() => {
      setLoginVisible(true);
    }, 600);
  };
  
  const handleTelefono = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberRegex = /^[0-9]*$/;
    if (numberRegex.test(value)) {
      setInputValue(value);
    }
  };

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

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/registrar/", {
        nom_usuario: nombre_usuario,
        correo_usuario,
        telefono_usuario: inputValue,
        password,
        recibe_ofertas: (document.getElementById('feed') as HTMLInputElement)?.checked || false,
      });
      if (response.data.success) {
        alert('Usuario registrado correctamente');
        setisLoggingIn(true);
        setRegisterVisible(false);
        setLoginVisible(true);
      } else {
        setError(response.data.error || 'Error al registrar usuario');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al registrar usuario');
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    
    <div>
      <StyledWrapper>
        {/* INICIAR SESIÓN */}
        {isLoggingIn && ( 
          
          <div className={`grid grid-cols-2 gap-3 form-container2 relative ${isLoggingIn ? (loginVisible ? 'fade-in' : 'fade-out') : 'hidden'}`}>
            <div className="col-span-1">
              <div className="grid grid-cols-3">
                <div className="col-span-1">
                  <button
                    className="bg-white text-center w-35 rounded-2xl h-12 relative text-white text-xl font-semibold group"
                    type="button"
                    onClick={() => {
                      navigate("/Home");
                    }}
                  >
                    <div className="bg-red-800 rounded-xl h-10 w-1/4 flex items-center justify-center absolute left-1 top-[3px] group-hover:w-[130px] z-10 duration-600">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="25px" width="25px">
                        <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#000000" />
                        <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="#000000" />
                      </svg>
                    </div>
                    <p className="translate-x-2">Volver</p>
                  </button>
                </div>
              </div>
              <br />
              <p className="title">Iniciar Sesión</p>

              {/* FORM */}
              <form className="form" onSubmit={handleLogin}>
                {/* CORREO */}
                <div className="input-group">
                  <label htmlFor="username">Correo</label>
                  <input maxLength={30} type="email" name="username" id="username" placeholder="Ingresa tu correo..." value={correo_usuario} onChange={(e) => setCorreo(e.target.value)} required/>
                </div>
                {/* CORREO FIN */}
                <br />
                {/* CONTRASEÑA */}
                <div className="input-group">
                  <label htmlFor="password">Contraseña</label>
                  <input maxLength={25} type="password" name="password" id="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                  <div className="forgot">
                    <a onClick={Logging}  rel="noopener noreferrer" href="#">¿Olvidaste tu contraseña?</a>
                  </div>
                </div>
                {/* CONTRASEÑA FIN */}
                <br />
                {error && (
                  <div className="text-red-500 font-semibold mb-2">Datos inválidos: correo o contraseña incorrectos.</div>
                )}
                <button type="submit" className="sign">Iniciar Sesión</button>
              </form>
              {/* FORM */}
              <br />
              <p className="signup">¿No tienes una cuenta?
                <a onClick={handleRegisterClick} rel="noopener noreferrer" href="#" > Registrarse</a>
              </p>
            </div>
            <div className="col-span-1" >
              <img src={LogoLogin} alt="" />
            </div>
          </div>
        )}
        {/* FIN INICIAR SESIÓN */}

        {/* REGISTRARSE */}
        {!isLoggingIn && (
          <div className={`grid grid-cols-2 gap-3 form-container3 ${!isLoggingIn ? (registerVisible ? 'fade-in' : 'fade-out') : 'hidden-initial'}`}>
            
            <div className="col-span-2">
              <p className="title">Registrarse</p>

              {/* FORM */}
              <form className="form" onSubmit={handleRegister}>
                {/* NOMBRE */}
                <div className="input-group">
                  <label htmlFor="nombrecom">Nombre</label>
                  <input maxLength={30} type="text" name="nombrecom" id="nombrecom" placeholder="Ingresa tu nombre completo..." value={nombre_usuario} onChange={(e) => setNombre(e.target.value)} required/>
                </div>
                {/* NOMBRE FIN */}
                <br />
                {/* CORREO */}
                <div className="input-group">
                  <label htmlFor="username">Correo</label>
                  <input maxLength={30} type="email" name="username" id="username" placeholder="Ingresa tu correo..." value={correo_usuario} onChange={(e) => setCorreo(e.target.value)} required/>
                </div>
                {/* CORREO FIN */}
                <br />
                {/* CONTRASEÑA */}
                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input maxLength={25} type="password" name="password" id="password" placeholder="Ingresa su contraseña..." value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                {/* CONTRASEÑA FIN */}
                <br />
                {/* TELÉFONO */}
                <div className="input-group">
                  <label htmlFor="telefono" className="telefono" >Teléfono</label>
                  <input maxLength={12} type="text" className="no-arrows" name="telefono" id="telefono" placeholder="Ingresa tu número telefónico..." value={inputValue} onChange={handleTelefono} required/>
                </div>
                {/* TELÉFONO FIN */}
                <br />
                {/* QUIERE FEED */}
                <div className="input-group input-group-checkbox grid grid-cols-4 items-center gap-2">
                  <label htmlFor="feed" className="col-span-3 flex items-center justify-center text-center feed">
                    ¿Quieres recibir noticias y promociones?
                  </label>
                  <label className="switch">
                    <input type="checkbox" id="feed"/>
                    <span className="slider" />
                  </label>
                </div>
                {/* QUIERE FEED FIN */}
                <br /><br /><br />
                <button type="submit" className="sign">Registrarse</button>
              </form>
              {/* FORM FIN */}
              <br />
              <p className="signup">¿Ya tienes una cuenta?
                <a onClick={handleBackToLogin} href="#"> Iniciar Sesión</a>
              </p>
            </div>
          </div>
        )}
        {/* FIN REGISTRARSE */}
      </StyledWrapper>
    </div>
  );
  
};
const StyledWrapper = styled.div`

  .switch {
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    border: 2px solid #414141;
    border-radius: 50px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.4em;
    width: 1.4em;
    left: 0.2em;
    bottom: 0.2em;
    background-color: white;
    border-radius: inherit;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .switch input:checked + .slider {
    box-shadow: 0 0 20px rgba(9, 117, 241, 0.8);
    border: 2px solid #0974f1;
  }

  .switch input:checked + .slider:before {
    transform: translateX(1.5em);
  }
    
  .input-group-checkbox {
    gap: 10px;
    margin-top: 0.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    }

  .fade-in {
    opacity: 1;
    transition: opacity 0.6s ease-in;
  }

  .fade-out {
    opacity: 0;
    transition: opacity 0.6s ease-out;
  }

  .form-container2 {
    width: 1040px;
    border-radius: 0.75rem;
    background-color: rgba(17, 24, 39, 1);
    padding: 2rem;
    color: rgba(243, 244, 246, 1);
  }
  
  .form-container3 {
    width: 540px;
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

  .feed {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-bottom: 0;
    width: 100%;
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
