import { Link } from "react-router";
import {  
  FolderIcon,
  UsersIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

export const NavegacionCliente = () => {
  return (
    <nav className="hidden sm:flex bg-linear-to-b from-slate-300 to-slate-500 shadow flex-col h-full col-span-1">
      <Link
        to="/"
        className="py-6 flex items-center justify-center hover:text-white hover:bg-slate-400 transition"
      >
        <UsersIcon className="h-6 w-6 mr-2" />
        <span className="hidden sm:flex">Asistentes</span>
      </Link>
      <Link
        to="/"
        className="py-6 flex items-center justify-center hover:text-white  hover:bg-slate-400 transition"
      >
        <DocumentTextIcon className="h-6 w-6 mr-2" />
        <span className="hidden sm:flex">Actividades</span>
      </Link>
      <Link
        to="/"
        className="py-6 flex items-center justify-center hover:text-white  hover:bg-slate-400 transition"
      >
        <FolderIcon className="h-6 w-6 mr-2" />
        <span className="hidden sm:flex">Informes</span>
      </Link>
    </nav>
  );
};
