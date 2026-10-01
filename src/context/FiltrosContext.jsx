
import { createContext, useContext, useState, useMemo } from 'react';
//Contexto para compartir el texto de busqueda y el limite de precio
const FiltrosContext = createContext(null);

export function FiltrosProvider({ children }) {
  const [busqueda, setBusqueda] = useState('');
  const [precioMax, setPrecioMax] = useState('all');

  //Memoriza el objeto de filtros para evitar renderizados innecesarios
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

//Hook personalizado para acceder facilmente a los filtros desde cualquier componente
export function useFiltros() {
  const contexto = useContext(FiltrosContext);
  if (!contexto) {
    throw new Error('useFiltros debe usarse dentro de un FiltrosProvider');
  }
  return contexto;
}

// Aplica los filtros de la navbar a una lista de productos
export function filtrarProductos(productos, busqueda, precioMax) {
  //limpiamos y convertirmos la busqeuda a minuscualas para ignorar diferencias de mayusculas
  const query = busqueda.toLowerCase().trim();

  return productos.filter((producto) => {
    const titulo = (producto.titulo || '').toLowerCase();
    const descripcion = (producto.descripcion || '').toLowerCase();
    //Comprueba si el texto ingresado coincide con el titulo o la descripcion del producto
    const coincideTexto = titulo.includes(query) || descripcion.includes(query);
    //Evalua si el precio del producto esta dentro del topa maximo seleccionado
    const coincidePrecio = precioMax === 'all' || Number(producto.precio) <= parseInt(precioMax, 10);
    return coincideTexto && coincidePrecio;
  });
}
