import { CintaSuperiorLogo } from "../components/CintaSuperiorLogo";
import { Nav } from "./Nav";

export const Header = ({navegacion, rol}) => {
  
  return (
    <header>
      <CintaSuperiorLogo />
      <div className="bg-slate-300 flex justify-between px-[2px] sm:px-4 md:px-20 py-4 shadow">
        <div className="flex flex-col items-center text-slate-800">
          <h1 className="sm:text-2xl font-bold">{rol}</h1>
          <p className="opacity-60 font-semibold">Usuario.nombre</p>
        </div>
        <Nav navegacion={navegacion}/>
      </div>
    </header>
  );
};
