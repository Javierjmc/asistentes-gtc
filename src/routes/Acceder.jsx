import { Link } from "react-router";
import logo from "../assets/logo.png";

export const Acceder = () => {
  return (
    <main className="min-h-screen bg-linear-to-t from-blue-950 to-blue-800 flex justify-center items-center">
      <section className="w-[315px] sm:w-[350px] rounded-lg overflow-hidden shadow-md bg-slate-900">
        <div className="py-12 flex flex-col gap-6 items-center">
          <img
            src={logo}
            alt="Logo de Global Talent Connections"
            className="w-62 opacity-70"
          />
        </div>
        <form className="flex flex-col gap-6 py-6 px-4 sm:px-6 rounded-t-md overflow-hidden bg-slate-400">
          <fieldset className="flex flex-col">
            <label htmlFor="" className="font-semibold text-slate-800">
              Ingrese Correo
            </label>
            <input
              type="text"
              placeholder="Indique su correo"
              className="bg-slate-500/50 py-3 px-2 rounded outline-none shadow"
            />
          </fieldset>
          <fieldset className="flex flex-col">
            <label className="font-semibold text-slate-800">
              Ingrese Contraseña
            </label>
            <input
              type="password"
              placeholder="Contraseña"
              className="bg-slate-500/50 py-3 px-2 rounded outline-none shadow"
            />
          </fieldset>
          <Link
            to="/clientes-administrador"
            className="bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-cyan-600 text-white text-center font-semibold rounded py-3 shadow-md transition-all duration-300 ease-in-out transform cursor-pointer"
          >
            Acceder
          </Link>
        </form>
      </section>
    </main>
  );
};
