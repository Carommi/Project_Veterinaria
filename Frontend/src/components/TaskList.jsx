import TaskCard from './TaskCard';

function TaskList({ mascotas, alCambiarVacuna, alEliminar }) {
  if (mascotas.length === 0) {
    return <p className="rounded-xl bg-white p-8 text-center text-slate-500">Aun no hay mascotas registradas.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
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
