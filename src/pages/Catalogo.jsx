// Página Catálogo, muestra todos los productos activos 
import { useState } from 'react';
import useProductos from '../hooks/useProductos.js';
import ListaProductos from '../components/ListaProductos.jsx';
import ModalProducto from '../components/ModalProducto.jsx';

export default function Catalogo() {
  const { productos, cargando, error } = useProductos(); // sin categoría = todo el catálogo
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  return (
    <main className="catalog">
      <h2>Ropa</h2>
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
