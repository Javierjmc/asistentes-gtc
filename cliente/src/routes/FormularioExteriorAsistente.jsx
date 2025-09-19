import { useState } from "react";
import {
  ClipboardDocumentListIcon,
  TrophyIcon,
  LightBulbIcon,
  ChartBarIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { FormularioActividades } from "../components/asistente/FormularioActividades";
import { FormularioObjetivos } from "../components/asistente/FormularioObjetivos";
import { FormularioSugerencias } from "../components/asistente/FormularioSugerencias";
import { FormularioMetricas } from "../components/asistente/FormularioMetricas";
import { VistaPreviaPDF } from "../components/asistente/VistaPreviaPDF";
import { Layout } from "../layout/Layout";
import { useStore } from "../store";
import { PlusIcon } from "@heroicons/react/24/outline";

export const FormularioExteriorAsistente = () => {
  const [activeTab, setActiveTab] = useState("Actividades");
  const {
    actividades,
    goals,
    sugerencias,
    screenshots,
    saveReport,
    resetForms,
  } = useStore();

  const handleSaveReport = () => {
    const newReport = {
      date: new Date().toLocaleDateString("es-ES"),
      actividades: actividades,
      goals: goals,
      sugerencias: sugerencias,
      screenshots: screenshots,
    };
    saveReport(newReport);
    resetForms();
    setActiveTab("Actividades"); // Vuelve a la primera pestaña
  };

  const menuItems = [
    { name: "Actividades", icon: ClipboardDocumentListIcon },
    { name: "Objetivos", icon: TrophyIcon },
    { name: "Sugerencias", icon: LightBulbIcon },
    { name: "Métricas", icon: ChartBarIcon },
    { name: "Ver PDF", icon: EyeIcon },
  ];

  return (
    <Layout rol="asistente">
      <div className="font-sans antialiased text-gray-800">
        <nav className="mx-auto">
          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 w-fit mx-auto">
            {menuItems.map((item) => {
              const isActive = activeTab === item.name;
              const IconComponent = item.icon;
              return (
                <li key={item.name} className="me-2">
                  <button
                    onClick={() => setActiveTab(item.name)}
                    className={`
                      inline-flex items-center justify-center p-4 py-3 border-b-2 rounded-t-lg group transition-all duration-300 ease-in-out
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
          {activeTab === "Actividades" && <FormularioActividades />}
          {activeTab === "Objetivos" && <FormularioObjetivos />}
          {activeTab === "Sugerencias" && <FormularioSugerencias />}
          {activeTab === "Métricas" && <FormularioMetricas />}
          {activeTab === "Ver PDF" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleSaveReport}
                  className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
                >
                  <PlusIcon className="h-5 w-5 mr-2" /> Guardar Reporte
                </button>
              </div>
              <VistaPreviaPDF />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};