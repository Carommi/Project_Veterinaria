import { useEffect, useState } from 'react';
import { listarMascotas, editarMascota, eliminarMascota } from '../api/mascotas';
import TaskList from '../components/TaskList';

function Homepage() {
  const [mascotas, setMascotas] = useState([]);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);

  async function cargarMascotas() {
    try {
      setMascotas(await listarMascotas());
      setError('');
    } catch {
      setError('No se pudo conectar con el backend. Revisa que FastAPI este iniciado.');
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarMascotas();
  }, []);

  async function cambiarVacunacion(mascota) {
    try {
      const actualizada = await editarMascota(mascota.id, { vacunado: !mascota.vacunado });
      setMascotas(mascotas.map((item) => (item.id === mascota.id ? actualizada : item)));
    } catch {
      setError('No se pudo actualizar el estado de vacunacion.');
    }
  }

  async function borrarMascota(id) {
    if (!window.confirm('Quieres eliminar esta mascota?')) return;

    try {
      await eliminarMascota(id);
      setMascotas(mascotas.filter((mascota) => mascota.id !== id));
    } catch {
      setError('No se pudo eliminar la mascota.');
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <p className="font-semibold uppercase tracking-wide text-teal-700">Registro veterinario</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-800">Pacientes Mascotas</h1>
      <p className="mt-2 text-slate-600">Consulta y administra las mascotas registradas.</p>

      {error && <p className="mt-6 rounded-lg bg-rose-50 p-4 text-rose-700">{error}</p>}
      {cargando ? (
        <p className="mt-8 text-slate-500">Cargando mascotas...</p>
      ) : (
        <div className="mt-8">
          <TaskList
            mascotas={mascotas}
            alCambiarVacuna={cambiarVacunacion}
            alEliminar={borrarMascota}
          />
        </div>
      )}
    </main>
  );
}

export default Homepage;
