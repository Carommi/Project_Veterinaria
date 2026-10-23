import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Pencil, PawPrint, ShieldAlert, ShieldCheck, Trash2 } from 'lucide-react';

function TaskCard({ mascota, alCambiarVacuna, alEliminar }) {
  return (
    <article className="pet-card">
      <div className="pet-card-topline"><span>FICHA DE PACIENTE</span><span>#{mascota.id.slice(-5)}</span></div>

      <div className="pet-identity">
        <div className="pet-avatar"><PawPrint size={27} strokeWidth={1.8} /></div>
        <div className="pet-name-block">
          <h3>{mascota.nombre_mascota}</h3>
          <span className="species-label">{mascota.especie}</span>
        </div>
        <span className={mascota.vacunado ? 'vaccine-badge vaccinated' : 'vaccine-badge pending'}>
          <span /> {mascota.vacunado ? 'Al día' : 'Pendiente'}
        </span>
      </div>

      <div className="consultation-note">
        <span className="note-label">MOTIVO DE CONSULTA</span>
        <p>{mascota.motivo_consulta}</p>
      </div>

      <div className="pet-card-actions">
        <button
          type="button"
          onClick={() => alCambiarVacuna(mascota)}
          className="text-action vaccine-action"
        >
          {mascota.vacunado ? <ShieldAlert size={16} /> : <ShieldCheck size={16} />}
          {mascota.vacunado ? 'Marcar pendiente' : 'Registrar vacuna'}
        </button>
        <div className="card-secondary-actions">
          <Link
            to={`/mascotas/editar/${mascota.id}`}
            className="icon-action"
            aria-label={`Editar a ${mascota.nombre_mascota}`}
            title="Editar ficha"
          >
            <Pencil size={16} />
          </Link>
          <button
            type="button"
            onClick={() => alEliminar(mascota.id)}
            className="icon-action delete-action"
            aria-label={`Eliminar a ${mascota.nombre_mascota}`}
            title="Eliminar ficha"
          >
            <Trash2 size={16} />
          </button>
          <ArrowUpRight className="card-arrow" size={18} aria-hidden="true" />
        </div>
      </div>
      {mascota.vacunado && <span className="vaccinated-caption"><Check size={14} /> Esquema de vacunación al día</span>}
    </article>
  );
}

export default TaskCard;
