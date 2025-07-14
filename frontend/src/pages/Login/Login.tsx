import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import LogoLogin from "../../assets/images/login-banner-2000-slim-v3.png";
import LoginBackground from "../../assets/images/login-background.jpg";
import "./Login.css";
import emailjs from "@emailjs/browser";

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
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();
  const [fromCart, setFromCart] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [recoverVisible, setRecoverVisible] = useState(false);
  const [recoveryStep, setRecoveryStep] = useState(1); // 1: correo, 2: código, 3: nueva pass
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [codeExpiry, setCodeExpiry] = useState<Date | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [recoveryError, setRecoveryError] = useState("");
  const [sending, setSending] = useState(false);
  const [timer, setTimer] = useState(0); // segundos restantes

  // Persistencia en localStorage
  useEffect(() => {
    if (
      isRecovering &&
      recoveryStep === 2 &&
      recoveryEmail &&
      recoveryCode &&
      codeExpiry
    ) {
      localStorage.setItem("recoveryEmail", recoveryEmail);
      localStorage.setItem("recoveryCode", recoveryCode);
      localStorage.setItem("codeExpiry", codeExpiry.toISOString());
    } else if (!isRecovering) {
      localStorage.removeItem("recoveryEmail");
      localStorage.removeItem("recoveryCode");
      localStorage.removeItem("codeExpiry");
    }
  }, [isRecovering, recoveryStep, recoveryEmail, recoveryCode, codeExpiry]);

  // Al cargar, restaurar si hay datos válidos
  useEffect(() => {
    if (isRecovering && recoveryStep === 2) {
      const savedEmail = localStorage.getItem("recoveryEmail");
      const savedCode = localStorage.getItem("recoveryCode");
      const savedExpiry = localStorage.getItem("codeExpiry");
      if (savedEmail && savedCode && savedExpiry) {
        setRecoveryEmail(savedEmail);
        setRecoveryCode(savedCode);
        setCodeExpiry(new Date(savedExpiry));
      }
    }
  }, [isRecovering, recoveryStep]);

  // Temporizador visual
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (recoveryStep === 2 && codeExpiry) {
      const updateTimer = () => {
        const now = new Date();
        const diff = Math.max(
          0,
          Math.floor((codeExpiry.getTime() - now.getTime()) / 1000)
        );
        setTimer(diff);
        if (diff <= 0) {
          clearInterval(interval);
        }
      };
      updateTimer();
      interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [recoveryStep, codeExpiry]);

  // el error aquí es para quitar un mensaje de alerta de vscode, pero si es necesario la const 'error'
  error;

  // FONDO
  useEffect(() => {
    // Check for session expiration redirect
    const params = new URLSearchParams(window.location.search);
    const nextParam = params.get("next");
    setFromCart(nextParam === "/checkout");

    if (params.get("expired") === "1") {
      setError(
        "Tu sesión ha expirado por inactividad. Por favor, inicia sesión nuevamente."
      );
      // Remove the param from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }

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
  }, [location.search]);

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

  const handleForgotClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setLoginVisible(false);
    setRegisterVisible(false);
    setTimeout(() => {
      setisLoggingIn(false);
      setIsRecovering(true);
    }, 500);
    setTimeout(() => {
      setRecoverVisible(true);
      setRecoveryStep(1);
      setRecoveryEmail("");
      setRecoveryCode("");
      setInputCode("");
      setNewPassword("");
      setRecoveryError("");
      setTimer(0);
      localStorage.removeItem("recoveryEmail");
      localStorage.removeItem("recoveryCode");
      localStorage.removeItem("codeExpiry");
    }, 600);
  };

  const handleBackToLoginFromRecover = () => {
    setRecoverVisible(false);
    setTimeout(() => {
      setIsRecovering(false);
      setisLoggingIn(true);
    }, 500);
    setTimeout(() => {
      setLoginVisible(true);
      localStorage.removeItem("recoveryEmail");
      localStorage.removeItem("recoveryCode");
      localStorage.removeItem("codeExpiry");
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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/token/`,
        {
          correo_usuario,
          password,
        }
      );

      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      alert("¡Login Exitoso!");
      navigate(fromCart ? "/cart" : "/Home");
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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/registrar/`,
        {
          nom_usuario: nombre_usuario,
          correo_usuario,
          telefono_usuario: inputValue,
          password,
          recibe_ofertas:
            (document.getElementById("feed") as HTMLInputElement)?.checked ||
            false,
        }
      );
      if (response.data.success) {
        alert("Usuario registrado correctamente");
        setisLoggingIn(true);
        setRegisterVisible(false);
        setLoginVisible(true);
      } else {
        setError(response.data.error || "Error al registrar usuario");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Error al registrar usuario");
    }
  };

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendRecoveryCode = async (email: string, code: string) => {
    await emailjs.send(
      "service_ln2frmg",
      "template_tervswy",
      {
        email: email,
        code: code,
      },
      "qdkFnM8pCKZJTQYYk"
    );
  };

  const handleSendRecoveryCode = async (
    e: React.FormEvent<HTMLFormElement> | null = null,
    resend = false
  ) => {
    if (e) e.preventDefault();
    setSending(true);
    setRecoveryError("");
    const code = generateCode();
    setRecoveryCode(code);
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutos
    setCodeExpiry(expiry);
    try {
      await sendRecoveryCode(resend ? recoveryEmail : recoveryEmail, code);
      setRecoveryStep(2);
      setTimer(5 * 60);
      if (!resend) {
        // Solo limpiar inputCode si es nuevo flujo
        setInputCode("");
      }
    } catch (err) {
      setRecoveryError("Error al enviar el correo. Intenta nuevamente.");
    }
    setSending(false);
  };

  const handleResendCode = async () => {
    await handleSendRecoveryCode(null, true);
  };

  const handleVerifyCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!codeExpiry || new Date() > codeExpiry) {
      setRecoveryError("El código ha expirado. Solicita uno nuevo.");
      return;
    }
    if (inputCode === recoveryCode) {
      setRecoveryStep(3);
      setRecoveryError("");
      localStorage.removeItem("recoveryCode");
      localStorage.removeItem("codeExpiry");
    } else {
      setRecoveryError("Código incorrecto.");
    }
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setRecoveryError("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/reset-password/`,
        {
          correo_usuario: recoveryEmail,
          password: newPassword,
        }
      );
      if (res.data.success) {
        alert("Contraseña actualizada correctamente.");
        handleBackToLoginFromRecover();
      } else {
        setRecoveryError(
          res.data.error || "Error al actualizar la contraseña."
        );
      }
    } catch (err: any) {
      setRecoveryError(
        err.response?.data?.error || "Error al actualizar la contraseña."
      );
    }
    setSending(false);
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <StyledWrapper>
      <div className="grid grid-cols-2 gap-3 min-h-screen items-center justify-center">
        {/* INICIAR SESIÓN */}
        <div
          className={`col-span-2 ${
            isLoggingIn && !isRecovering && loginVisible
              ? "fade-in"
              : "fade-out"
          } ${!isLoggingIn || isRecovering ? "hidden" : ""} form-container2`}
        >
          <div className="grid grid-cols-2 gap-3 relative">
            <div className="col-span-1">
              <div className="grid grid-cols-3">
                <div className="col-span-1">
                  <button
                    className="bg-white text-center w-35 rounded-2xl h-12 relative text-white text-xl font-semibold group"
                    type="button"
                    onClick={() => navigate(fromCart ? "/cart" : "/Home")}
                  >
                    <div className="bg-red-800 rounded-xl h-10 w-1/4 flex items-center justify-center absolute left-1 top-[3px] group-hover:w-[130px] z-10 duration-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        height="25px"
                        width="25px"
                      >
                        <path
                          d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                          fill="#000000"
                        />
                        <path
                          d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                          fill="#000000"
                        />
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
                  <input
                    maxLength={30}
                    type="email"
                    name="username"
                    id="username"
                    placeholder="Ingresa tu correo..."
                    value={correo_usuario}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>
                {/* CORREO FIN */}
                <br />
                {/* CONTRASEÑA */}
                <div className="input-group">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    maxLength={25}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="forgot">
                    <a
                      onClick={handleForgotClick}
                      rel="noopener noreferrer"
                      href="#"
                    >
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>
                {/* CONTRASEÑA FIN */}
                <br />
                {error && (
                  <div className="text-red-500 font-semibold mb-2">
                    Datos inválidos: correo o contraseña incorrectos.
                  </div>
                )}
                <button type="submit" className="sign">
                  Iniciar Sesión
                </button>
              </form>
              {/* FORM */}
              <br />
              <p className="signup">
                ¿No tienes una cuenta?
                <a
                  onClick={handleRegisterClick}
                  rel="noopener noreferrer"
                  href="#"
                >
                  {" "}
                  Registrarse
                </a>
              </p>
            </div>
            <div className="col-span-1">
              <img src={LogoLogin} alt="" />
            </div>
          </div>
        </div>
        {/* REGISTRARSE */}
        <div
          className={`col-span-2 ${
            !isLoggingIn && !isRecovering && registerVisible
              ? "fade-in"
              : "fade-out"
          } ${isLoggingIn || isRecovering ? "hidden" : ""} form-container3`}
        >
          <div className="col-span-2">
            <p className="title">Registrarse</p>

            {/* FORM */}
            <form className="form" onSubmit={handleRegister}>
              {/* NOMBRE */}
              <div className="input-group">
                <label htmlFor="nombrecom">Nombre</label>
                <input
                  maxLength={30}
                  type="text"
                  name="nombrecom"
                  id="nombrecom"
                  placeholder="Ingresa tu nombre completo..."
                  value={nombre_usuario}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              {/* NOMBRE FIN */}
              <br />
              {/* CORREO */}
              <div className="input-group">
                <label htmlFor="username">Correo</label>
                <input
                  maxLength={30}
                  type="email"
                  name="username"
                  id="username"
                  placeholder="Ingresa tu correo..."
                  value={correo_usuario}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>
              {/* CORREO FIN */}
              <br />
              {/* CONTRASEÑA */}
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  maxLength={25}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Ingresa su contraseña..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {/* CONTRASEÑA FIN */}
              <br />
              {/* TELÉFONO */}
              <div className="input-group">
                <label htmlFor="telefono" className="telefono">
                  Teléfono
                </label>
                <input
                  maxLength={12}
                  type="text"
                  className="no-arrows"
                  name="telefono"
                  id="telefono"
                  placeholder="Ingresa tu número telefónico..."
                  value={inputValue}
                  onChange={handleTelefono}
                  required
                />
              </div>
              {/* TELÉFONO FIN */}
              <br />
              {/* QUIERE FEED */}
              <div className="input-group input-group-checkbox grid grid-cols-4 items-center gap-2">
                <label
                  htmlFor="feed"
                  className="col-span-3 flex items-center justify-center text-center feed"
                >
                  ¿Quieres recibir noticias y promociones?
                </label>
                <label className="switch">
                  <input type="checkbox" id="feed" />
                  <span className="slider" />
                </label>
              </div>
              {/* QUIERE FEED FIN */}
              <br />
              <br />
              <br />
              <button type="submit" className="sign">
                Registrarse
              </button>
            </form>
            {/* FORM FIN */}
            <br />
            <p className="signup">
              ¿Ya tienes una cuenta?
              <a onClick={handleBackToLogin} href="#">
                {" "}
                Iniciar Sesión
              </a>
            </p>
          </div>
        </div>
        {/* RECUPERAR CONTRASEÑA */}
        <div
          className={`col-span-2 ${
            isRecovering && recoverVisible ? "fade-in" : "fade-out"
          } ${!isRecovering ? "hidden" : ""} form-container3`}
        >
          <div className="col-span-2">
            <p className="title">Recuperar Contraseña</p>
            {recoveryStep === 1 && (
              <form className="form" onSubmit={handleSendRecoveryCode}>
                <div className="input-group">
                  <label htmlFor="recoveryEmail">Correo</label>
                  <input
                    maxLength={30}
                    type="email"
                    name="recoveryEmail"
                    id="recoveryEmail"
                    placeholder="Ingresa tu correo..."
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    required
                  />
                </div>
                <br />
                {recoveryError && (
                  <div className="text-red-500 font-semibold mb-2">
                    {recoveryError}
                  </div>
                )}
                <button type="submit" className="sign" disabled={sending}>
                  {sending ? "Enviando..." : "Enviar código"}
                </button>
                <br />
                <p className="signup">
                  <a onClick={handleBackToLoginFromRecover} href="#">
                    Volver a iniciar sesión
                  </a>
                </p>
              </form>
            )}
            {recoveryStep === 2 && (
              <form className="form" onSubmit={handleVerifyCode}>
                <div className="input-group">
                  <label htmlFor="inputCode">Código recibido</label>
                  <input
                    maxLength={6}
                    type="text"
                    name="inputCode"
                    id="inputCode"
                    placeholder="Ingresa el código de 6 dígitos..."
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    required
                  />
                </div>
                <br />
                {timer > 0 && (
                  <div className="text-gray-400 mb-2">
                    El código expira en {Math.floor(timer / 60)}:
                    {(timer % 60).toString().padStart(2, "0")}
                  </div>
                )}
                {timer === 0 && (
                  <div className="text-red-500 mb-2">
                    El código ha expirado.{" "}
                    <button
                      type="button"
                      className="underline text-blue-400"
                      onClick={handleResendCode}
                    >
                      Reenviar código
                    </button>
                  </div>
                )}
                {recoveryError && (
                  <div className="text-red-500 font-semibold mb-2">
                    {recoveryError}
                  </div>
                )}
                <button type="submit" className="sign" disabled={timer === 0}>
                  Verificar código
                </button>
                <br />
                <p className="signup">
                  <a onClick={handleBackToLoginFromRecover} href="#">
                    Volver a iniciar sesión
                  </a>
                </p>
              </form>
            )}
            {recoveryStep === 3 && (
              <form className="form" onSubmit={handleResetPassword}>
                <div className="input-group">
                  <label htmlFor="newPassword">Nueva contraseña</label>
                  <input
                    maxLength={25}
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    placeholder="Ingresa tu nueva contraseña..."
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <br />
                {recoveryError && (
                  <div className="text-red-500 font-semibold mb-2">
                    {recoveryError}
                  </div>
                )}
                <button type="submit" className="sign" disabled={sending}>
                  {sending ? "Actualizando..." : "Actualizar contraseña"}
                </button>
                <br />
                <p className="signup">
                  <a onClick={handleBackToLoginFromRecover} href="#">
                    Volver a iniciar sesión
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </StyledWrapper>
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
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
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
    background-color: hsl(221, 39.3%, 11%);
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
    color: rgba(156, 163, 175, 1);
    margin: 8px 0 14px 0;
  }

  .forgot a,
  .signup a {
    color: rgba(243, 244, 246, 1);
    text-decoration: none;
    font-size: 14px;
  }

  .forgot a:hover,
  .signup a:hover {
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
    background-color: #5f0e17;
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
  }
`;

export default Login;
