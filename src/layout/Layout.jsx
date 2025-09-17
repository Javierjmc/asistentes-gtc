import { Header } from "../components/Header";
import {
  HomeIcon,
  FolderIcon,
  DocumentIcon,
  DocumentTextIcon,
  BanknotesIcon,
  UserGroupIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/outline";

export const Layout = ({ children, rol }) => {
  let navegacion;

  // para el rol de administrador
  if (rol == "administrador") {
    navegacion = [
      {
        titulo: "Clientes",
        icono: <PuzzlePieceIcon className="h-6 w-6 mr-2" />,
        ruta: "/clientes-administrador",
      },
      {
        titulo: "Asistentes",
        icono: <UserGroupIcon className="h-6 w-6 mr-2" />,
        ruta: "/asistentes-administrador",
      },
      {
        titulo: "Informes",
        icono: <DocumentTextIcon className="h-6 w-6 mr-2" />,
        ruta: "/informes-administrador",
      },
    ];
  }

  // para el rol de asistente
  if (rol == "asistente") {
    navegacion = [
      {
        titulo: "Formulario",
        icono: <FolderIcon className="h-6 w-6 mr-2" />,
        ruta: "/formulario-asistente",
      },
      {
        titulo: "Informes",
        icono: <DocumentIcon className="h-6 w-6 mr-2" />,
        ruta: "/informes-asistente",
      },
    ];
  }

  // para el rol de cliente
  if (rol == "cliente") {
    navegacion = [
      {
        titulo: "Tablero",
        icono: <HomeIcon className="h-6 w-6 mr-2" />,
        ruta: "/tablero-cliente",
      },
      {
        titulo: "Asistentes",
        icono: <DocumentIcon className="h-6 w-6 mr-2" />,
        ruta: "/asistentes-cliente",
      },
      {
        titulo: "Informes-cliente",
        icono: <DocumentIcon className="h-6 w-6 mr-2" />,
        ruta: "/informe-cliente",
      },
    ];
  }

  return (
    <main className="min-h-screen bg-linear-to-r from-slate-950 to-blue-950">
      <Header navegacion={navegacion} rol={rol} />
      <section className="max-w-6xl mx-auto py-8">{children}</section>
    </main>
  );
};
