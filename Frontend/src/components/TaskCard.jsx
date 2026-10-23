import { Link } from 'react-router-dom';
import { Check, Pencil, ShieldAlert, ShieldCheck, Trash2 } from 'lucide-react';

function TaskCard({ mascota, alCambiarVacuna, alEliminar }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800">{mascota.nombre_mascota}</h2>
          <p className="mt-1 text-sm text-slate-500">{mascota.especie}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            mascota.vacunado ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
          }`}
        >
          {mascota.vacunado ? 'Vacunada' : 'Pendiente de vacuna'}
        </span>
      </div>

      <p className="mt-4 text-slate-600">
        <span className="font-semibold">Motivo de consulta:</span> {mascota.motivo_consulta}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => alCambiarVacuna(mascota)}
          className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-100"
        >
          {mascota.vacunado ? <ShieldAlert size={17} /> : <ShieldCheck size={17} />}
          {mascota.vacunado ? 'Marcar pendiente' : 'Marcar vacunada'}
        </button>
        <Link
          to={`/mascotas/editar/${mascota.id}`}
          className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
        >
          <Pencil size={16} /> Editar
        </Link>
        <button
          type="button"
          onClick={() => alEliminar(mascota.id)}
          className="flex items-center gap-2 rounded-lg bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100"
        >
          <Trash2 size={16} /> Eliminar
        </button>
      </div>
      {mascota.vacunado && (
        <p className="mt-3 flex items-center gap-1 text-sm text-emerald-700">
          <Check size={16} /> Vacunacion al dia
        </p>
      )}
    </article>
  );
}

export default TaskCard;
