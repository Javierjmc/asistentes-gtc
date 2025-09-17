export const CabeceraDeListaCA = () => {
  return (
    <li className="grid grid-cols-7 bg-slate-700 text-slate-200 font-semibold">
      <span className="text-center border-r border-slate-400 py-2 col-span-2">
        Cliente
      </span>
      <span className="text-center border-r border-slate-400 py-2 col-span-2">
        Empresa
      </span>
      <span className="text-center border-r border-slate-400 py-2 col-span-2">
        Asistentes
      </span>
      <span className="text-center   py-2 col-span-1">Acciones</span>
    </li>
  );
};
