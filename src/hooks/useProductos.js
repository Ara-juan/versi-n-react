// Hook reutilizable: carga productos desde la API, opcionalmente filtrados por categoría
import { useState, useEffect } from 'react';
import { obtenerProductos } from '../services/api.js';

export default function useProductos(categoria) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelado = false;
    setCargando(true);
    setError(null);

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

    return () => {
      cancelado = true;
    };
  }, [categoria]);

  return { productos, cargando, error };
}
