import logo from "../assets/logo.png";
import { Navegacion } from "./Navegacion";

export const Cabecera = () => {
  return (
    <header className="grid grid-cols-2">
      <div className="col-span-2 bg-linear-to-r from-cyan-700 to-blue-700 py-4 shadow">
        <img
          src={logo}
          alt="logo de Global Talent Connections"
          className="w-62 mx-auto"
        />
      </div>
      <div className="bg-slate-300 col-span-2 flex justify-between px-2 sm:px-4 md:px-20 py-4 shadow">
        <div className="flex flex-col items-center text-slate-800">
          <h1 className="text-2xl font-bold">Asistente</h1>
          <p className="opacity-60 font-semibold">Usuario.nombre</p>
        </div>
        <Navegacion />
      </div>
    </header>
  );
};
