import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Inicio from './pages/Inicio.jsx';
import Colecciones from './pages/Colecciones.jsx';
import Catalogo from './pages/Catalogo.jsx';
import Categoria from './pages/Categoria.jsx';
import AcercaDe from './pages/AcercaDe.jsx';
import Login from './pages/Login.jsx';
import Perfil from './pages/Perfil.jsx';
import AdminProductos from './pages/AdminProductos.jsx';

export default function App() {
  const location = useLocation();

  return (
    <>
      {/* Muestra la Navbar en todas las páginas excepto en el inicio '/' */}
      {location.pathname !== '/' && <Navbar />}

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/colecciones" element={<Colecciones />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/hombre" element={<Categoria key="hombre" categoria="hombre" titulo="Colección Hombre" />} />
        <Route path="/mujer" element={<Categoria key="mujer" categoria="mujer" titulo="Colección Mujer" />} />
        <Route path="/unisex" element={<Categoria key="unisex" categoria="unisex" titulo="Colección Unisex" />} />
        <Route path="/acerca-de" element={<AcercaDe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/admin-productos" element={<AdminProductos />} />
        {/* Ruta desconocida: regresa al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}