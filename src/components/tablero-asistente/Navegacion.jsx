import { Link } from "react-router";
import {
  HomeIcon,
  FolderIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";

export const Navegacion = () => {
  return (
    <nav className="text-slate-800 flex items-center justify-center gap-2 sm:gap-4 md:gap-8">
      <Link to="/" className="flex items-center justify-center hover:text-blue-700 hover:scale-105 transition">
        <HomeIcon className="h-6 w-6 mr-2" />
        <span className="hidden sm:flex">Tablero</span>
      </Link>
      <Link to="/formulario" className="flex items-center justify-center hover:text-blue-700 hover:scale-105 transition">
        <DocumentIcon className="h-6 w-6 mr-2" />
        <span className="hidden sm:flex">Formulario</span>
      </Link>
      <Link to="/informes" className="flex items-center justify-center hover:text-blue-700 hover:scale-105 transition">
        <FolderIcon className="h-6 w-6 mr-2" />
        <span className="hidden sm:flex">Informes</span>
      </Link>
    </nav>
  );
};
