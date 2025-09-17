import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { CintaSuperiorLogo } from "../CintaSuperiorLogo";
import { MenuActivo } from "./MenuActivo";

export const CabeceraCliente = () => {
  const [menu, setMenu] = useState(true);

  return (
    <header>
      <CintaSuperiorLogo />
      <div className="bg-slate-300 col-span-2 flex justify-between px-2 sm:px-4 md:px-20 py-6 shadow text-slate-800">
        <h1 className="text-2xl font-semibold">Portal de clientes</h1>
        <Bars3Icon
          className="h-8 w-8 cursor-pointer sm:hidden active:text-blue-600 transition"
          onClick={() => setMenu(!menu)}
        />
      </div>
      <div className="sm:hidden">{menu && <MenuActivo />}</div>

    </header>
  );
};
