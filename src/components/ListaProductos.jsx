// Cuadrícula de productos con manejo de carga, error y lista vacía.
// Envuelve ProductoCard y aplica los filtros globales de la navbar.
import ProductoCard from './ProductoCard.jsx';
import './GridCatalogo.css';
import { filtrarProductos, useFiltros } from '../context/FiltrosContext.jsx';

export default function ListaProductos({ productos, cargando, error, onVerDetalle }) {
  const { busqueda, precioMax } = useFiltros();

  if (cargando) {
    return <div className="text-center w-100 py-4 text-muted">Cargando productos del catálogo...</div>;
  }

  if (error) {
    return <div className="text-center w-100 py-4 text-warning">Error al conectar con el servidor de productos.</div>;
  }

  const productosFiltrados = filtrarProductos(productos, busqueda, precioMax);

  if (productosFiltrados.length === 0) {
    if (busqueda.trim() !== '' || precioMax !== 'all') {
      return <div className="text-center w-100 py-4 text-muted">No hay prendas que coincidan con la búsqueda.</div>;
    }
    return <div className="text-center w-100 py-4 text-muted">No hay prendas disponibles en esta categoría por el momento.</div>;
  }

  return (
    <div className="catalog-grid">
      {productosFiltrados.map((producto) => (
        <ProductoCard key={producto.id_producto} producto={producto} onVerDetalle={onVerDetalle} />
      ))}
    </div>
  );
}
