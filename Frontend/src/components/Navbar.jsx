import { Link } from 'react-router-dom';
import { PawPrint, Plus } from 'lucide-react';

function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-teal-800">
          <PawPrint aria-hidden="true" />
          Veterinaria Diana
        </Link>
        <Link
          to="/mascotas/nueva"
          className="flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white hover:bg-teal-800"
        >
          <Plus size={18} aria-hidden="true" />
          Registrar mascota
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
