// Centraliza todas las llamadas al backend Node.js (Express + PostgreSQL/Supabase)
// En desarrollo, Vite redirige /api al backend de http://localhost:3000 (ver vite.config.js)

const API_BASE = '/api';

async function manejarRespuesta(respuesta) {
  // Intenta leer el JSON del backend; si viene vacío, devuelve un objeto vacío
  const data = await respuesta.json().catch(() => ({}));

  if (!respuesta.ok) {
    throw new Error(data.error || 'Error de conexión con el servidor.');
  }
  return data;
}

function authHeaders() {
  const token = localStorage.getItem('urban_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* ---------- PRODUCTOS ---------- */

// Lista productos activos (público). categoria opcional: 'hombre' | 'mujer' | 'unisex'
export async function obtenerProductos(categoria) {
  const url = categoria ? `${API_BASE}/productos?categoria=${encodeURIComponent(categoria)}` : `${API_BASE}/productos`;
  return manejarRespuesta(await fetch(url));
}

// Obtiene un producto por su id (público)
export async function obtenerProductoPorId(id) {
  return manejarRespuesta(await fetch(`${API_BASE}/productos/${id}`));
}

// Crea un producto (solo administradores)
export async function crearProducto(datos) {
  return manejarRespuesta(
    await fetch(`${API_BASE}/productos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(datos)
    })
  );
}

// Actualiza un producto (solo administradores)
export async function actualizarProducto(id, datos) {
  return manejarRespuesta(
    await fetch(`${API_BASE}/productos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(datos)
    })
  );
}

// Elimina un producto definitivamente (solo administradores)
export async function eliminarProducto(id) {
  return manejarRespuesta(
    await fetch(`${API_BASE}/productos/${id}`, {
      method: 'DELETE',
      headers: { ...authHeaders() }
    })
  );
}

/* ---------- USUARIOS ---------- */

// Registro de un nuevo usuario
export async function registrarUsuario({ nombre, email, contrasena, telefono, direccion }) {
  return manejarRespuesta(
    await fetch(`${API_BASE}/usuarios/registro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, contrasena, telefono, direccion })
    })
  );
}

// Inicio de sesión; guarda token y usuario en localStorage (igual que la versión original)
export async function iniciarSesion({ email, contrasena }) {
  const data = await manejarRespuesta(
    await fetch(`${API_BASE}/usuarios/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, contrasena })
    })
  );

  localStorage.setItem('urban_token', data.token);
  localStorage.setItem('urban_user', JSON.stringify(data.usuario));
  return data;
}

// Cierra la sesión limpiando el localStorage
export function cerrarSesion() {
  localStorage.removeItem('urban_token');
  localStorage.removeItem('urban_user');
}

// Obtiene el perfil del usuario autenticado
export async function obtenerPerfil() {
  return manejarRespuesta(
    await fetch(`${API_BASE}/usuarios/perfil`, {
      headers: { ...authHeaders() }
    })
  );
}

// Actualiza teléfono, dirección y/o contraseña
export async function actualizarPerfil(datos) {
  return manejarRespuesta(
    await fetch(`${API_BASE}/usuarios/perfil`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(datos)
    })
  );
}

// Elimina la cuenta del usuario autenticado
export async function eliminarCuenta() {
  const token = localStorage.getItem('urban_token');
  const usuarioRaw = localStorage.getItem('urban_user');
  let id = null;
  try {
    id = usuarioRaw ? JSON.parse(usuarioRaw).id : null;
  } catch {
    id = null;
  }
  if (!id) throw new Error('No hay una sesión activa.');

  return manejarRespuesta(
    await fetch(`${API_BASE}/usuarios/${id}`, {
      method: 'DELETE',
      headers: { ...authHeaders() }
    })
  );
}
