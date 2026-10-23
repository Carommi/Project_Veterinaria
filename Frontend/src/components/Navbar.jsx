import { Link } from 'react-router-dom';
import { ArrowUpRight, PawPrint, Plus } from 'lucide-react';

function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar page-width">
        <Link to="/" className="brand" aria-label="Diana Vet, inicio">
          <span className="brand-mark"><PawPrint size={23} strokeWidth={2.2} /></span>
          <span className="brand-copy">
            <strong>Diana Vet</strong>
            <small>CUIDADO VETERINARIO</small>
          </span>
        </Link>

        <div className="nav-actions">
          <span className="clinic-status"><span /> Clínica en servicio</span>
          <Link to="/mascotas/nueva" className="button button-primary nav-button">
            <Plus size={18} /> <span>Nueva mascota</span> <ArrowUpRight className="button-arrow" size={16} />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
