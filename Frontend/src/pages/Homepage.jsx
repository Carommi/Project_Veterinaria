import { useEffect, useState } from 'react';
import {
  HeartPulse,
  PawPrint,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { editarMascota, eliminarMascota, listarMascotas } from '../api/mascotas';
import TaskList from '../components/TaskList';

function Homepage() {
  const [mascotas, setMascotas] = useState([]);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('todas');

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
      setMascotas((lista) => lista.map((item) => (item.id === mascota.id ? actualizada : item)));
    } catch {
      setError('No se pudo actualizar el estado de vacunacion.');
    }
  }

  async function borrarMascota(id) {
    if (!window.confirm('Quieres eliminar esta mascota?')) return;

    try {
      await eliminarMascota(id);
      setMascotas((lista) => lista.filter((mascota) => mascota.id !== id));
    } catch {
      setError('No se pudo eliminar la mascota.');
    }
  }

  const vacunadas = mascotas.filter((mascota) => mascota.vacunado).length;
  const pendientes = mascotas.length - vacunadas;
  const mascotasVisibles = mascotas.filter((mascota) => {
    const texto = `${mascota.nombre_mascota} ${mascota.especie} ${mascota.motivo_consulta}`.toLowerCase();
    const coincideBusqueda = texto.includes(busqueda.toLowerCase());
    const coincideFiltro = filtro === 'todas' || mascota.vacunado === (filtro === 'vacunadas');
    return coincideBusqueda && coincideFiltro;
  });

  return (
    <main className="page-width home-page">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={15} /> REGISTRO VETERINARIO</p>
          <h1>Pequeñas huellas,<br /><span>grandes historias.</span></h1>
          <p className="hero-description">
            Un espacio especial para cuidar la salud y el bienestar de cada paciente.
          </p>
          <a className="hero-link" href="#pacientes">
            Explorar pacientes <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-sun" />
          <div className="hero-paw"><PawPrint size={88} strokeWidth={1.1} /></div>
          <div className="hero-note"><HeartPulse size={17} /> Cuidar también es amar</div>
          <span className="hero-spark spark-one">✳</span>
          <span className="hero-spark spark-two">✦</span>
        </div>
        <span className="hero-index">01 <i /> BIENESTAR ANIMAL</span>
      </section>

      <section className="stats-grid" aria-label="Resumen de pacientes">
        <article className="stat-card stat-total">
          <span className="stat-icon"><PawPrint size={20} /></span>
          <div><p>Pacientes registrados</p><strong>{mascotas.length}</strong></div>
          <span className="stat-caption">en seguimiento</span>
        </article>
        <article className="stat-card">
          <span className="stat-icon stat-icon-green"><ShieldCheck size={20} /></span>
          <div><p>Vacunación al día</p><strong>{vacunadas}</strong></div>
          <span className="stat-caption">pacientes protegidos</span>
        </article>
        <article className="stat-card">
          <span className="stat-icon stat-icon-gold"><ShieldAlert size={20} /></span>
          <div><p>Requieren atención</p><strong>{pendientes}</strong></div>
          <span className="stat-caption">vacunas pendientes</span>
        </article>
      </section>

      <section className="directory-section" id="pacientes">
        <div className="section-heading">
          <div>
            <p className="eyebrow eyebrow-dark">EL CUIDADO EMPIEZA AQUÍ</p>
            <h2>Pacientes <span>Mascotas</span></h2>
            <p className="section-description">Cada ficha cuenta una historia que merece atención.</p>
          </div>
          <span className="patient-count">{mascotas.length} {mascotas.length === 1 ? 'paciente' : 'pacientes'}</span>
        </div>

        <div className="directory-tools">
          <label className="search-box">
            <Search size={19} aria-hidden="true" />
            <input
              type="search"
              placeholder="Buscar por nombre, especie o consulta..."
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
              aria-label="Buscar pacientes"
            />
          </label>
          <div className="filter-tabs" aria-label="Filtrar pacientes">
            <button className={filtro === 'todas' ? 'filter-tab active' : 'filter-tab'} onClick={() => setFiltro('todas')} aria-pressed={filtro === 'todas'}>Todas</button>
            <button className={filtro === 'vacunadas' ? 'filter-tab active' : 'filter-tab'} onClick={() => setFiltro('vacunadas')} aria-pressed={filtro === 'vacunadas'}>Al día</button>
            <button className={filtro === 'pendientes' ? 'filter-tab active' : 'filter-tab'} onClick={() => setFiltro('pendientes')} aria-pressed={filtro === 'pendientes'}>Pendientes</button>
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}
        {cargando ? (
          <p className="loading-message">Preparando las fichas de tus pacientes...</p>
        ) : (
          <TaskList
            mascotas={mascotasVisibles}
            alCambiarVacuna={cambiarVacunacion}
            alEliminar={borrarMascota}
          />
        )}
      </section>

      <footer className="site-footer">
        <span><PawPrint size={16} /> Diana Vet</span>
        <p>Un cuidado lleno de cariño, para cada etapa de su vida.</p>
      </footer>
    </main>
  );
}

export default Homepage;
