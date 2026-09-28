# Americanoshh - Frontend React (Urban Clothes)

Esta carpeta (`C:\Users\ASUS\Desktop\react`) es la **versión React** del frontend
de la marca *Americanoshh*. Incluye una copia del backend Node.js (Express +
PostgreSQL/Supabase) en `backend/`, de modo que este proyecto funciona por sí solo.

La versión original en HTML/CSS/JS sigue intacta en
`C:\Users\ASUS\Desktop\urban clothes backend noje.js`.

## Tecnologías

- **React 19** + **Vite 7** (entorno de desarrollo y build)
- **React Router 7** (navegación entre páginas)
- **Bootstrap 5.3.8** (mismo framework de estilos que la versión original)
- **@supabase/supabase-js** (subida de imágenes al bucket `Imagenes` desde el panel admin)

## Cómo ejecutar

1. **Backend** (una terminal):
   ```bash
   cd backend
   npm install   # solo la primera vez
   node index.js # corre en http://localhost:3000
   ```

2. **Frontend** (otra terminal, desde esta carpeta):
   ```bash
   npm install   # solo la primera vez
   npm run dev   # corre en http://localhost:5173
   ```

Abre http://localhost:5173 y listo. Vite redirige automáticamente las llamadas
`/api/...` al backend del puerto 3000 (proxy configurado en `vite.config.js`),
así que no hay problemas de CORS en desarrollo.

> Si tu backend corre en otro puerto, puedes indicarlo así:
> `BACKEND_URL=http://localhost:3100 npm run dev`

## Estructura

```text
react/
├── backend/                 # Copia del backend Node.js (sin cambios de lógica)
├── assets/                  # Logo y fondo (mismas imágenes de la versión original)
├── index.html               # HTML raíz de la app React
├── vite.config.js           # Config de Vite + proxy /api -> backend
└── src/
    ├── main.jsx             # Punto de entrada (Bootstrap + Router + Contextos)
    ├── App.jsx              # Rutas de la aplicación
    ├── components/          # Navbar, tarjetas, modal, carrusel, alertas
    ├── context/             # AuthContext (sesión) y FiltrosContext (búsqueda/precio)
    ├── hooks/               # useProductos (fetch de productos con estados)
    ├── pages/               # Inicio, Colecciones, Catálogo, Hombre/Mujer/Unisex,
    │                        # Acerca de, Login, Perfil y AdminProductos
    └── services/            # api.js (todos los fetch al backend) y supabase.js
```

## Equivalencias con la versión original

| Archivo original               | Ahora en React                          |
| ------------------------------ | --------------------------------------- |
| `index.html`                   | `src/pages/Inicio.jsx`                  |
| `colecciones.html`             | `src/pages/Colecciones.jsx`             |
| `catalogo.html`                | `src/pages/Catalogo.jsx`                |
| `hombre/mujer/unisex.html`     | `src/pages/Categoria.jsx`               |
| `acerca de.html`               | `src/pages/AcercaDe.jsx`                |
| `login.html` + `login.js`      | `src/pages/Login.jsx`                   |
| `perfil.html` + `perfil.js`    | `src/pages/Perfil.jsx`                  |
| `admin-productos.*`            | `src/pages/AdminProductos.jsx`          |
| `script.js` (carga/modal/filtros) | `hooks/useProductos.js`, `components/*`, `context/FiltrosContext.jsx` |
| `backend/auth.js` (sesión)     | `context/AuthContext.jsx`               |

La sesión sigue usando las mismas claves de localStorage (`urban_token` y `urban_user`),
así que si estabas logeado en la versión original sigues logeado aquí (mismo backend).
