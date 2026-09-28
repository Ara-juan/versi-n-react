// Barra de navegación: replica la navbar de la versión original con Bootstrap y React Router
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useFiltros } from '../context/FiltrosContext.jsx';
import { cerrarSesion } from '../services/api.js';
import './Navbar.css';

export default function Navbar() {
  const { sesionActiva, usuario, esAdmin, cerrarSesionLocal } = useAuth();
  const { busqueda, setBusqueda, precioMax, setPrecioMax } = useFiltros();
  const navigate = useNavigate();
  const location = useLocation();

  // En Perfil y Admin la navbar original es fija (arriba), como en perfil.css
  const esFija = location.pathname === '/perfil' || location.pathname === '/admin-productos';

  const enlaces = [
    { ruta: '/catalogo', texto: 'Catálogo' },
    { ruta: '/hombre', texto: 'Hombre' },
    { ruta: '/mujer', texto: 'Mujer' },
    { ruta: '/unisex', texto: 'Unisex' },
    { ruta: '/colecciones', texto: 'Colecciones' },
    { ruta: '/acerca-de', texto: 'Acerca de' }
  ];

  const manejarCerrarSesion = () => {
    cerrarSesion();
    cerrarSesionLocal();
    navigate('/login');
  };

  return (
    <header>
      <nav className={`navbar ${esFija ? 'navbar-fija' : ''}`}>
        <div className="logo">
          <Link to="/acerca-de">
            <img src="/assets/logo.png" alt="Logo Americanoshh" />
          </Link>
        </div>

        <ul className="nav-links">
          {enlaces.map((enlace) => (
            <li key={enlace.ruta}>
              <NavLink to={enlace.ruta} className={({ isActive }) => (isActive ? 'active' : '')}>
                {enlace.texto}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/perfil" className={({ isActive }) => (isActive ? 'active' : '')}>
              Perfil
            </NavLink>
          </li>
        </ul>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <select value={precioMax} onChange={(e) => setPrecioMax(e.target.value)}>
            <option value="all">Todos los precios</option>
            <option value="50000">Hasta $50.000</option>
            <option value="60000">Hasta $60.000</option>
          </select>
          <button type="button" aria-label="Buscar">🔍</button>
        </div>

        {/* Menú de usuario dinámico (reemplaza al contenedor userMenuNav) */}
        <div className="menu-usuario d-flex align-items-center ms-3">
          {sesionActiva ? (
            <>
              <span className="text-white small me-2">
                Hola, <strong>{usuario?.nombre || usuario?.email}</strong>
              </span>
              {esAdmin && (
                <Link to="/admin-productos" className="btn btn-warning btn-sm me-2 fw-bold">
                  ⚙️ Admin
                </Link>
              )}
              <Link to="/perfil" className="btn btn-outline-info btn-sm me-2">Perfil</Link>
              <button type="button" className="btn btn-outline-light btn-sm" onClick={manejarCerrarSesion}>
                Salir
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">Iniciar Sesión / Registrarse</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
