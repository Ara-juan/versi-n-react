// Página Colecciones: tres carruseles con las colecciones por categoría
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useProductos from '../hooks/useProductos.js';
import CarruselProductos from '../components/CarruselProductos.jsx';
import ModalProducto from '../components/ModalProducto.jsx';
import { useFiltros, filtrarProductos } from '../context/FiltrosContext.jsx';
import './Colecciones.css';

export default function Colecciones() {
  const hombre = useProductos('hombre');
  const mujer = useProductos('mujer');
  const unisex = useProductos('unisex');

  // Obtenemos los valores actuales de los filtros
  const { busqueda, precioMax } = useFiltros();

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Aplicamos los filtros de búsqueda y precio a cada lista de productos
  const productosHombreFiltrados = filtrarProductos(hombre.productos, busqueda, precioMax);
  const productosMujerFiltrados = filtrarProductos(mujer.productos, busqueda, precioMax);
  const productosUnisexFiltrados = filtrarProductos(unisex.productos, busqueda, precioMax);

  return (
    <>
      <section className="catalog">
        <Link to="/hombre"><h2>Hombres</h2></Link>
        <CarruselProductos 
          productos={productosHombreFiltrados} 
          cargando={hombre.cargando} 
          error={hombre.error} 
          onVerDetalle={setProductoSeleccionado} 
        />
      </section>

      <section className="catalog">
        <Link to="/mujer"><h2>Mujeres</h2></Link>
        <CarruselProductos 
          productos={productosMujerFiltrados} 
          cargando={mujer.cargando} 
          error={mujer.error} 
          onVerDetalle={setProductoSeleccionado} 
        />
      </section>

      <section className="catalog">
        <Link to="/unisex"><h2>Unisex</h2></Link>
        <CarruselProductos 
          productos={productosUnisexFiltrados} 
          cargando={unisex.cargando} 
          error={unisex.error} 
          onVerDetalle={setProductoSeleccionado} 
        />
      </section>

      {productoSeleccionado && (
        <ModalProducto producto={productoSeleccionado} onCerrar={() => setProductoSeleccionado(null)} />
      )}
    </>
  );
}