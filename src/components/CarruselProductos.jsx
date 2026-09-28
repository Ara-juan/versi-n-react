// Carrusel horizontal de productos con flechas de navegación (como el original)
import { useRef } from 'react';
import ProductoCard from './ProductoCard.jsx';
import './CarruselProductos.css';

export default function CarruselProductos({ productos, cargando, error, onVerDetalle }) {
  const contenedorRef = useRef(null);

  // Desplaza el carrusel horizontalmente (igual que scrollCarousel del original)
  const desplazar = (direccion) => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;
    contenedor.scrollBy({ left: contenedor.offsetWidth * direccion, behavior: 'smooth' });
  };

  if (cargando) {
    return <div className="text-center w-100 py-4 text-muted">Cargando colección...</div>;
  }

  if (error) {
    return <div className="text-center w-100 py-4 text-warning">Error al conectar con el servidor de productos.</div>;
  }

  if (productos.length === 0) {
    return <div className="text-center w-100 py-4 text-muted">No hay prendas disponibles en esta colección por el momento.</div>;
  }

  return (
    <div className="carousel-container">
      <button className="arrow left-arrow" onClick={() => desplazar(-1)} aria-label="Anterior">&#10094;</button>

      <div className="products" ref={contenedorRef}>
        {productos.map((producto) => (
          <ProductoCard key={producto.id_producto} producto={producto} onVerDetalle={onVerDetalle} />
        ))}
      </div>

      <button className="arrow right-arrow" onClick={() => desplazar(1)} aria-label="Siguiente">&#10095;</button>
    </div>
  );
}
