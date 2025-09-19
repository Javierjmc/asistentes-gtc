import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useStore } from "../../../store";

export const ElementoDeListaCA = ({ nombre, empresa, asistentes, index }) => {
  const { removeClient, setEditingClientIndex, setClientForm } = useStore();

  const handleEdit = () => {
    // Al editar, primero se actualiza el estado del formulario con los datos del cliente
    // y luego se establece el índice del cliente que se está editando
    setClientForm({
      nombre: nombre,
      empresa: empresa,
      asistentes: asistentes.join(', '), // Convierte el array a una cadena para el input del formulario
    });
    setEditingClientIndex(index);
  };

  const handleRemove = () => {
    removeClient(index);
  };
  
  return (
    <li className="grid grid-cols-7 bg-slate-100 text-slate-800 border-t border-slate-400">
      <span className="text-center border-r border-slate-400 py-1 col-span-2">
        {nombre}
      </span>
      <span className="text-center border-r border-slate-400 py-1 col-span-2">
        {empresa}
      </span>
      <span className="text-center py-1 grid border-r border-slate-400 col-span-2">
        {asistentes.map((asistente, index) => (
          <span key={index}>{asistente}</span>
        ))}
      </span>
      <span className="grid sm:grid-cols-2">
        <button 
          onClick={handleEdit}
          className="cursor-pointer flex items-center justify-center border-b sm:border-none border-slate-400 hover:bg-blue-500 hover:text-white transitions">
          <PencilSquareIcon className="h-6 w-6" />
        </button>
        <button 
          onClick={handleRemove}
          className="cursor-pointer flex items-center justify-center sm:border-l border-slate-400 hover:bg-red-500 hover:text-white transitions">
          <TrashIcon className="h-6 w-6" />
        </button>
      </span>
    </li>
  );
};