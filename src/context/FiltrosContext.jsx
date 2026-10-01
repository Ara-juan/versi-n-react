
import { createContext, useContext, useState, useMemo } from 'react';

const FiltrosContext = createContext(null);

export function FiltrosProvider({ children }) {
  const [busqueda, setBusqueda] = useState('');
  const [precioMax, setPrecioMax] = useState('all');

  const valor = useMemo(
    () => ({
      busqueda,
      setBusqueda,
      precioMax,
      setPrecioMax
    }),
    [busqueda, precioMax]
  );

  return <FiltrosContext.Provider value={valor}>{children}</FiltrosContext.Provider>;
}

export function useFiltros() {
  const contexto = useContext(FiltrosContext);
  if (!contexto) {
    throw new Error('useFiltros debe usarse dentro de un FiltrosProvider');
  }
  return contexto;
}

// Aplica los filtros de la navbar a una lista de productos
export function filtrarProductos(productos, busqueda, precioMax) {
  const query = busqueda.toLowerCase().trim();

  return productos.filter((producto) => {
    const titulo = (producto.titulo || '').toLowerCase();
    const descripcion = (producto.descripcion || '').toLowerCase();
    const coincideTexto = titulo.includes(query) || descripcion.includes(query);
    const coincidePrecio = precioMax === 'all' || Number(producto.precio) <= parseInt(precioMax, 10);
    return coincideTexto && coincidePrecio;
  });
}
