import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useStore } from "../../../store";

export const FormularioSugerencias = () => {
  const {
    sugerencias,
    sugerenciaForm,
    editingSugerenciaIndex,
    error,
    setSugerenciaForm,
    setEditingSugerenciaIndex,
    addSugerencia,
    updateSugerencia,
    removeSugerencia,
    setError,
  } = useStore();

  const handleSugerenciaSubmit = (e) => {
    e.preventDefault();
    if (sugerenciaForm.texto.trim() === "") {
      setError("Por favor, escribe tu sugerencia antes de añadirla.");
      return;
    }

    if (editingSugerenciaIndex !== null) {
      updateSugerencia(editingSugerenciaIndex, sugerenciaForm);
    } else {
      addSugerencia(sugerenciaForm);
    }
  };

  const handleEditSugerencia = (index) => {
    const sugerenciaAEditar = sugerencias[index];
    setSugerenciaForm(sugerenciaAEditar);
    setEditingSugerenciaIndex(index);
    setError("");
  };

  return (
    <div className="font-sans antialiased sm:rounded-lg bg-slate-300 px-0 py-4 sm:px-2 md:p-6 text-gray-800 text-sm">
      <form className="flex flex-col items-end" onSubmit={handleSugerenciaSubmit}>
        <span className="font-bold text-lg sm:text-xl text-slate-800 w-full text-center">
          {editingSugerenciaIndex !== null ? "Editar Sugerencia" : "Añadir Sugerencias"}
        </span>
        <div className="flex flex-col gap-5 mt-5 w-full">
          <div>
            <label htmlFor="sugerencia" className="sr-only">
              Sugerencia Técnica
            </label>
            <textarea
              id="sugerencia"
              className="p-2 bg-slate-100 sm:rounded-lg shadow-sm w-full focus:ring-2 focus:ring-blue-500 focus:bg-blue-100 focus:outline-none transition-all duration-200"
              placeholder="Describe tu sugerencia técnica aquí..."
              value={sugerenciaForm.texto}
              onChange={(e) => setSugerenciaForm({ ...sugerenciaForm, texto: e.target.value })}
              rows="5"
            ></textarea>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-lg py-2 px-4 flex items-center justify-center shadow-md transition-all duration-300 ease-in-out transform cursor-pointer w-fit ml-auto"
          >
            {editingSugerenciaIndex !== null ? (
              <>
                <PencilIcon className="h-5 w-5 mr-2" />
                <span>Actualizar</span>
              </>
            ) : (
              <>
                <PlusIcon className="h-5 w-5 mr-2" />
                <span>Añadir</span>
              </>
            )}
          </button>
        </div>
      </form>

      <table className="divide-y divide-gray-400 mb-6 rounded-lg overflow-hidden w-full mt-6">
        <thead className="bg-slate-600 text-slate-100">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider"
            >
              Sugerencia
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300">
          {sugerencias.map((sugerencia, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 even:bg-gray-50 transition-all duration-150 ease-in-out"
            >
              <td className="px-6 py-2 text-sm text-gray-500 text-center">
                {sugerencia.texto}
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => handleEditSugerencia(index)}
                    className="text-indigo-500 hover:text-indigo-700 p-2 rounded-full hover:bg-indigo-100 transition-all duration-150 transform hover:scale-110"
                    title="Editar"
                  >
                    <PencilIcon className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSugerencia(index)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-all duration-150 transform hover:scale-110"
                    title="Eliminar"
                  >
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};