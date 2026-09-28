// Contexto de sesión: reemplaza el auth.js global de la versión con HTML estático.
// Mantiene las mismas claves de localStorage (urban_token / urban_user) para que
// la sesión sea compatible con la versión original y con el backend.
import { createContext, useContext, useState, useMemo } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    try {
      const raw = localStorage.getItem('urban_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const valor = useMemo(() => {
    const token = localStorage.getItem('urban_token');
    const sesionActiva = Boolean(token && usuario);
    const esAdmin = usuario ? usuario.rol === 'ADMINISTRADOR' || usuario.rol === 'admin' : false;

    return {
      usuario,
      sesionActiva,
      esAdmin,
      iniciarSesionLocal(nuevoUsuario) {
        setUsuario(nuevoUsuario);
      },
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
