import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export const FormularioObjetivos = () => {
  const [goals, setGoals] = useState([]);
  const [goalTitle, setGoalTitle] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState("");

  const addGoal = (e) => {
    e.preventDefault();

    if (goalTitle.trim() === "" || goalDescription.trim() === "") {
      setError("Por favor, rellena todos los campos.");
      return;
    }

    const newGoal = {
      title: goalTitle,
      description: goalDescription,
    };

    setGoals([...goals, newGoal]);
    setGoalTitle("");
    setGoalDescription("");
    setError("");
  };

  const updateGoal = (e) => {
    e.preventDefault();

    if (goalTitle.trim() === "" || goalDescription.trim() === "") {
      setError("Por favor, rellena todos los campos.");
      return;
    }

    const updatedGoals = [...goals];
    updatedGoals[editingIndex] = {
      title: goalTitle,
      description: goalDescription,
    };

    setGoals(updatedGoals);
    setGoalTitle("");
    setGoalDescription("");
    setEditingIndex(null);
    setError("");
  };

  const deleteGoal = (index) => {
    const newGoals = goals.filter((_, i) => i !== index);
    setGoals(newGoals);
  };

  const editGoal = (index) => {
    const goalToEdit = goals[index];
    setGoalTitle(goalToEdit.title);
    setGoalDescription(goalToEdit.description);
    setEditingIndex(index);
    setError("");
  };

  return (
    <div className="font-sans antialiased sm:rounded-lg bg-slate-300 px-0 py-4 sm:px-2 md:p-6 text-gray-800 text-sm">
      <form className="flex flex-col items-end">
        <span className="font-bold text-lg sm:text-xl text-slate-800 w-full text-center">
          {editingIndex !== null ? "Editar Objetivo" : "Añadir Objetivos"}
        </span>
        <div className="flex flex-col gap-5 mt-5 w-full">
          <div>
            <label htmlFor="goalTitle" className="sr-only">
              Título del Objetivo
            </label>
            <input
              id="goalTitle"
              type="text"
              placeholder="Objetivo Establecido"
              className="p-2 bg-slate-100 sm:rounded-lg shadow-sm w-full focus:ring-2 focus:ring-blue-500 focus:bg-blue-100 focus:outline-none transition-all duration-200"
              value={goalTitle}
              onChange={(e) => setGoalTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="goalDescription" className="sr-only">
              Descripción del Objetivo
            </label>
            <textarea
              id="goalDescription"
              className="p-2 bg-slate-100 sm:rounded-lg shadow-sm w-full focus:ring-2 focus:ring-blue-500 focus:bg-blue-100 focus:outline-none transition-all duration-200"
              placeholder="Descripción del objetivo alcanzado"
              value={goalDescription}
              onChange={(e) => setGoalDescription(e.target.value)}
              rows="3"
            ></textarea>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-lg py-2 px-4 flex items-center justify-center shadow-md transition-all duration-300 ease-in-out transform cursor-pointer w-fit ml-auto"
            onClick={editingIndex !== null ? updateGoal : addGoal}
          >
            {editingIndex !== null ? (
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
              Objetivo Establecido
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider"
            >
              Objetivo Alcanzado
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
          {goals.map((goal, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 even:bg-gray-50 transition-all duration-150 ease-in-out"
            >
              <td className="px-6 py-2 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                {goal.title}
              </td>
              <td className="px-6 py-2 text-center text-sm text-gray-500">
                {goal.description}
              </td>
              <td className="px-6 py-2 text-center whitespace-nowrap text-sm font-medium">
                <div className="flex items-center gap-3 justify-center">
                  <button
                    onClick={() => editGoal(index)}
                    className="text-indigo-500 hover:text-indigo-700 p-2 rounded-full hover:bg-indigo-100 transition-all duration-150 transform hover:scale-110"
                    title="Editar"
                  >
                    <PencilIcon className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => deleteGoal(index)}
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