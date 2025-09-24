import React from 'react';

export const CabeceraDeListaAA = () => {
  return (
    <li className="grid grid-cols-4 bg-slate-700 text-slate-200 font-semibold">
      <span className="text-center border-r border-slate-400 py-2 col-span-2">
        Nombre
      </span>
      <span className="text-center border-r border-slate-400 py-2 col-span-2">
        Correo
      </span>
    </li>
  );
};