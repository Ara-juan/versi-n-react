// Tarjeta de producto
// Al hacer clic abre el modal con los detalles (via prop onVerDetalle).
export default function ProductoCard({ producto, onVerDetalle }) {
  const precioFormateado = `$${parseInt(producto.precio, 10).toLocaleString('es-CO')}`;

  return (
    <div
      className="card"
      data-desc={producto.descripcion || 'Sin descripción disponible.'}
      onClick={() => onVerDetalle(producto)}
    >
      <img src={producto.imagen_url} alt={producto.titulo} />
      <h3>{producto.titulo}</h3>
      <p className="price">{precioFormateado}</p>
      <p className="desc"></p>
    </div>
  );
}
