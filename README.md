# Proyecto "Urban Clothes"

En este repositorio se encuentra la versión del proyecto de urban clothes (pagina web que muestra el catalogo de ropa de la marca americanoshh) en la cual en la parte del frontend en vez de usar HTML-CSS y js, se usa REACT. 


La versión en HTML/CSS/JS sigue activa (por si algo fallaba y no tenia copia de respaldo del código): 


## Tecnologías

- **React 19** + **Vite 7** (entorno de desarrollo y build)
- **React Router 7** (navegación entre páginas)
- **Bootstrap 5.3.8** (mismo framework de estilos que la versión original)
- **@supabase/supabase-js** (subida de imágenes al bucket `Imagenes` desde el panel admin)



## Estructura

```text
react/
├── backend/                 
├── assets/                  # Logo y fondo (indispensables para la visualización de la web)
├── index.html               # HTML raíz de la app React
├── vite.config.js           # Config de Vite + proxy /api -> backend
└── src/
    ├── main.jsx             # Punto de entrada (Bootstrap + Router + Contextos)
    ├── App.jsx              # Rutas de la aplicación
    ├── components/          # Navbar, tarjetas, modal, carrusel, alertas (o sea, los componentes reutilizables)
    ├── context/             # AuthContext (sesión) y FiltrosContext (búsqueda/precio)
    ├── hooks/               # useProductos (fetch de productos con estados)
    ├── pages/               # Inicio, Colecciones, Catálogo, Hombre/Mujer/Unisex,
    │                        # Acerca de, Login, Perfil y AdminProductos
    └── services/            # api.js (todos los fetch al backend) y supabase.js
```
