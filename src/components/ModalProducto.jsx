// Modal de detalles del producto: mismo diseño que la versión original,
// pero manejado con estado React (ya no manipula el DOM a mano).
import { useEffect, useState } from 'react';
import './ModalProducto.css';

const WHATSAPP_URL = 'https://wa.me/573124363561'; // número de la marca

export default function ModalProducto({ producto, onCerrar }) {
  const [tallaSeleccionada, setTallaSeleccionada] = useState(null);
  const tallas = Array.isArray(producto?.tallas) && producto.tallas.length > 0 ? producto.tallas : ['XS', 'S', 'M', 'L', 'XL'];

  // Cierra el modal con la tecla Escape
  useEffect(() => {
    const manejarTecla = (e) => {
      if (e.key === 'Escape') onCerrar();
    };
    window.addEventListener('keydown', manejarTecla);
    return () => window.removeEventListener('keydown', manejarTecla);
  }, [onCerrar]);

  if (!producto) return null;

  const precioFormateado = `$${parseInt(producto.precio, 10).toLocaleString('es-CO')}`;

  return (
    <div id="product-modal" className="modal show" onClick={(e) => e.target === e.currentTarget && onCerrar()}>
      <div className="modal-content">
        <span className="close-modal" onClick={onCerrar}>&times;</span>

        <div className="modal-body">
          <div className="modal-left">
            <div className="image-container">
              <img src={producto.imagen_url} alt={producto.titulo} />
            </div>
          </div>

          <div className="modal-right">
            <h1 className="urban-title">{producto.titulo}</h1>
            <p className="modal-stock">En stock</p>
            <p className="modal-price">{precioFormateado}</p>

            <div className="modal-sizes">
              <h3 className="urban-subtitle">Tallas</h3>
              <div className="sizes-grid">
                {tallas.map((talla) => (
                  <button
                    key={talla}
                    type="button"
                    className={`size-btn ${tallaSeleccionada === talla ? 'seleccionada' : ''}`}
                    onClick={() => setTallaSeleccionada(talla)}
                  >
                    {talla}
                  </button>
                ))}
              </div>
            </div>

            <button type="button" className="btn-buy">
              <span>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Compra Ahora</a>
              </span>
            </button>

            <p className="modal-desc">{producto.descripcion || 'Sin descripción disponible.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
