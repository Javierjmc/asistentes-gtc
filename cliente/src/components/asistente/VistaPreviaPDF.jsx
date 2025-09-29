import { useStore } from "../../store";
import {
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  LightBulbIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";

export const VistaPreviaPDF = () => {
  const { actividades, goals, sugerencias, screenshots } = useStore();

  return (
    <div className="font-sans antialiased bg-slate-100 p-8 rounded-2xl text-gray-800 shadow-2xl space-y-8">
      <h1 className="font-extrabold text-3xl text-slate-800 text-center">
        Previsualización del Reporte
      </h1>

      {/* Sección de Actividades */}
      <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="font-bold text-xl text-blue-700 flex items-center gap-2 mb-4">
          <ClipboardDocumentListIcon className="h-6 w-6" />
          Actividades Realizadas
        </h2>
        {actividades.length === 0 ? (
          <p className="text-gray-400 italic text-center py-2">
            No hay actividades añadidas.
          </p>
        ) : (
          <ul className="list-disc list-inside space-y-3">
            {actividades.map((actividad, index) => (
              <li key={index} className="pl-2 text-start text-sm">
                <span className="font-semibold">{actividad.titulo}: </span>
                {actividad.descripcion}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Sección de Objetivos */}
      <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="font-bold text-xl text-blue-700 flex items-center gap-2 mb-4">
          <CheckCircleIcon className="h-6 w-6" />
          Objetivos
        </h2>
        {goals.length === 0 ? (
          <p className="text-gray-400 italic text-center py-2">
            No hay objetivos añadidos.
          </p>
        ) : (
          <ul className="list-disc list-inside space-y-3">
            {goals.map((goal, index) => (
              <li key={index} className="pl-2 text-start text-sm">
                <span className="font-semibold">{goal.title}: </span>
                {goal.description}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Sección de Sugerencias */}
      <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="font-bold text-xl text-blue-700 flex items-center gap-2 mb-4">
          <LightBulbIcon className="h-6 w-6" />
          Sugerencias Técnicas
        </h2>
        {sugerencias.length === 0 ? (
          <p className="text-gray-400 italic text-center py-2">
            No hay sugerencias añadidas.
          </p>
        ) : (
          <ul className="list-disc list-inside space-y-3">
            {sugerencias.map((sugerencia, index) => (
              <li key={index} className="pl-2 text-start text-sm">{sugerencia.texto}</li>
            ))}
          </ul>
        )}
      </section>

      {/* Sección de Capturas de Pantalla */}
      <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="font-bold text-xl text-blue-700 flex items-center gap-2 mb-4">
          <CameraIcon className="h-6 w-6" />
          Capturas de Pantalla
        </h2>
        {screenshots.length === 0 ? (
          <p className="text-gray-400 italic text-center py-2">
            No hay capturas de pantalla añadidas.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="flex flex-col items-center group cursor-pointer"
              >
                <img
                  src={screenshot.preview}
                  alt={screenshot.title}
                  className="w-full h-24 object-cover rounded-lg shadow-md border border-gray-300 transition-transform group-hover:scale-105"
                />
                <p className="text-xs text-center mt-2 truncate w-full group-hover:text-blue-600 transition-colors">
                  {screenshot.title}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};