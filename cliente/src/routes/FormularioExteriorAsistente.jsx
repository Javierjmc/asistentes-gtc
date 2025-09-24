import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  ClipboardDocumentListIcon,
  TrophyIcon,
  LightBulbIcon,
  ChartBarIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { FormularioActividades } from "../components/asistente/FormularioActividades";
import { FormularioObjetivos } from "../components/asistente/FormularioObjetivos";
import { FormularioSugerencias } from "../components/asistente/FormularioSugerencias";
// import { FormularioMetricas } from "../components/asistente/FormularioMetricas";
import { VistaPreviaPDF } from "../components/asistente/VistaPreviaPDF";
import { Layout } from "../layout/Layout";
import { useStore } from "../store";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export const FormularioExteriorAsistente = () => {
  const [activeTab, setActiveTab] = useState("Actividades");
  const { clienteId } = useParams();
  const navigate = useNavigate();
  const {
    actividades,
    goals,
    sugerencias,
    // screenshots, // métricas deshabilitadas
    saveReport,
    resetForms,
  } = useStore();

  const handleSaveReport = async () => {
    try {
      const contenido = {
        actividades,
        goals,
        sugerencias,
        // screenshots, // métricas deshabilitadas
      };

      const newReport = {
        cliente_id: clienteId,
        titulo: `Reporte ${new Date().toLocaleDateString('es-ES')}`,
        contenido,
      };

      const res = await saveReport(newReport);
      if (!res.success) {
        throw new Error(res.error || 'No se pudo guardar el reporte');
      }

      resetForms();
      alert("¡Reporte guardado con éxito!");
      navigate("/informes-asistente");
    } catch (e) {
      alert(e.message || "Error al guardar el reporte.");
    }
  };

  const tabs = [
    { name: "Actividades", icon: <ClipboardDocumentListIcon className="h-6 w-6" /> },
    { name: "Objetivos", icon: <TrophyIcon className="h-6 w-6" /> },
    { name: "Sugerencias", icon: <LightBulbIcon className="h-6 w-6" /> },
    // { name: "Métricas", icon: <ChartBarIcon className="h-6 w-6" /> }, // deshabilitado
    { name: "Ver Datos", icon: <EyeIcon className="h-6 w-6" /> },
  ];  
  return (
    <Layout rol="asistente">
      <nav className="font-sans antialiased text-gray-700 bg-slate-300 py-4 px-2 sm:px-6 md:p-6 rounded-lg shadow-inner">
        <ul className="flex justify-center space-x-2 sm:space-x-4">
          {tabs.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <li key={item.name}>
                <button
                  onClick={() => setActiveTab(item.name)}
                  className={`
                    flex items-center space-x-2 p-2 sm:p-3 md:p-4 rounded-full
                    transition-all duration-300 ease-in-out
                    ${isActive
                      ? "bg-white text-blue-600 shadow-md transform scale-105"
                      : "text-slate-800 hover:bg-slate-200 hover:text-slate-700"
                    }
                  `}
                >
                  <span className="h-6 w-6">{item.icon}</span>
                  <span className="hidden sm:flex">{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-8 rounded-xl max-w-5xl mx-auto text-center text-lg text-gray-700">
        {activeTab === "Actividades" && <FormularioActividades />}
        {activeTab === "Objetivos" && <FormularioObjetivos />}
        {activeTab === "Sugerencias" && <FormularioSugerencias />}
        {/* {activeTab === "Métricas" && <FormularioMetricas />} */}
        {activeTab === "Ver Datos" && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleSaveReport}
                className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
              >
                <PlusIcon className="h-5 w-5 mr-2" /> Guardar Reporte
              </button>
              <button
                type="button"
                onClick={resetForms}
                className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
              >
                <TrashIcon className="h-5 w-5 mr-2" /> Borrar Formulario
              </button>
            </div>
            <VistaPreviaPDF />
          </div>
        )}
      </div>
    </Layout>
  );
};