// Página Colecciones: tres carruseles con las colecciones por categoría
// (equivalente a colecciones.html + la carga dinámica de script.js)
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useProductos from '../hooks/useProductos.js';
import CarruselProductos from '../components/CarruselProductos.jsx';
import ModalProducto from '../components/ModalProducto.jsx';
import './Colecciones.css';

export default function Colecciones() {
  const hombre = useProductos('hombre');
  const mujer = useProductos('mujer');
  const unisex = useProductos('unisex');

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  return (
    <>
      <section className="catalog">
        <Link to="/hombre"><h2>Hombres</h2></Link>
        <CarruselProductos productos={hombre.productos} cargando={hombre.cargando} error={hombre.error} onVerDetalle={setProductoSeleccionado} />
      </section>

      <section className="catalog">
        <Link to="/mujer"><h2>Mujeres</h2></Link>
        <CarruselProductos productos={mujer.productos} cargando={mujer.cargando} error={mujer.error} onVerDetalle={setProductoSeleccionado} />
      </section>

      <section className="catalog">
        <Link to="/unisex"><h2>Unisex</h2></Link>
        <CarruselProductos productos={unisex.productos} cargando={unisex.cargando} error={unisex.error} onVerDetalle={setProductoSeleccionado} />
      </section>

      {productoSeleccionado && (
        <ModalProducto producto={productoSeleccionado} onCerrar={() => setProductoSeleccionado(null)} />
      )}
    </>
  );
}
