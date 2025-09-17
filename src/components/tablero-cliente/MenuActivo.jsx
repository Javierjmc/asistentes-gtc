import { Link } from "react-router";
import {
  FolderIcon,
  UsersIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

export const MenuActivo = () => {
  return (
    <nav className="absolute w-full rounded-b-md shadow bg-linear-to-b from-slate-300 to-slate-500 flex-col flex flex-col items-center gap-4 py-4">
      <Link
        to="/"
        className="py-6 flex items-center justify-center hover:text-white hover:bg-slate-400 transition"
      >
        <UsersIcon className="h-6 w-6 mr-2" />
        <span>Asistentes</span>
      </Link>
      <Link
        to="/"
        className="py-6 flex items-center justify-center hover:text-white  hover:bg-slate-400 transition"
      >
        <DocumentTextIcon className="h-6 w-6 mr-2" />
        <span>Actividades</span>
      </Link>
      <Link
        to="/"
        className="py-6 flex items-center justify-center hover:text-white  hover:bg-slate-400 transition"
      >
        <FolderIcon className="h-6 w-6 mr-2" />
        <span>Informes</span>
      </Link>
    </nav>
  );
};
