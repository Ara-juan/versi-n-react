// Página Login/Registro (equivalente a login.html + login.js de la versión original)
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { iniciarSesion, registrarUsuario } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import AlertaMensaje from '../components/AlertaMensaje.jsx';
import './Login.css';

export default function Login() {
  const [pestañaActiva, setPestañaActiva] = useState('login');
  const [mensaje, setMensaje] = useState(null);
  const [mensajeError, setMensajeError] = useState(false);
  const [cargando, setCargando] = useState(false);

  const { iniciarSesionLocal } = useAuth();
  const navigate = useNavigate();

  const mostrarMensaje = (texto, esError = false) => {
    setMensaje(texto);
    setMensajeError(esError);
  };

  // Inicio de sesión contra la API
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

      // Redirigir al catálogo principal
      setTimeout(() => navigate('/colecciones'), 1000);
    } catch (error) {
      mostrarMensaje(error.message || 'Error de conexión con el servidor.', true);
    } finally {
      setCargando(false);
    }
  };

  // Registro de un nuevo usuario
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

      // Transición al login tras registro exitoso
      setTimeout(() => setPestañaActiva('login'), 1500);
    } catch (error) {
      mostrarMensaje(error.message || 'Error de conexión con el servidor.', true);
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
        <div className="tabs">
          <button
            type="button"
            className={`tab ${pestañaActiva === 'login' ? 'active' : ''}`}
            onClick={() => setPestañaActiva('login')}
          >
            Ingresar
          </button>
          <button
            type="button"
            className={`tab ${pestañaActiva === 'register' ? 'active' : ''}`}
            onClick={() => setPestañaActiva('register')}
          >
            Registrarse
          </button>
        </div>

        {/* Formulario de Iniciar Sesión */}
        {pestañaActiva === 'login' && (
          <form className="form active" onSubmit={manejarLogin}>
            <h2>Bienvenidos</h2>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="contrasena" placeholder="Contraseña" minLength={8} required />
            <button type="submit" className="btn" disabled={cargando}>
              {cargando ? 'Ingresando...' : 'Ingresar'}
            </button>
            <p className="link">¿No tienes cuenta? <span onClick={() => setPestañaActiva('register')}>Regístrate aquí</span></p>
            <p className="link"><span>¿Olvidaste tu contraseña?</span></p>
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
            <p className="link" onClick={() => setPestañaActiva('login')}>¿Ya tienes cuenta? Inicia sesión</p>
          </form>
        )}

        {/* Mensajes de respuesta de la API */}
        <AlertaMensaje mensaje={mensaje} esError={mensajeError} />
      </div>
    </div>
  );
}
