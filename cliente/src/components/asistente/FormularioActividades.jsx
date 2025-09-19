import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useStore } from "../../store";

export const FormularioActividades = () => {
  const {
    actividades,
    actividadForm,
    editingActividadIndex,
    error,
    setActividadForm,
    setEditingActividadIndex,
    addActividad,
    updateActividad,
    removeActividad,
    setError,
  } = useStore();

  const handleActividadSubmit = (e) => {
    e.preventDefault();
    if (actividadForm.titulo.trim() === "" || actividadForm.descripcion.trim() === "") {
      setError("Por favor, rellena todos los campos.");
      return;
    }

    if (editingActividadIndex !== null) {
      updateActividad(editingActividadIndex, actividadForm);
    } else {
      addActividad(actividadForm);
    }
  };

  const handleEditActividad = (index) => {
    const actividadAEditar = actividades[index];
    setActividadForm(actividadAEditar);
    setEditingActividadIndex(index);
    setError("");
  };

  return (
    <div className="font-sans antialiased sm:rounded-lg bg-slate-300 px-0 py-4 sm:px-2 md:p-6 text-gray-800 text-sm">
      <form className="flex flex-col items-end" onSubmit={handleActividadSubmit}>
        <span className="font-bold text-lg sm:text-xl text-slate-800 w-full text-center">
          {editingActividadIndex !== null
            ? "Editar actividad"
            : "Añadir actividades realizadas"}
        </span>
        <div className="flex flex-col gap-5 mt-5 w-full">
          <div>
            <label htmlFor="categoria" className="sr-only">
              Categoría
            </label>
            <input
              id="categoria"
              type="text"
              placeholder="Categoría de la actividad"
              className="p-2 bg-slate-100 sm:rounded-lg shadow-sm w-full focus:ring-2 focus:ring-blue-500 focus:bg-blue-100 focus:outline-none transition-all duration-200"
              value={actividadForm.titulo}
              onChange={(e) => setActividadForm({ ...actividadForm, titulo: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="descripcion" className="sr-only">
              Descripción
            </label>
            <textarea
              id="descripcion"
              className="p-2 bg-slate-100 sm:rounded-lg shadow-sm w-full focus:ring-2 focus:ring-blue-500 focus:bg-blue-100 focus:outline-none transition-all duration-200"
              placeholder="Descripción detallada de la actividad"
              value={actividadForm.descripcion}
              onChange={(e) => setActividadForm({ ...actividadForm, descripcion: e.target.value })}
              rows="3"
            ></textarea>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>
          )}
          <button
            type="submit"
            className="bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-lg py-2 px-4 flex items-center justify-center shadow-md transition-all duration-300 ease-in-out transform cursor-pointer w-fit ml-auto"
          >
            {editingActividadIndex !== null ? (
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
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
              Categoría
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
              Descripción
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300">
          {actividades.map((actividad, index) => (
            <tr key={index} className="hover:bg-gray-50 even:bg-gray-50 transition-all duration-150 ease-in-out">
              <td className="px-6 py-2 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                {actividad.titulo}
              </td>
              <td className="px-6 py-2 text-center text-sm text-gray-500">
                {actividad.descripcion}
              </td>
              <td className="px-6 py-2 text-center whitespace-nowrap text-sm font-medium">
                <div className="flex items-center gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => handleEditActividad(index)}
                    className="text-indigo-500 hover:text-indigo-700 p-2 rounded-full hover:bg-indigo-100 transition-all duration-150 transform hover:scale-110"
                    title="Editar"
                  >
                    <PencilIcon className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeActividad(index)}
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