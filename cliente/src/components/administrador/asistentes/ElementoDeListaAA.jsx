import React from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

export const ElementoDeListaAA = ({ nombre, email }) => {
  return (
    <li className="grid grid-cols-4 bg-slate-100 text-slate-800 border-t border-slate-400">
      <span className="text-center border-r border-slate-400 py-1 col-span-2">
        {nombre}
      </span>
      <span className="text-center py-1 grid border-r border-slate-400 col-span-2">
        {email}
      </span>
    </li>
  );
};