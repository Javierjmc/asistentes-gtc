import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

// Componente para cada elemento de navegación
const ElementoDeNavegacion = ({ ruta, titulo, icono }) => {
  return (
    <Link
      to={ruta}
      className="flex flex-col sm:flex-row items-center justify-center hover:text-blue-700 hover:scale-105 transition"
    >
      {icono}
      <span className="text-sm sm:text-base">{titulo}</span>
    </Link>
  );
};

export const Nav = ({ navegacion, onLogout }) => {
  return (
    <nav className="text-slate-800 flex items-center justify-center gap-2 sm:gap-4 md:gap-8">
      {navegacion.map((elemento, index) => (
        <ElementoDeNavegacion
          key={index}
          titulo={elemento.titulo}
          ruta={elemento.ruta}
          icono={elemento.icono}
        />
      ))}
      <button
        onClick={onLogout}
        className="flex flex-col sm:flex-row items-center justify-center hover:text-blue-700 hover:scale-105 transition"
      >
        <ArrowLeftOnRectangleIcon className="h-6 w-6 stroke-2" />
        <span className="text-sm sm:text-base">Salir</span>
      </button>
    </nav>
  );
};