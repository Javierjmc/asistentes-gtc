import { useState } from "react";

export const AsignarAsistente = ({ onClose, client, asistentesDisponibles }) => {
  const [selectedAsistentes, setSelectedAsistentes] = useState(
    client.asistentes_asignados.map((a) => a.id)
  );

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedAsistentes(prev => 
      checked ? [...prev, value] : prev.filter(id => id !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(`http://127.0.0.1:5000/clientes/${client._id}/asistentes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ asistente_ids: selectedAsistentes }),
      });

      if (!response.ok) {
        throw new Error("Error al asignar/quitar asistentes.");
      }

      await response.json();
      alert("Asistentes actualizados correctamente.");
      onClose(); // Cierra el modal y refresca la lista
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-800 bg-opacity-70 flex justify-center items-center">
      <div className="bg-slate-300 p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          Asignar Asistentes a {client.nombre}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-slate-700 font-semibold mb-2">
              Seleccionar Asistentes
            </label>
            <div className="flex flex-col gap-2 p-2 border border-slate-400 rounded-md bg-slate-100 max-h-48 overflow-y-auto">
              {asistentesDisponibles.map((asistente) => (
                <label key={asistente._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={asistente._id}
                    checked={selectedAsistentes.includes(asistente._id)}
                    onChange={handleCheckboxChange}
                  />
                  <span>{asistente.nombre}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-500 text-white py-2 px-4 rounded-md hover:bg-slate-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};