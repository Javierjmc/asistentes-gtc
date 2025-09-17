import { useStore } from "../../../store";

export const VistaPreviaPDF = () => {
  const { actividades, goals, sugerencias, screenshots } = useStore();

  return (
    <div className="font-sans antialiased sm:rounded-lg bg-slate-100 p-6 text-gray-800 text-sm shadow-xl">
      <h1 className="font-bold text-2xl text-slate-800 text-center mb-6">
        Vista Previa del Reporte
      </h1>

      {/* Sección de Actividades */}
      <section className="mb-6">
        <h2 className="font-bold text-lg sm:text-xl text-blue-700 mb-3">
          Actividades Realizadas
        </h2>
        {actividades.length === 0 ? (
          <p className="text-gray-500 italic">No hay actividades añadidas.</p>
        ) : (
          <ul className="list-disc list-inside space-y-2">
            {actividades.map((actividad, index) => (
              <li key={index}>
                <span className="font-semibold">{actividad.titulo}: </span>
                {actividad.descripcion}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Sección de Objetivos */}
      <section className="mb-6">
        <h2 className="font-bold text-lg sm:text-xl text-blue-700 mb-3">
          Objetivos
        </h2>
        {goals.length === 0 ? (
          <p className="text-gray-500 italic">No hay objetivos añadidos.</p>
        ) : (
          <ul className="list-disc list-inside space-y-2">
            {goals.map((goal, index) => (
              <li key={index}>
                <span className="font-semibold">{goal.title}: </span>
                {goal.description}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Sección de Sugerencias */}
      <section className="mb-6">
        <h2 className="font-bold text-lg sm:text-xl text-blue-700 mb-3">
          Sugerencias Técnicas
        </h2>
        {sugerencias.length === 0 ? (
          <p className="text-gray-500 italic">No hay sugerencias añadidas.</p>
        ) : (
          <ul className="list-disc list-inside space-y-2">
            {sugerencias.map((sugerencia, index) => (
              <li key={index}>{sugerencia.texto}</li>
            ))}
          </ul>
        )}
      </section>

      {/* Sección de Capturas de Pantalla */}
      <section>
        <h2 className="font-bold text-lg sm:text-xl text-blue-700 mb-3">
          Capturas de Pantalla
        </h2>
        {screenshots.length === 0 ? (
          <p className="text-gray-500 italic">No hay capturas de pantalla añadidas.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {screenshots.map((screenshot, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={screenshot.preview}
                  alt={screenshot.title}
                  className="w-full h-24 object-cover rounded-lg shadow-md border border-gray-300"
                />
                <p className="text-xs text-center mt-2 truncate w-full">
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