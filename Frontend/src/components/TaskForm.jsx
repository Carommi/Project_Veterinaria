import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { consultarMascota, crearMascota, editarMascota } from '../api/mascotas';

const formularioVacio = {
  nombre_mascota: '',
  especie: '',
  motivo_consulta: '',
  vacunado: false,
};

function TaskForm() {
  const { id } = useParams();
  const navegar = useNavigate();
  const [formulario, setFormulario] = useState(formularioVacio);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      consultarMascota(id)
        .then((mascota) => setFormulario(mascota))
        .catch(() => setError('No se pudo cargar la mascota.'));
    }
  }, [id]);

  function cambiarCampo(evento) {
    const { name, value, type, checked } = evento.target;
    setFormulario({
      ...formulario,
      [name]: type === 'checkbox' ? checked : value,
    });
  }

  async function guardar(evento) {
    evento.preventDefault();
    setError('');

    try {
      if (id) {
        await editarMascota(id, formulario);
      } else {
        await crearMascota(formulario);
      }
      navegar('/');
    } catch (errorSolicitud) {
      setError(errorSolicitud.response?.data?.detail || 'No se pudo guardar la mascota.');
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-5 py-10">
      <h1 className="text-3xl font-bold text-slate-800">
        {id ? 'Editar mascota' : 'Registrar mascota'}
      </h1>
      <p className="mt-2 text-slate-600">Completa los datos del paciente.</p>

      <form onSubmit={guardar} className="mt-6 space-y-5 rounded-xl bg-white p-6 shadow-sm">
        <label className="block font-semibold text-slate-700">
          Nombre de la mascota
          <input
            name="nombre_mascota"
            value={formulario.nombre_mascota}
            onChange={cambiarCampo}
            required
            className="mt-2 block w-full rounded-lg border border-slate-300 px-3 py-2 font-normal"
          />
        </label>

        <label className="block font-semibold text-slate-700">
          Especie
          <input
            name="especie"
            value={formulario.especie}
            onChange={cambiarCampo}
            placeholder="Perro, gato..."
            required
            className="mt-2 block w-full rounded-lg border border-slate-300 px-3 py-2 font-normal"
          />
        </label>

        <label className="block font-semibold text-slate-700">
          Motivo de consulta
          <textarea
            name="motivo_consulta"
            value={formulario.motivo_consulta}
            onChange={cambiarCampo}
            required
            rows="3"
            className="mt-2 block w-full rounded-lg border border-slate-300 px-3 py-2 font-normal"
          />
        </label>

        <label className="flex items-center gap-3 font-semibold text-slate-700">
          <input
            type="checkbox"
            name="vacunado"
            checked={formulario.vacunado}
            onChange={cambiarCampo}
            className="h-4 w-4 accent-teal-700"
          />
          Tiene las vacunas al dia
        </label>

        {error && <p className="rounded-lg bg-rose-50 p-3 text-rose-700">{error}</p>}

        <div className="flex gap-3">
          <button type="submit" className="rounded-lg bg-teal-700 px-5 py-2 font-semibold text-white hover:bg-teal-800">
            Guardar
          </button>
          <Link to="/" className="rounded-lg bg-slate-100 px-5 py-2 font-semibold text-slate-700 hover:bg-slate-200">
            Cancelar
          </Link>
        </div>
      </form>
    </main>
  );
}

export default TaskForm;
