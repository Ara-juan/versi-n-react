// Carrusel horizontal de productos con flechas de navegación 
import { useRef } from 'react';
import ProductoCard from './ProductoCard.jsx';
import './CarruselProductos.css';

export default function CarruselProductos({ productos, cargando, error, onVerDetalle }) {
  // useRef es para guardar una referencia directa al nodo del DOM del contenedor (.products)
  // sin provocar que el componente se vuelva a renderizar cuando su valor cambia.
  const contenedorRef = useRef(null);

  // Desplaza el carrusel horizontalmente 
  const desplazar = (direccion) => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;
    contenedor.scrollBy({ left: contenedor.offsetWidth * direccion, behavior: 'smooth' });
  };
// Retornos tempranos para controlar las 3 fases previas a mostrar la lista:
// 1. Estado de carga activa desde el API.
  if (cargando) {
    return <div className="text-center w-100 py-4 text-muted">Cargando colección...</div>;
  }
// 2. Manejo de fallos en la petición HTTP.
  if (error) {
    return <div className="text-center w-100 py-4 text-warning">Error al conectar con el servidor de productos.</div>;
  }
//3. Respuesta vacía cuando la colección no tiene elementos para renderizar.
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
