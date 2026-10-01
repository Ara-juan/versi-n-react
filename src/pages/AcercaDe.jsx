// Página "Acerca de" 
import './AcercaDe.css';

export default function AcercaDe() {
  return (
    <section className="about">
      <div className="about-content">
        {/* Logo principal */}
        <div className="about-logo">
          <img src="/assets/logo.png" alt="Logo Americanos" />
        </div>

        {/* Texto descriptivo y redes */}
        <div className="about-text">
          <h2>¿QUÉ ES AMERICANOSHH?</h2>
          <p>Americanos! una revelación en la estética y el diseño urbano.</p>
          <p>Descubre tu esencia y muestra tu estilo con nuestra marca de ropa.</p>
          <p><strong>Calidad no cantidad</strong> es la identidad del clan.</p>

          <h3>SÍGUENOS EN NUESTROS CANALES</h3>
          <ul className="socials">
            <li>Instagram: <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">@americanos</a></li>
            <li>TikTok: <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">@americanos</a></li>
            <li>Facebook: <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Americanoshh</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
