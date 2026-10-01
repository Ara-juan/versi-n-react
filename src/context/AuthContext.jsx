
import { createContext, useContext, useState, useMemo } from 'react';

//Creamos el contexto de autenticacion con un valor inicial nulo
// el cual serivira como el almacen central del estado del usuario para toda la aplicacion
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  //Iniciamos el estado del usuario letendo el "localstorage"
  //usamos una funcion de inicializacion para que la lectura del almacenamiento local solo se ejecute una vez
  const [usuario, setUsuario] = useState(() => {
    try {
      const raw = localStorage.getItem('urban_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      //Si el JSON guardado es inválido o ocurre un error de lectura, retornamos null de forma segura
      return null;
    }
  });
  //Memorizamos el objeto de contexto con 'useMemo' para evitar re-renders innecesarios
  const valor = useMemo(() => {
    const token = localStorage.getItem('urban_token');
    //Una sesion se considera activa solo si existen tanto el token como los datos del usuario
    const sesionActiva = Boolean(token && usuario);
    //Verificacion flexibilizada para determinar si el usuario es administrador
    const esAdmin = usuario ? usuario.rol === 'ADMINISTRADOR' || usuario.rol === 'admin' : false;

    return {
      usuario,
      sesionActiva,
      esAdmin,
      //Actualiza el estado local cuando el usuario inicia sesion exitosamente
      iniciarSesionLocal(nuevoUsuario) {
        setUsuario(nuevoUsuario);
      },
      //Limpia el token y los datos guardados en el navegador al cerrar sesión
      cerrarSesionLocal() {
        localStorage.removeItem('urban_token');
        localStorage.removeItem('urban_user');
        setUsuario(null);
      }
    };
  }, [usuario]);

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

// Hook para usar la sesión en cualquier componente
export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return contexto;
}
