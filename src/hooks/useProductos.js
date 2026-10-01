// Hook reutilizable: carga productos desde la API, opcionalmente filtrados por categoría
import { useState, useEffect } from 'react';
import { obtenerProductos } from '../services/api.js';

//Almacena los datos devueltos, el indicador de carga y cualquier error de red
export default function useProductos(categoria) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //Para evitar llamadas a setstate en componentes que ya se han desmontado
    let cancelado = false;
    setCargando(true);
    setError(null);

    //LLamada al servicio de api pasando la categoria opcional (ejm; hombre,mujer,etc)
    obtenerProductos(categoria)
      .then((data) => {
        if (!cancelado) setProductos(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (!cancelado) setError(err.message);
      })
      .finally(() => {
        if (!cancelado) setCargando(false);
      });

    //funcion de limpieza que react ejecuta al desmontar el componente
    return () => {
      cancelado = true;
    };
  }, [categoria]); // Se reejecuta automáticamente cada vez que la categoría solicitada cambia

  // Retorna los 3 estados fundamentales para que cualquier vista (Catálogo, Inicio, etc.) los consuma fácilmente
  return { productos, cargando, error };
}
