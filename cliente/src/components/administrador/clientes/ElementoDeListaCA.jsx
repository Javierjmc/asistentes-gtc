import React from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export const ElementoDeListaCA = ({ nombre, asistentes, onAssignAsistente }) => {
  return (
    <li className="grid grid-cols-5 bg-slate-100 text-slate-800 border-t border-slate-400 hover:bg-slate-300 transition-colors duration-150">
      <span className="text-center border-r border-slate-400 py-1 col-span-2 font-semibold">
        {nombre}
      </span>
      <span className="text-center py-1 grid border-r border-slate-400 col-span-2">
        {asistentes && asistentes.length > 0 ? (
          asistentes.map((asistente) => (
            <span key={asistente.id} className="text-blue-800 font-semibold">{asistente.nombre}</span>
          ))
        ) : (
          <span className="text-red-800/90">Sin asistentes asignados</span>
        )}
      </span>
      <span className="grid place-items-center">
        <button
          onClick={onAssignAsistente}
          className="cursor-pointer flex items-center justify-center rounded-full text-slate-500 hover:text-white hover:bg-blue-500 transition"
        >
          <PlusCircleIcon className="h-6 w-6 stroke-2" />
        </button>
      </span>
    </li>
  );
};