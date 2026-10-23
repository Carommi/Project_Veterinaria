import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, PawPrint, Sparkles } from 'lucide-react';
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
        .catch(() => setError('No se pudo cargar la ficha. Intenta regresar al inicio.'));
    }
  }, [id]);

  function cambiarCampo(evento) {
    const { name, value, type, checked } = evento.target;
    setFormulario({ ...formulario, [name]: type === 'checkbox' ? checked : value });
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
    <main className="page-width form-page">
      <Link to="/" className="back-link"><ArrowLeft size={17} /> Volver a pacientes</Link>

      <div className="form-layout">
        <aside className="form-aside">
          <span className="form-aside-brand"><PawPrint size={20} /> DIANA VET</span>
          <div className="form-aside-message">
            <span className="aside-kicker"><Sparkles size={14} /> CUIDADO CON CARIÑO</span>
            <h1>Una nueva historia empieza con <em>su nombre.</em></h1>
            <p>Guarda sus datos para acompañar cada visita y cuidar mejor de su salud.</p>
          </div>
          <div className="aside-reminder">
            <span className="reminder-check"><Check size={17} /></span>
            <p><strong>Un buen cuidado</strong><br />comienza con una buena ficha.</p>
          </div>
          <span className="aside-decoration" aria-hidden="true">✳</span>
        </aside>

        <section className="form-panel">
          <div className="form-panel-heading">
            <span className="form-number">FICHA DEL PACIENTE <i /> 01</span>
            <h2>{id ? 'Actualizar ficha' : 'Registrar mascota'}</h2>
            <p>Completa la información principal del paciente.</p>
          </div>

          <form onSubmit={guardar} className="pet-form">
            <div className="form-fields-row">
              <label className="form-field">
                <span>Nombre de la mascota <b>*</b></span>
                <input
                  name="nombre_mascota"
                  value={formulario.nombre_mascota}
                  onChange={cambiarCampo}
                  placeholder="Ej. Luna"
                  required
                />
              </label>
              <label className="form-field">
                <span>Especie <b>*</b></span>
                <input
                  name="especie"
                  value={formulario.especie}
                  onChange={cambiarCampo}
                  placeholder="Perro, gato..."
                  required
                />
              </label>
            </div>

            <label className="form-field">
              <span>Motivo de consulta <b>*</b></span>
              <textarea
                name="motivo_consulta"
                value={formulario.motivo_consulta}
                onChange={cambiarCampo}
                placeholder="Cuéntanos brevemente qué necesita..."
                rows="4"
                required
              />
            </label>

            <label className="vaccination-check">
              <input
                type="checkbox"
                name="vacunado"
                checked={formulario.vacunado}
                onChange={cambiarCampo}
              />
              <span className="custom-check"><Check size={14} /></span>
              <span><strong>Vacunación al día</strong><small>La mascota cuenta con sus vacunas.</small></span>
            </label>

            {error && <p className="form-error">{error}</p>}

            <div className="form-actions">
              <button type="submit" className="button button-primary submit-button">
                {id ? 'Guardar cambios' : 'Guardar paciente'} <ArrowLeft className="submit-arrow" size={17} />
              </button>
              <span>Los campos con * son obligatorios</span>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default TaskForm;
