// Página genérica de categoría: usada por las rutas /hombre, /mujer y /unisex
// (equivalente a hombre.html, mujer.html y unisex.html de la versión original)
import { useState } from 'react';
import useProductos from '../hooks/useProductos.js';
import ListaProductos from '../components/ListaProductos.jsx';
import ModalProducto from '../components/ModalProducto.jsx';

export default function Categoria({ categoria, titulo }) {
  const { productos, cargando, error } = useProductos(categoria);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  return (
    <main className="catalog">
      <h2>{titulo}</h2>
      <ListaProductos
        productos={productos}
        cargando={cargando}
        error={error}
        onVerDetalle={setProductoSeleccionado}
      />

      {productoSeleccionado && (
        <ModalProducto producto={productoSeleccionado} onCerrar={() => setProductoSeleccionado(null)} />
      )}
    </main>
  );
}
