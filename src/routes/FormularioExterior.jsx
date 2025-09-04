import { LayoutBasico } from "../layout/LayoutBasico";
import { useState } from "react";
import {
  ClipboardDocumentListIcon,
  TrophyIcon,
  LightBulbIcon,
  ChartBarIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { FormularioActividades } from "../components/formulario/FormularioActividades";
import { FormularioObjetivos } from "../components/formulario/FormularioObjetivos";
import { FormularioSugerencias } from "../components/formulario/FormularioSugerencias";
import { FormularioMetricas } from "../components/formulario/FormularioMetricas";

export const FormularioExterior = () => {
  const [activeTab, setActiveTab] = useState("Actividades");

  const menuItems = [
    { name: "Actividades", icon: ClipboardDocumentListIcon },
    { name: "Objetivos", icon: TrophyIcon },
    { name: "Sugerencias", icon: LightBulbIcon },
    { name: "Métricas", icon: ChartBarIcon },
    { name: "Ver PDF", icon: EyeIcon },
  ];

  return (
    <LayoutBasico>
      <div className="font-sans antialiased text-gray-800">
        <nav className="sm:p-2 w-fit mx-auto">
          <ul className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.name;

              return (
                <li key={item.name}>
                  <button
                    onClick={() => setActiveTab(item.name)}
                    className={`
                      relative flex flex-col items-center justify-center p-4 rounded-2xl font-semibold text-sm
                      transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl cursor-pointer
                      ${
                        isActive
                          ? "bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl"
                          : "bg-slate-400 text-slate-800 hover:bg-slate-300"
                      }
                    `}
                  >
                    <IconComponent
                      className={`h-6 w-6 mb-1 transition-colors duration-300
                        ${
                          isActive
                            ? "text-white"
                            : "text-slate-800 group-hover:text-slate-700"
                        }
                      `}
                    />
                    <span className="hidden sm:flex">{item.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Contenido dinámico */}
        <div className="mt-8 rounded-xl max-w-5xl mx-auto text-center text-lg text-gray-700">
          {activeTab === "Actividades" && (
            <FormularioActividades />
          )}
          {activeTab === "Objetivos" && (
            <FormularioObjetivos />
          )}
          {activeTab === "Sugerencias" && (
            <FormularioSugerencias />
          )}
          {activeTab === "Métricas" && (
            <FormularioMetricas />
          )}
        </div>
      </div>
    </LayoutBasico>
  );
};