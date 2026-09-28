// Mensaje reutilizable para mostrar respuestas de la API (éxito/error)
export default function AlertaMensaje({ mensaje, esError }) {
  if (!mensaje) return null;

  return (
    <div className={`mt-3 text-center fw-bold ${esError ? 'text-danger' : 'text-success'}`}>
      {mensaje}
    </div>
  );
}
