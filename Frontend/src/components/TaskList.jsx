import TaskCard from './TaskCard';

function TaskList({ mascotas, alCambiarVacuna, alEliminar }) {
  if (mascotas.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-paw">🐾</span>
        <h3>No encontramos pacientes por aquí</h3>
        <p>Prueba otra búsqueda o registra la primera mascota.</p>
      </div>
    );
  }

  return (
    <div className="pet-grid">
      {mascotas.map((mascota) => (
        <TaskCard
          key={mascota.id}
          mascota={mascota}
          alCambiarVacuna={alCambiarVacuna}
          alEliminar={alEliminar}
        />
      ))}
    </div>
  );
}

export default TaskList;
