import { useState } from "react";
import { Layout } from "../layout/Layout";
import { useStore } from "../store";

export const InformesAdministrador = () => {
  const { reports } = useStore();
  const [selectedReportId, setSelectedReportId] = useState(null);

  // Componente para mostrar un informe detallado
  const ReportDetail = ({ report }) => {
    return (
      <div className="bg-slate-100 p-6 rounded-b-lg shadow-inner border-t border-gray-300">
        
        {/* Sección de Actividades */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-blue-700">Actividades</h3>
          <ul className="list-disc list-inside space-y-1 mt-1">
            {report.actividades.length > 0 ? (
              report.actividades.map((act, index) => (
                <li key={index}>
                  <span className="font-medium">{act.titulo}:</span>{" "}
                  {act.descripcion}
                </li>
              ))
            ) : (
              <p className="text-gray-500 italic">No hay actividades registradas.</p>
            )}
          </ul>
        </div>
        
        {/* Sección de Objetivos */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-blue-700">Objetivos</h3>
          <ul className="list-disc list-inside space-y-1 mt-1">
            {report.goals.length > 0 ? (
              report.goals.map((goal, index) => (
                <li key={index}>
                  <span className="font-medium">{goal.title}:</span>{" "}
                  {goal.description}
                </li>
              ))
            ) : (
              <p className="text-gray-500 italic">No hay objetivos registrados.</p>
            )}
          </ul>
        </div>
        
        {/* Sección de Sugerencias */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-blue-700">Sugerencias</h3>
          <ul className="list-disc list-inside space-y-1 mt-1">
            {report.sugerencias.length > 0 ? (
              report.sugerencias.map((sug, index) => (
                <li key={index}>{sug.texto}</li>
              ))
            ) : (
              <p className="text-gray-500 italic">No hay sugerencias registradas.</p>
            )}
          </ul>
        </div>
        
        {/* Sección de Métricas */}
        <div>
          <h3 className="text-lg font-semibold text-blue-700">Métricas</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
            {report.screenshots.length > 0 ? (
              report.screenshots.map((screen, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={screen.preview}
                    alt={screen.title}
                    className="w-full h-24 object-cover rounded-md shadow-sm border border-gray-300"
                  />
                  <span className="mt-1 text-sm text-center truncate w-full">
                    {screen.title}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic col-span-full">No hay capturas de pantalla.</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout rol="administrador">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl text-white font-bold mb-6">Informes de Asistentes</h1>
        
        {reports.length > 0 ? (
          <div className="grid gap-4">
            {reports.map((report) => (
              <div 
                key={report.id}
                className="rounded-lg shadow-md overflow-hidden" 
              >
                {/* Cabecera del acordeón */}
                <div 
                  className={`p-4 cursor-pointer flex justify-between items-center transition-colors ${selectedReportId === report.id ? 'bg-slate-400 rounded-t-lg' : 'bg-slate-300 rounded-lg hover:bg-slate-400'}`}
                  onClick={() => setSelectedReportId(selectedReportId === report.id ? null : report.id)}
                >
                  <h2 className="text-lg font-semibold">Informe del {report.date}</h2>
                  {/* Icono de flecha animado */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 text-gray-700 transition-transform duration-300 transform ${selectedReportId === report.id ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {/* Contenido del acordeón con animación de deslizamiento */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${selectedReportId === report.id ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  {selectedReportId === report.id && <ReportDetail report={report} />}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300 italic text-lg">No hay informes disponibles. Pide a un asistente que guarde un informe.</p>
        )}
      </div>
    </Layout>
  );
};