// Página Login/Registro/Recuperación
import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  iniciarSesion,
  registrarUsuario,
  solicitarRecuperacionContrasena,
  restablecerContrasena
} from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import AlertaMensaje from '../components/AlertaMensaje.jsx';
import './Login.css';

export default function Login() {
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get('resetToken');

  const [pestañaActiva, setPestañaActiva] = useState(resetToken ? 'reset' : 'login');
  const [mensaje, setMensaje] = useState(null);
  const [mensajeError, setMensajeError] = useState(false);
  const [cargando, setCargando] = useState(false);

  const { iniciarSesionLocal } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (resetToken) {
      setPestañaActiva('reset');
    }
  }, [resetToken]);

  const mostrarMensaje = (texto, esError = false) => {
    setMensaje(texto);
    setMensajeError(esError);
  };

  const manejarLogin = async (event) => {
    event.preventDefault();
    setMensaje(null);
    setCargando(true);

    const formData = new FormData(event.target);
    const datos = {
      email: formData.get('email'),
      contrasena: formData.get('contrasena')
    };

    try {
      const resultado = await iniciarSesion(datos);
      iniciarSesionLocal(resultado.usuario);
      mostrarMensaje(resultado.mensaje, false);

      setTimeout(() => navigate('/colecciones'), 1000);
    } catch (error) {
      mostrarMensaje(error.message || 'Error de conexión con el servidor.', true);
    } finally {
      setCargando(false);
    }
  };

  const manejarRegistro = async (event) => {
    event.preventDefault();
    setMensaje(null);
    setCargando(true);

    const formData = new FormData(event.target);
    const datos = {
      nombre: formData.get('nombre'),
      email: formData.get('email'),
      contrasena: formData.get('contrasena'),
      telefono: formData.get('telefono') || null,
      direccion: formData.get('direccion') || null
    };

    try {
      const resultado = await registrarUsuario(datos);
      mostrarMensaje(resultado.mensaje, false);
      event.target.reset();

      setTimeout(() => setPestañaActiva('login'), 1500);
    } catch (error) {
      mostrarMensaje(error.message || 'Error de conexión con el servidor.', true);
    } finally {
      setCargando(false);
    }
  };

  // Solicitar el correo de recuperación
  const manejarSolicitudRecuperacion = async (event) => {
    event.preventDefault();
    setMensaje(null);
    setCargando(true);

    const formData = new FormData(event.target);
    const email = formData.get('email');

    try {
      const resultado = await solicitarRecuperacionContrasena(email);
      mostrarMensaje(resultado.mensaje, false);
      event.target.reset();
    } catch (error) {
      mostrarMensaje(error.message || 'No se pudo enviar el correo de recuperación.', true);
    } finally {
      setCargando(false);
    }
  };

  // Establecer la nueva contraseña tras hacer clic en el enlace recibido por correo
  const manejarRestablecer = async (event) => {
    event.preventDefault();
    setMensaje(null);
    setCargando(true);

    const formData = new FormData(event.target);
    const nuevaContrasena = formData.get('nuevaContrasena');

    try {
      const resultado = await restablecerContrasena({ token: resetToken, nuevaContrasena });
      mostrarMensaje(resultado.mensaje, false);

      setTimeout(() => {
        setPestañaActiva('login');
        navigate('/login');
      }, 2000);
    } catch (error) {
      mostrarMensaje(error.message || 'Error al restablecer contraseña.', true);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-container">
      <Link to="/">
        <img src="/assets/logo.png" alt="Logo Americanoshh" className="logo" />
      </Link>

      <div className="form-box">
        {pestañaActiva !== 'reset' && (
          <div className="tabs">
            <button
              type="button"
              className={`tab ${pestañaActiva === 'login' ? 'active' : ''}`}
              onClick={() => { setPestañaActiva('login'); setMensaje(null); }}
            >
              Ingresar
            </button>
            <button
              type="button"
              className={`tab ${pestañaActiva === 'register' ? 'active' : ''}`}
              onClick={() => { setPestañaActiva('register'); setMensaje(null); }}
            >
              Registrarse
            </button>
          </div>
        )}

        {/* Formulario de Iniciar Sesión */}
        {pestañaActiva === 'login' && (
          <form className="form active" onSubmit={manejarLogin}>
            <h2>Bienvenidos</h2>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="contrasena" placeholder="Contraseña" minLength={8} required />
            <button type="submit" className="btn" disabled={cargando}>
              {cargando ? 'Ingresando...' : 'Ingresar'}
            </button>
            <p className="link">¿No tienes cuenta? <span onClick={() => { setPestañaActiva('register'); setMensaje(null); }}>Regístrate aquí</span></p>
            <p className="link"><span onClick={() => { setPestañaActiva('forgot'); setMensaje(null); }}>¿Olvidaste tu contraseña?</span></p>
          </form>
        )}

        {/* Formulario de Registro */}
        {pestañaActiva === 'register' && (
          <form className="form active" onSubmit={manejarRegistro}>
            <h2>Crear cuenta</h2>
            <input type="text" name="nombre" placeholder="Nombre completo" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="contrasena" placeholder="Contraseña (Mín. 8 caracteres)" minLength={8} required />
            <input type="tel" name="telefono" placeholder="Teléfono (opcional, solo números)" pattern="^[0-9]*$" />
            <input type="text" name="direccion" placeholder="Dirección" />
            <button type="submit" className="btn" disabled={cargando}>
              {cargando ? 'Registrando...' : 'Registrarse'}
            </button>
            <p className="link" onClick={() => { setPestañaActiva('login'); setMensaje(null); }}>¿Ya tienes cuenta? Inicia sesión</p>
          </form>
        )}

        {/* Formulario de Solicitud de Recuperación por Correo */}
        {pestañaActiva === 'forgot' && (
          <form className="form active" onSubmit={manejarSolicitudRecuperacion}>
            <h2>Recuperar Contraseña</h2>
            <p className="subtitle text-center mb-3" style={{ fontSize: '13px', color: '#ccc' }}>
              Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
            </p>
            <input type="email" name="email" placeholder="Ingresa tu Email registrado" required />
            <button type="submit" className="btn" disabled={cargando}>
              {cargando ? 'Enviando...' : 'Enviar Enlace'}
            </button>
            <p className="link" onClick={() => { setPestañaActiva('login'); setMensaje(null); }}>Volver al inicio de sesión</p>
          </form>
        )}

        {/* Formulario de Nueva Contraseña (Cuando viene del enlace del correo) */}
        {pestañaActiva === 'reset' && (
          <form className="form active" onSubmit={manejarRestablecer}>
            <h2>Nueva Contraseña</h2>
            <p className="subtitle text-center mb-3" style={{ fontSize: '13px', color: '#ccc' }}>
              Crea una nueva contraseña para tu cuenta.
            </p>
            <input type="password" name="nuevaContrasena" placeholder="Nueva Contraseña (Mín. 8 caracteres)" minLength={8} required />
            <button type="submit" className="btn" disabled={cargando}>
              {cargando ? 'Guardando...' : 'Actualizar Contraseña'}
            </button>
          </form>
        )}

        <AlertaMensaje mensaje={mensaje} esError={mensajeError} />
      </div>
    </div>
  );
}