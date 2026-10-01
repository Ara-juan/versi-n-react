// Landing page principal 
import { Link } from 'react-router-dom';
import './Inicio.css';

export default function Inicio() {
  return (
    <div className="container inicio-container">
      {/* Logo */}
      <img src="/assets/logo.png" alt="Logo Americanoshh" className="logo" />

      {/* Slogan de la marca */}
      <h1 className="slogan">
        NACIDOS EN EL ASFALTO<br />CREADOS EN SILENCIO.
      </h1>

      {/* Botones de ingreso */}
      <div className="buttons">
        <p>Ingresar sin cuenta</p>
        <Link to="/colecciones">
          <button type="button" className="btn">Ingresar</button>
        </Link>

        <p>¿Tienes cuenta o deseas registrarte?</p>
        <Link to="/login">
          <button type="button" className="btn">Ingresar</button>
        </Link>
      </div>

      {/* Enlace inferior */}
      <Link to="/acerca-de" className="footer-link">
        <p className="footer">ACERCA DE AMERICANOSHH</p>
      </Link>
    </div>
  );
}
